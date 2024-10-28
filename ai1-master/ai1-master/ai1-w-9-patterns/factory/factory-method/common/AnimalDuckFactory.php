<?php

abstract class AnimalDuckFactory extends AbstractDuckFactory
{
    public static function createDuck($type)
    {
        switch ($type) {
            case 'mallard':
                return new MallardDuck();
            case 'domestic':
                return new DomesticDuck();
            case 'marbled':
                return new MarbledDuck();
            default:
                throw new \Exception("Invalid duck type.");
        }
    }
}
