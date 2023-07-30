package hac.Card;

public class Card {
    private int id;
    private double price;
    private String poster_path;
    private String original_title;
    private String release_date;



    public Card(int id, double price, String posterPath, String originalTitle, String releaseDate) {
        this.id = id;
        this.price = price;
        poster_path = posterPath;
        original_title = originalTitle;
        release_date = releaseDate;
    }

    public double getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public String getOriginal_title() {
        return original_title;
    }

    public void setOriginal_title(String original_title) {
        this.original_title = original_title;
    }

    public String getRelease_date() {
        return release_date;
    }

    public void setRelease_date(String release_date) {
        this.release_date = release_date;
    }

}
