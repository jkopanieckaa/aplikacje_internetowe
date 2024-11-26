<?php
    /** @var $movie ?\App\Model\Movie */
?>

<div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="movie[name]" value="<?= $movie ? $movie->getName() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Content</label>
    <textarea id="content" name="movie[content]"><?= $movie? $movie->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
