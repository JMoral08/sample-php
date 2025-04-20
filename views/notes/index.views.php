<?php require base_path('views/inc/header.php'); ?>
<?php require base_path('views/inc/navbar.php'); ?>
<?php require base_path('views/inc/banner.php'); ?>

<main class="container p-3">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <h1>This is my Notes Page!</h1>

                    <?php foreach($notes as $note) : ?>
                        <ul>
                            <li>
                                <a href="/note?id=<?= $note['id'] ?>">
                                    <?= htmlspecialchars($note['body'])?>
                                </a>
                            </li>
                        </ul>
                    <?php endforeach; ?>
                    <p>
                        <a href="/notes/create">Create Note</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</main>

<?php require base_path('views/inc/footer.php'); ?>

    