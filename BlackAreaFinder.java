import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class BlackAreaFinder {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.out.println("file is not found");
            return;
        }
        String filePath = args[0];
        try {
            BufferedImage img = ImageIO.read(new File(filePath));
            int count = 0;
            for (int y = 0; y < img.getHeight(); y++) {
                for (int x = 0; x < img.getWidth(); x++) {
                    Color color = new Color(img.getRGB(x, y));
                    if (color.getRed() <= 250 && color.getGreen() <= 250 && color.getBlue() <= 250) {
                        count++;
                    }
                }
            }
            System.out.println(count);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
