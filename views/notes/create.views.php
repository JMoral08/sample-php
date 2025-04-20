<?php require base_path('views/inc/header.php'); ?>
<?php require base_path('views/inc/navbar.php'); ?>
<?php require base_path('views/inc/banner.php'); ?>

<main class="container p-3">
    <div class="row">
        <div class="col-lg-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <h1>Create Note!</h1>
                </div>
            </div>
        </div>
        <div class="col-lg-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <form method="POST" action="/notes">
                        <div class="mb-3">
                            <label for="body" class="form-label">Description</label>
                            <textarea class="form-control" name="body" id="body" rows="3"><?= $_POST['body'] ?? '' ?></textarea>
                            <?php if(isset($errors['body'])) : ?>
                                <p class="text-danger"><?= $errors['body'] ?></p>
                            <?php endif; ?>
                        </div>
                        <button type="submit" class="btn btn-success" >Create</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<?php require base_path('views/inc/footer.php'); ?>