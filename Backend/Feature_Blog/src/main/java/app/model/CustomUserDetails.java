package app.model;

import app.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getAuthorities().stream()
                .map(SimpleGrantedAuthority::new) // Convert to GrantedAuthority
                .collect(Collectors.toList());
    }



    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    public String getEmail(){
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Customize as needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Customize as needed
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Customize as needed
    }

    @Override
    public boolean isEnabled() {
        return true; // Customize as needed
    }
}
