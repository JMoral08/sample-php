<?php require base_path('views/inc/header.php'); ?>
<?php require base_path('views/inc/navbar.php'); ?>
<?php require base_path('views/inc/breadcrumb.php'); ?>

<main class="container">
    <a class="btn btn-success mb-2" href="/notes/create">Create Another Note</a>

    <?php foreach($notes as $note) : ?>
        <a href="/note?id=<?= $note['id'] ?>" class="text-decoration-none">
            <div class="grid mb-2">
                <div class="d-flex flex-column px-2 py-2 align-items-start bg-white rounded">
                    <span><?= htmlspecialchars($note['title'])?></span>
                    <span class="hover:bg-dark"><?= htmlspecialchars($note['body'])?></span>
                    <span>Hello</span>
                </div>
            </div>
        </a>
    <?php endforeach; ?>
</main>

<?php require base_path('views/inc/footer.php'); ?>

    