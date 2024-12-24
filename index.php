<!DOCTYPE html>
<html>

<head>
    <title>Ashaen Manuel</title>
    <link rel="stylesheet" type="text/css" href="styles/style.css">
</head>

<body>
    <header>
        <nav>
            <div class="left">
                <a href="index.html">Ashaen Manuel</a>
            </div>
            <div class="right">
                <a href="about.html">About</a>
                <a href="projects.html">Projects</a>
                <a href="experience.html">Experience</a>
                <a href="contact.html">Contact</a>
            </div>
        </nav>
    </header>
    <main>
        <div id="container">
            <div id="image-div">
                <img src="assets/me_1.png" id="me_1">
            </div>
            <div id="my_details">
                <p>Hello, I'm</p>
                <p>Ashaen Manuel</p>
                <p>Aspiring Game Developer</p>
                <form method="POST">
                    <div id="my_details_buttons">
                        <button type="submit" name="download_cv">Download CV</button>
                        <button type="button" onclick="location.href='contact.html'">Contact Info</button>
                    </div>
                </form>
                <div id="social-links">
                    <a href="https://www.linkedin.com/in/ashaenmanuel/"><img src="assets/linkedin.png"></a>
                    <a href="https://github.com/AshaenM"><img src="assets/github.png"></a>
                </div>
            </div>
        </div>
    </main>
    <footer>
        Copyright © 2024 Ashaen Manuel. All Rights Reserved.
    </footer>
</body>
<?php
// Get database login details
require_once("settings.php");

// Create a connection to the database
$conn = new mysqli($host, $user, $pswd, $dbnm);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['download_cv'])) {
    date_default_timezone_set('Asia/Colombo');
    $timestamp = date('Y-m-d H:i:s');

    $insertStatement = "INSERT INTO logs (timestamp, type_id) VALUES ('$timestamp', '1')";

    $conn->query($insertStatement);

    // Provide the file for download
    $file = 'assets/cv.pdf';

    if (file_exists($file)) {
        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . basename($file) . '"');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    } else {
        echo "File not found!";
    }
}

?>

</html>