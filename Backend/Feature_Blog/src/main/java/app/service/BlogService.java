package app.service;

import app.config.JWTUtil;
import app.model.Blog;
import app.model.User;
import app.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import app.respository.BlogRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    BlogRepository blogrepositry;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private JWTUtil jwtUtil;
    public List<Blog> getAllBlogs(){
        return blogrepositry.findAll();
    }

    public Blog getPostById(Long id){
        Optional<Blog> post =blogrepositry.findById(id);
        return post.orElse(null);
    }

    public Blog createPost(Blog blog, UserDetails userDetails){

        User user=userRepository.findByUsername(userDetails.getUsername());
        if(user==null){
            throw new UsernameNotFoundException("User not found");
        }

        blog.setUser_id(user.getId());
        return blogrepositry.save(blog);
    }

    public Blog updatePost(Long id,Blog blogPost){
        Blog blogPostUpdate=getPostById(id);
        if(blogPostUpdate!=null){
            blogPostUpdate.setTitle(blogPost.getTitle());
            blogPostUpdate.setContent(blogPost.getContent());
            return blogrepositry.save(blogPostUpdate);
        }
        return null;
    }

    public void deletePost(Long id){
        blogrepositry.deleteById(id);
    }

}
