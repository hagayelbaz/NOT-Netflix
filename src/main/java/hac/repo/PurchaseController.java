package hac.repo;

import hac.Card.Card;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class PurchaseController {
    @Autowired
    private PurchaseRepository repository;
    @PostMapping("/purchase")
    public ResponseEntity<Void> savePayment(@RequestBody Purchase purchase, HttpSession session) {
        repository.save(purchase);
        return ResponseEntity.ok().build();
    }
}
