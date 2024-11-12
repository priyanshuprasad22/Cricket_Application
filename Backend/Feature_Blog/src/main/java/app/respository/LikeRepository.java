package app.respository;

import app.model.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Likes,Long> {

    Likes findByBlogIdAndLikedBy(Long postId,String likedBy);
}
