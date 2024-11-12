package app.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;
@Entity
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false,unique = true)
    private String username;

    @Column(nullable = false,unique = true)
    private String email;

    private String password;


    private List<Long> blogPostsIds;


    private List<Long> commentsIds;


    private List<Long> likedBlogIds;
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> authorities;




    public User() {
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }


    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Long> getBlogPostsIds() {
        return blogPostsIds;
    }

    public void setBlogPostsIds(List<Long> blogPostsIds) {
        this.blogPostsIds = blogPostsIds;
    }

    public List<Long> getCommentsIds() {
        return commentsIds;
    }

    public void setCommentsIds(List<Long> commentsIds) {
        this.commentsIds = commentsIds;
    }

    public List<Long> getLikedBlogIds() {
        return likedBlogIds;
    }

    public void setLikedBlogIds(List<Long> likedBlogIds) {
        this.likedBlogIds = likedBlogIds;
    }
}
