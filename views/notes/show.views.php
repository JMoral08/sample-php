<?php require base_path('views/inc/header.php'); ?>
<?php require base_path('views/inc/navbar.php'); ?>
<?php require base_path('views/inc/breadcrumb.php'); ?>

<main class="container p-3">
    <div class="row">
        <div class="col-lg-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <h1>This is my Note!</h1>
                </div>
            </div>
        </div>
        <div class="col-lg-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <a href="/notes">go back</a>
                    <p><?= htmlspecialchars($note['body'])?></p>
                    <a href="/note/edit?id=<?= $note['id'] ?>" class="btn btn-secondary">Edit</a>
                    <form class="mt-3" method="POST">
                        <input type="hidden" name="_method" value="DELETE">
                        <input type="hidden" name="id" value="<?= $note['id'] ?>">
                        <button class="btn btn-danger">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<?php require base_path('views/inc/footer.php'); ?>

    