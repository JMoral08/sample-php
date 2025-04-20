<?php require base_path('views/inc/header.php'); ?>
<?php require base_path('views/inc/navbar.php'); ?>
<?php require base_path('views/inc/banner.php'); ?>

<main class="container p-3">
    <div class="row">
        <div class="col-lg-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <h1>Log In</h1>
                </div>
            </div>
        </div>
        <div class="col-lg-12 mb-3">
            <div class="card">
                <div class="card-body">
                    <form action="/session" method="POST">
                        <div class="mb-3">
                            <label for="email" class="form-label">Email address</label>
                            <input type="email" id="email" name="email" class="form-control" 
                            value="<?= old('email') ?>">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" id="password" name="password" class="form-control">
                        </div>
                            <?php if(isset($errors['email'])) : ?>
                                <div class="form-text text-danger mb-3"><?= $errors['email'] ?></div>
                            <?php endif; ?>
                        <button type="submit" class="btn btn-primary">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>

<?php require base_path('views/inc/footer.php'); ?>