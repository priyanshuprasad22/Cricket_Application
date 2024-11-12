package app.Contrioller;

import app.component.CommentRequest;
import app.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import app.service.BlogService;
import app.service.CommentService;
import app.service.LikeServioce;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/posts")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private LikeServioce likeServioce;

    @Autowired
    private CommentService commentService;

    @GetMapping
    public List<Blog> getAllPosts() {
        return blogService.getAllBlogs();
    }

    @GetMapping("/{id}")
    public Blog getPostById(@PathVariable Long id) {
        return blogService.getPostById(id);
    }

    @PostMapping
    public Blog createPost(@RequestBody Blog blogPost, @AuthenticationPrincipal UserDetails userDetails) {
        return blogService.createPost(blogPost,userDetails);
    }

    @PutMapping("/{id}")
    public Blog updatePost(@PathVariable Long id, @RequestBody Blog updatedPost) {
        return blogService.updatePost(id, updatedPost);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        blogService.deletePost(id);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Likes> likePost(@PathVariable Long id, @RequestParam String likedBy) {
        Likes like = likeServioce.likePost(id, likedBy);
        return ResponseEntity.ok(like);
    }

    @GetMapping("/{id}/getlike")
    public Long getLike(@PathVariable Long id){
       return likeServioce.getLikes(id);
    }

    @DeleteMapping("/{id}/like")
    public ResponseEntity<Void> unlikePost(@PathVariable Long id,@RequestParam String likedBy) {
        likeServioce.unlikePost(id,likedBy);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/comments")
    public List<Comment> getComment(@PathVariable Long id){
        return commentService.getCommentsByBlogId(id);
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<Comment> addComment(@PathVariable Long id, @RequestBody CommentRequest commentRequest) {
        Comment comment = commentService.addComment(id, commentRequest.getCommentText(), commentRequest.getCommentBy());
        return ResponseEntity.ok(comment);
    }

    @DeleteMapping("/{id}/comment")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id,@RequestParam String commentBy) {
        commentService.deleteComment(id,commentBy);
        return ResponseEntity.noContent().build();
    }
}
