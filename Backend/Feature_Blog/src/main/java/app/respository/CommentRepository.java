package app.respository;

import app.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    Comment findByBlogIdAndCommentBy(Long postId,String CommentBy);
    List<Comment> findByBlogId(Long blogId);
}
