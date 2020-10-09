<!DOCTYPE html>
<head></head>
<body>
<?php
  require('AreaFinder.php');
  ini_set('display_errors', 1);
  ini_set('error_reporting',E_ALL);
  if (is_uploaded_file($_FILES['fileName']['tmp_name'])) {
    if (!file_exists('upload')) {
      mkdir('upload');
    }
    $file = 'upload/' . basename($_FILES['fileName']['name']);
    if (move_uploaded_file($_FILES['fileName']['tmp_name'], $file)) {
      echo "アップロード成功<br>";
      echo '<p><img src="', $file, '"></p><br>';
    } else {
      echo 'アップロード失敗';
    }

    $areaFinder = new AreaFinder($file);
    echo $areaFinder->getBlackArea();

  } else {
    echo 'ファイルを選択してください';
  }

?>
<p>
  <a href="home.php">ホームへ戻る</a>
</p>

</body>
</html>