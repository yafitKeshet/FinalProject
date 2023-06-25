import uuid
from typing import List
from fastapi import APIRouter, status, Depends, HTTPException
from typing_extensions import Annotated

from ..utils.auth.decode_token import get_current_active_user
from ..utils.db.models.question_comment import QuestionComment as QuestionCommentTable
from ..utils.db.models.user import User
from ..utils.db.user_db import get_db_session, UserDBSession
from ..utils.rest_models import QuestionOut, CommentOut, QuestionNew, CommentNew
from ..utils.db.models.question import Question as QuestionTable


router = APIRouter()


@router.get(
    "/forum",
    name="Get all existing forum Questions. Sorted by BE algorithm",
    description="This is the for forum main page",
    status_code=status.HTTP_200_OK,
    response_model=List[QuestionOut]
)
def get_all_questions(
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    return_value = []
    all_questions = db.query(QuestionTable).all()

    for q in all_questions:
        question = q.__dict__
        current_comments: List[dict] = []
        for c in q.question_comments:
            c_as_dict = c.__dict__
            c_as_dict["author"] = db.get_user_query(c.author_email).first().dict()
            current_comments.append(c_as_dict)
        question["question_comments"] = [CommentOut(**cc) for cc in current_comments]
        question["author"] = db.get_user_query(q.author_email).first().dict()
        return_value.append(QuestionOut(**question))
    return return_value


@router.get(
    "/forum/question/{question_id}",
    name="Delete a question",
    status_code=status.HTTP_200_OK,
    response_model=QuestionOut
)
def get_singlequestion(
    question_id: str,
    user: Annotated[User, Depends(get_current_active_user)],
    db: UserDBSession = Depends(get_db_session)
):
    existing_question = db.query(QuestionTable).filter(QuestionTable.question_id == question_id).first()
    if not existing_question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question was not found")

    question = existing_question.__dict__
    current_comments: List[dict] = []
    for c in existing_question.question_comments:
        c_as_dict = c.__dict__
        c_as_dict["author"] = db.get_user_query(c.author_email).first().dict()
        current_comments.append(c_as_dict)
    question["question_comments"] = [CommentOut(**cc) for cc in current_comments]
    question["author"] = db.get_user_query(existing_question.author_email).first().dict()
    return_value = QuestionOut(**question)
    return return_value


@router.post(
    "/forum/newQuestion",
    name="Write new question",
    description="Asking new Question in the forum. BackEnd Notice: Likes amount should be 0",
    status_code=status.HTTP_200_OK,
    response_model=QuestionOut
)
def new_question(
    new_question: QuestionNew,
    user: Annotated[User, Depends(get_current_active_user)],
    db: UserDBSession = Depends(get_db_session)
):
    new_question_id = str(uuid.uuid4())
    question_to_add_dict = {
        QuestionTable.author_email.name: user.user_email,
        QuestionTable.faculty.name: user.faculty.name,
        QuestionTable.question_id.name: new_question_id
    }
    question_to_add_dict.update(new_question.dict())

    db.add(QuestionTable(**question_to_add_dict))
    db.commit()
    # Create response
    new_created_question = db.query(QuestionTable).filter (QuestionTable.question_id == new_question_id).first().__dict__
    new_created_question["author"] = db.get_user_query(user.user_email).first().dict()
    response = QuestionOut(**new_created_question)
    return response


@router.delete(
    "/forum/question",
    name="Delete a question",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def delete_question(
    question_id: str,
    user: Annotated[User, Depends(get_current_active_user)],
    db: UserDBSession = Depends(get_db_session)
):
    existing_question = db.query(QuestionTable).filter(QuestionTable.question_id == question_id).first()
    if not existing_question:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question was not found")

    if existing_question.author_email != user.user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not Question's author. Can't perform delete"
        )

    db.query(QuestionTable).filter(QuestionTable.question_id == question_id).delete()
    db.commit()
    return True


@router.post(
    "/forum/comment",
    name="Write new comment (on a question)",
    description="Write a comments relating to existing Question in the forum. BackEnd Notice: Likes amount should be 0",
    status_code=status.HTTP_200_OK,
    response_model=CommentOut
)
def new_question_comment(
        new_comment: CommentNew,
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    existing_question = db.query(QuestionTable).filter(QuestionTable.question_id == new_comment.question_id).first()
    if not existing_question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Can't adding comment to non-existing Question"
        )

    new_comment_id = str(uuid.uuid4())
    comment_to_add_dict = {
        QuestionCommentTable.author_email.name: user.user_email,
        QuestionCommentTable.comment_id.name: new_comment_id,
        QuestionCommentTable.question_id.name: new_comment.question_id
    }
    comment_to_add_dict.update(new_comment.dict())

    db.add(QuestionCommentTable(**comment_to_add_dict))
    db.commit()
    # Create response
    new_created_comment = db.query(QuestionCommentTable).filter (QuestionCommentTable.comment_id == new_comment_id).first().__dict__
    new_created_comment["author"] = db.get_user_query(user.user_email).first().dict()
    response = CommentOut(**new_created_comment)
    return response


@router.delete(
    "/forum/comment",
    name="Delete a question",
    status_code=status.HTTP_200_OK,
    response_model=bool
)
def delete_comment(
    comment_id: str,
    user: Annotated[User, Depends(get_current_active_user)],
    db: UserDBSession = Depends(get_db_session)
):
    existing_comment = db.query(QuestionCommentTable).filter(QuestionCommentTable.comment_id == comment_id).first()
    if not existing_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment's Question was not found")

    if existing_comment.author_email != user.user_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not Comment's author. Can't perform delete"
        )

    db.query(QuestionCommentTable).filter(QuestionCommentTable.comment_id == comment_id).delete()
    db.commit()
    return True


@router.patch(
    "/forum/comment/like",
    name="Like a question Comment",
    description="Like OR unlike a question. We determine if user like or not according to the Likes set in comments scheme."
                "FrontEnd - Notice: Update State OR Get request (on comments OR questions) should happen in order to update state)."
                "Return value is the list of users that like the post ",
    status_code=status.HTTP_200_OK,
    response_model=List[str]
)
def like_question_comments(
        like: bool,
        comment_id: str,
        user: Annotated[User, Depends(get_current_active_user)],
        db: UserDBSession = Depends(get_db_session)
):
    existing_comment = db.query(QuestionCommentTable).filter(QuestionCommentTable.comment_id == comment_id).first()
    if not existing_comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment was not found")
    if like:
        likes = existing_comment.add_like(user.user_email)
    else:
        likes = existing_comment.remove_like(user.user_email)
    existing_comment.likes = likes
    db.add(existing_comment)
    db.commit()
    existing_comment = db.query(QuestionCommentTable).filter(QuestionCommentTable.comment_id == comment_id).first()
    return list(existing_comment.likes)


