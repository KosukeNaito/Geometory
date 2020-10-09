<?php
class Color {
 
  private $r;
  private $g;
  private $b;

  public function __construct(float $r, float $g, float $b) {
    $this->setR($r);
    $this->setG($g);
    $this->setB($b);            
  }

  public function isSameRGB(Color $color) {
    if ($this->r == $color->getR() && 
        $this->g == $color->getG() &&
        $this->b == $color->getB()) {
          return true;
    }
    return false;
  }

  public function setR(float $r) {
    if ($r <= 255 && $r >= 0) {
      $this->r = $r;
    }
  }

  public function setG(float $g) {
    if ($g <= 255 && $g >= 0) {
      $this->g = $g;
    }
  }

  public function setB(float $b) {
    if ($b <= 255 && $b >= 0) {
      $this->b = $b;
    }
  }

  public function getR() {
    return $this->r;
  }

  public function getG() {
    return $this->g;
  }

  public function getB() {
    return $this->b;
  }

  public function isBlack() {
    if ($this->r !== 0) {
      return false;
    }

    if ($this->g !== 0) {
      return false;
    }

    if ($this->b !== 0) {
      return false;
    }

    return true;
  }

}
?>