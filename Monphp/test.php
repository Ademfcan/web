<?php
require_once 'vendor/autoload.php';
use MathParser\StdMathParser;
use MathParser\Interpreting\Evaluator;
$evaluator = new Evaluator();
$parser = new StdMathParser();

use MathParser\Interpreting\Differentiator;

$differentiator = new Differentiator('x');
$f = $parser->parse('exp(2x)');
$df = $f->accept($differentiator);

// $df now contains the AST of '2*exp(x)-y' and can be evaluated further
$evaluator->setVariables([ 'x' => 1 ]);
$df->accept($evaluator);

$value = $df->accept($evaluator);
echo $value;
?>