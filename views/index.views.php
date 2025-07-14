<?php require base_path('views/inc/header.php'); ?>
<?php require base_path('views/inc/navbar.php'); ?>
<?php require base_path('views/inc/breadcrumb.php'); ?>

<main class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <h1>Hello, <?= $_SESSION['user']['email'] ?? 'Guest' ?> . Welcome to the Home page</h1>
                </div>
            </div>
        </div>
    </div>
</main>

<?php require base_path('views/inc/footer.php'); ?>

    