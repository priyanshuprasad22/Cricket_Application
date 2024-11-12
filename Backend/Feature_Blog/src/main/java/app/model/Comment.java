package app.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // renamed to follow standard naming convention

    @ManyToOne
    @JoinColumn(name="blog_id", nullable = false)
    private Blog blog;

    private String commentText;
    private String commentBy;
    private LocalDateTime commentAt;

    // Default constructor
    public Comment() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Blog getBlog() {
        return blog;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public String getCommentBy() {
        return commentBy;
    }

    public void setCommentBy(String commentBy) {
        this.commentBy = commentBy;
    }

    public LocalDateTime getCommentAt() {
        return commentAt;
    }

    public void setCommentAt(LocalDateTime commentAt) {
        this.commentAt = commentAt;
    }
}
