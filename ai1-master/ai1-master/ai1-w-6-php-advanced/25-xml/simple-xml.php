<?php

ini_set('display_errors', true);
$xml = <<<EOT
<users>
    <user>
        <id>1</id>
        <name>Jon</name>
    </user>
    <user>
        <id>2</id>
        <name>Arya</name>
    </user>
</users>
EOT;

$xmlObj = new SimpleXMLElement($xml);
var_dump($xmlObj->children());
var_dump($xmlObj->xpath('//user/name'));
