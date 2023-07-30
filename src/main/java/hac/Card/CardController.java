package hac.Card;

import jakarta.servlet.http.HttpSession;
import org.hibernate.annotations.Synchronize;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicReferenceArray;
import java.util.stream.Collectors;

@RestController
public class CardController {


    private synchronized void save(Card card, HttpSession session){
        ArrayList<Card> cardList = (ArrayList<Card>) session.getAttribute("cardList");
        if (cardList == null) {
            cardList = new ArrayList<>();
        }

        if(cardList.stream().noneMatch(existingCard -> existingCard.getId() == card.getId())) {
            cardList.add(card);
            session.setAttribute("cardList", cardList);
        }
    }

    @PostMapping("/cards")
    public ResponseEntity<Void>  addCard(@RequestBody Card card, HttpSession session) {

        save(card, session);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/cards")
    public ResponseEntity<Void> deleteCard(@RequestParam int id, HttpSession session) {
        ArrayList<Card> cardList = (ArrayList<Card>) session.getAttribute("cardList");

        if (cardList == null) {
            return ResponseEntity.ok().build();
        }

        cardList.removeIf(card -> card.getId() == id);
        session.setAttribute("cardList", cardList);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/empty")
    public ResponseEntity<Void> emptyCards(HttpSession session) {
        ArrayList<Card> cardList = (ArrayList<Card>) session.getAttribute("cardList");

        if (cardList == null) {
            return ResponseEntity.ok().build();
        }

        cardList.clear();
        session.setAttribute("cardList", cardList);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/cards")
    public ArrayList<Card> getCards(@RequestParam(required = false) Integer id, HttpSession session) {
        ArrayList<Card> cardList = (ArrayList<Card>) session.getAttribute("cardList");
        if (cardList == null) {
            cardList = new ArrayList<>();
        }

        if (id != null) {
            cardList = cardList.stream()
                    .filter(card -> card.getId() == id)
                    .collect(Collectors.toCollection(ArrayList::new));
        }

        return cardList;
    }
}
