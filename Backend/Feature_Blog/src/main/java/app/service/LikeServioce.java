package app.service;

import app.model.Blog;
import app.model.Likes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.respository.BlogRepository;
import app.respository.LikeRepository;

import java.time.LocalDateTime;

@Service
public class LikeServioce {
    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private BlogRepository blogRepository;

    public Likes likePost(Long postId, String likedBy){
        Blog blog=blogRepository.findById(postId).orElseThrow(()->new RuntimeException("Page not found"));

        if(blog.getLikedByUserIds().contains(likedBy)){
            return likeRepository.findByBlogIdAndLikedBy(postId,likedBy);
        }

        Likes like=new Likes();
        like.setBlog(blog);
        like.setLikedBy(likedBy);
        like.setLikedAt(LocalDateTime.now());

        blog.getLikedByUserIds().add(likedBy);

        blogRepository.save(blog);
        return likeRepository.save(like);

    }

    public long getLikes(Long postId){
        Blog blog=blogRepository.findById(postId).orElseThrow(()->new RuntimeException("Page not found"));
        return blog.getLikedByUserIds().size();
    }

    public void unlikePost(Long postId, String likedBy){
        Blog blog=blogRepository.findById(postId).orElseThrow(()->new RuntimeException("Page not found"));
        if(blog.getLikedByUserIds().contains(likedBy)){
            blog.getLikedByUserIds().remove(likedBy);
            blogRepository.save(blog);
        }

        Likes like=likeRepository.findByBlogIdAndLikedBy(postId,likedBy);
        if(like!=null){
            likeRepository.delete(like);
        }
    }


}
