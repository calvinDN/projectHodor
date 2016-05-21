package calvindn.controllers;

import calvindn.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import calvindn.repositories.UserRepository;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userDao;

    @RequestMapping("/users")
    @ResponseBody
    public List<User> listUsers() {
        List<User> users = null;
        try {
            users = userDao.findAll();
        }
        catch (Exception ex) {
            //return "Error updating the user: " + ex.toString();
        }
        return users;
    }
}