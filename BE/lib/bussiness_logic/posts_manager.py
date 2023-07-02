import logging
import uuid
from typing import List

from fastapi import HTTPException, Depends
from starlette import status

from ..utils.db.models.post import Post
from ..utils.db.models.user import User
from ..utils.db.user_db import UserDBSession, get_db_session
from ..utils.rest_models import PostOut, NewPost


class PostsManager:
    def __init__(self, db_session: UserDBSession):
        self.db_session = db_session

    def get_user_feed(self, user: User) -> List[PostOut]:
        all_posts = self.db_session.query(Post).all()

        # Enrich User profile
        posts_enriched = []
        for p in all_posts:
            user_profile = self.db_session.get_user_query(p.author_email).first()
            if not user_profile:
                logging.Logger.info(f"Post created by non-existing user {p.author_email}")
                continue
            posts_enriched.append(PostOut(**{
                Post.AUTHOR: user_profile.dict(),
                **p.__dict__
            }))

        # ToDo: Sort according to Faculty or something, or find relevant topic?
        return posts_enriched

    def create_new_post(self, user: User, new_post: NewPost, db: UserDBSession = Depends(get_db_session)) -> PostOut:
        post_id = str(uuid.uuid4())
        post_to_add_dict = {
            Post.author_email.name: user.user_email,
            Post.faculty.name: user.faculty,
            Post.post_id.name: post_id
        }
        post_to_add_dict.update(new_post.dict())

        self.db_session.add(Post(**post_to_add_dict))
        self.db_session.commit()
        # Create response
        new_created_post = db.query(Post).filter (Post.post_id == post_id).first().__dict__
        new_created_post["author"] = self.db_session.get_user_query(user.user_email).first().dict()
        response = PostOut(**new_created_post)
        return response

    def manage_like_post(self, user: User, post_id: str, like_status: bool) -> List[str]:
        existing_post = self.db_session.query(Post).filter(Post.post_id == post_id).first()
        if not existing_post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post was not found")
        if like_status:
            likes = existing_post.add_like(user.user_email)
        else:
            likes = existing_post.remove_like(user.user_email)
        existing_post.likes = likes
        self.db_session.add(existing_post)
        self.db_session.commit()
        existing_post = self.db_session.query(Post).filter(Post.post_id == post_id).first()
        return list(existing_post.likes)

    def delete_post(self, user: User, post_id: str) -> bool:
        existing_post = self.db_session.query(Post).filter(Post.post_id == post_id).first()
        if not existing_post:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post was not found")

        if existing_post.author_email != user.user_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User is not Post's author. Can't perform delete"
            )

        self.db_session.query(Post).filter(Post.post_id == post_id).delete()
        self.db_session.commit()
        return True
