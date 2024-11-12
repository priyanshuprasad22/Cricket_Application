package app.service;


import app.model.Blog;
import app.model.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import app.respository.BlogRepository;
import app.respository.CommentRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BlogRepository blogRepository;

    public List<Comment> getCommentsByBlogId(Long postId) {

        Blog blog = blogRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        return commentRepository.findByBlogId(postId);
    }


    public Comment addComment(Long postId, String commentText, String commentBy){
        Blog blog=blogRepository.findById(postId).orElseThrow(()->new RuntimeException("Post not found"));

        Comment comment=new Comment();
        comment.setBlog(blog);
        comment.setCommentText(commentText);
        comment.setCommentBy(commentBy);
        comment.setCommentAt(LocalDateTime.now());

        blog.getComments().add(commentBy);

        blogRepository.save(blog);

        return commentRepository.save(comment);
    }

    public void deleteComment(Long postId,String commentBy){
        Blog blog=blogRepository.findById(postId).orElseThrow(()->new RuntimeException("Page not found"));
        if(blog.getComments().contains(commentBy)){
            blog.getComments().remove(commentBy);
            blogRepository.save(blog);
        }

        Comment comment=commentRepository.findByBlogIdAndCommentBy(postId,commentBy);
        if(comment!=null){
            commentRepository.delete(comment);
        }
    }
}
