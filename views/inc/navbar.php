    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Sample PHP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-start text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Sample PHP</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="<?= urlIs('/') ? 'active' : 'nav-link' ?> nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="<?= urlIs('/about') ? 'active' : 'nav-link' ?> nav-link" href="/about">About Us</a>
                        </li>
                        <?php if($_SESSION['user'] ?? false) : ?>
                            <li class="nav-item">
                                <a class="<?= urlIs('/notes') ? 'active' : 'nav-link' ?> nav-link" href="/notes">Notes</a>
                            </li>
                        <?php endif; ?>
                        <li class="nav-item">
                            <a class="<?= urlIs('/contact') ? 'active' : 'nav-link' ?> nav-link" href="/contact">Contact Us</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <?php if($_SESSION['user'] ?? false) : ?>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <?= $_SESSION['user']['email'] ?? 'Guest' ?>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <form action="/session" method="POST">
                                        <input type="hidden" name="_method" value="DELETE">
                                        <button class="nav-link btn btn-outline-secondary">Log Out</button>
                                    </form>
                                </li>
                            <?php else :?>
                                <li class="nav-item">
                                    <a class="<?= urlIs('/register') ? 'active' : 'nav-link' ?> nav-link" href="/register">Register</a>
                                </li>
                                <li class="nav-item">
                                    <a class="<?= urlIs('/login') ? 'active' : 'nav-link' ?> nav-link" href="/login">Log In</a>
                                </li>
                            <?php endif; ?>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>