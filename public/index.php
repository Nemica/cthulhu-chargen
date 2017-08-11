<?php
	
	$config = json_decode(file_get_contents('./config/charsheet-config.json'));

	$attributes = $config->statsData;
?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Cthulhu Character Generator</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/main.js"></script>
	<link rel="stylesheet" href="css/bootstrap.min.css"/>
</head>
<body>
	<h1>Stats</h1>
	<div class="container">
		<div class="row">
			<ul class="stats col-md-5">
			<?php foreach($attributes as $id => $attr): ?>
				<li><?php echo strtoupper($id) ?>: <input id="<?php echo $id ?>" type="number"/> <button class="roll" data-stat="<?php echo $id ?>">Roll!</button></li>
			<?php endforeach; ?>
			</ul>
			<ul class="stats col-md-5">
				<li>Glück: <input id="luck" type="number"/> <button class="roll" data-stat="luck">Roll!</button></li> <!-- 3w6*5 -->
				<li>Alter: <input id="age" type="number"/>
					<p>Malus: <span id="agemalus">0</span></p>
					<ul>
						<li>ST: <input type="number"/></li>
						<li>KO: <input type="number"/></li>
						<li>MA: <input type="number"/></li>
						<li>ER: <input type="number"/></li>
						<li>GE: <input type="number"/></li>
						<li>GR: <input type="number"/></li>
						<li>IN: <input type="number"/></li>
					</ul>
					<li>BI: <input type="number" readonly/> <button class="roll" data-stat="luck">Roll! (<span id="agebonus">0</span>)</button></li>
				</li> <!-- Bonus/Malus blurb -->
				
			</ul>
		</div>
	</div>
</body>
</html>