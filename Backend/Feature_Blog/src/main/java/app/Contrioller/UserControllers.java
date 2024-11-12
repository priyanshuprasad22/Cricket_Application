package app.Contrioller;



import app.config.JWTUtil;
import app.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import app.service.UserService;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserControllers {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtil jwtUtil;


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> loginUser(@RequestBody User Entereduser) {
        String email=Entereduser.getEmail();
        String password=Entereduser.getPassword();
        User user = userService.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {

            String token=jwtUtil.generateToken(user.getUsername());

            Map<String,String> response=new HashMap<>();
            response.put("token",token);
            response.put("email",user.getEmail());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body(Collections.singletonMap("message","Invalid email or password"));
        }
    }

    // Get User Profile
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long id) {
        User user = userService.findById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    // Update User Profile
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }
}

