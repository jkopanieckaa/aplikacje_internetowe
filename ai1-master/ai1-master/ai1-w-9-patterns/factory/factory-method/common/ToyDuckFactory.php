<?php

abstract class ToyDuckFactory extends AbstractDuckFactory
{
    public static function createDuck($type)
    {
        switch ($type) {
            case 'rubber':
                return new RubberDuck();
            case 'wooden':
                return new WoodenDuck();
            case 'stuffed':
                return new StuffedDuck();
            default:
                throw new \Exception("Invalid duck type.");
        }
    }
}
