package oxygen.core;

import com.google.common.collect.Lists;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

@SpringBootApplication
@ComponentScan("oxygen")
public class OxygenCore {

	private static ConfigurableApplicationContext applicationContext;

	public static void main(String[] args) {
		applicationContext = SpringApplication.run(OxygenCore.class, args);
		PasswordEncoder passwordEncoder = applicationContext.getBean(PasswordEncoder.class);
		JdbcUserDetailsManager userDetailsManager = applicationContext.getBean(JdbcUserDetailsManager.class);
		userDetailsManager.createUser(new User("admin", passwordEncoder.encode("admin"), Lists.newArrayList(new SimpleGrantedAuthority("ADMIN"))));
	}
}
