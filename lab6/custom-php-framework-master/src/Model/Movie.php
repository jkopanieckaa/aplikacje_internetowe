<?php
namespace App\Model;

use App\Service\Config;

class Movie
{
    private ?int $id = null;
    private ?string $name = null;
    private ?string $content = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Movie
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): Movie
    {
        $this->name = $name;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): Movie
    {
        $this->content = $content;

        return $this;
    }

    public static function fromArray($array): Movie
    {
        $movie = new self();
        $movie->fill($array);

        return $movie;
    }

    public function fill($array): Movie
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['name'])) {
            $this->setName($array['name']);
        }
        if (isset($array['content'])) {
            $this->setContent($array['content']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM movie';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $movies = [];
        $moviesArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($moviesArray as $moviesArray) {
            $movies[] = self::fromArray($moviesArray);
        }

        return $movies;
    }

    public static function find($id): ?Movie
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM movie WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $movieArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $movieArray) {
            return null;
        }
        $movie = Movie::fromArray($movieArray);

        return $movie;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO movie (name, content) VALUES (:name, :content)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'name' => $this->getName(),
                'content' => $this->getContent(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE movie SET name = :name, content = :content WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':name' => $this->getName(),
                ':content' => $this->getContent(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM movie WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setName(null);
        $this->setContent(null);
    }
}
