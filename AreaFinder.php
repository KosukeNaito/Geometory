<?php
require_once 'Color.php';
class AreaFinder {
    private $colors = array();  
 
    public function getBlackArea() {
        $count = 0;
        foreach ($this->colors as $color) {
            if ($this->colors->isBlack()) {
                $count++;                
            }
        }
        return $count;
    }

    public function __construct(String $img) {
      $this->initColors($this->loadImg($img));
    }

    private function loadImg($filePath) {
        if (strpos($filePath,'.png')) {
          return imagecreatefrompng($filePath);
        }
    
        if (strpos($filePath, '.jpeg') || strpos($filePath, '.jpg')) {
          return imagecreatefromjpeg($filePath);
        }
    
        if (strpos($filePath, '.bmp')) {
          return imagecreatefrombmp($filePath);
        }
    
        if (strpos($filePath, '.gif')) {
          return imagecreatefromgif($filePath);
        }
      }

      private function initColors($img) {
        for ($y = 0; $y < imagesy($img); $y++) {
          for ($x = 0; $x < imagesx($img); $x++) {
            $pixel = imagecolorat($img, $x, $y);
            $rgbs = imagecolorsforindex($img, $pixel);
            $r = $rgbs['red'];
            $g = $rgbs['green'];
            $b = $rgbs['blue'];
            $color = new Color($r, $g, $b);
            $this->colors[$this->colorsSize] = $color;
          }
        }    
      }

}