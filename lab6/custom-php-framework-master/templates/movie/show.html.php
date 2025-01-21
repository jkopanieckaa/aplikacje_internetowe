<?php

/** @var \App\Model\Movie $movie */
/** @var \App\Service\Router $router */

$title = "{$movie->getName()} ({$movie->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $movie->getName() ?></h1>
    <article>
        <?= $movie->getContent();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('movie-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('movie-edit', ['id'=> $movie->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
