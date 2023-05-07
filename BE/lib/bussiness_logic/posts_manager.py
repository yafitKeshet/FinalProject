import logging
import uuid
from typing import List

from BE.lib.utils.db.models.post import Post
from BE.lib.utils.db.models.user import User
from BE.lib.utils.db.user_db import UserDBSession
from BE.lib.utils.rest_models import PostOut, NewPost, UserProfileOut


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

    def create_new_post(self, user: User, new_post: NewPost) -> PostOut:
        post_to_add_dict = {
            Post.author_email.name: user.user_email,
            Post.faculty.name: user.faculty,
            Post.post_id.name: str(uuid.uuid4())
        }
        post_to_add_dict.update(new_post.dict())
        post_to_add = Post(**post_to_add_dict)
        self.db_session.add(Post(**post_to_add_dict))
        self.db_session.commit()
        # Create response
        post_to_add_dict["author"] = self.db_session.get_user_query(user.user_email).first().dict()
        response = PostOut(**post_to_add_dict)
        return response
