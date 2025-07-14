<?php require base_path('views/inc/header.php'); ?>
<?php require base_path('views/inc/navbar.php'); ?>
<?php require base_path('views/inc/breadcrumb.php'); ?>

<main class="container">
    <a class="btn btn-success mb-2" href="/notes/create">Create Another Note</a>

    <?php foreach($notes as $note) : ?>
        <a href="/note?id=<?= $note['id'] ?>" class="text-decoration-none">
            <div class="grid mb-2">
                <div class="d-flex flex-column px-3 py-3 align-items-start bg-white bg-hover rounded">
                    <p class="fs-4 fw-bold text-dark"><?= htmlspecialchars($note['title'])?></p>
                    <p class="text-dark px-2"><?= htmlspecialchars($note['body'])?></p>
                    <small class="text-muted">Hello</small>
                </div>
            </div>
        </a>
    <?php endforeach; ?>
</main>

<?php require base_path('views/inc/footer.php'); ?>

    