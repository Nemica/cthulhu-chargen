<?php
	
	$config = json_decode(file_get_contents('./config/charsheet-config.json'));

	$attributes = $config->statsData;

?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Cthulhu Character Generator</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript">
		var config = <?php echo json_encode($config ?: array()); ?>;
	</script>
	<script src="js/dice.js"></script>
	<script src="js/main.js"></script>
	<link rel="stylesheet" href="css/main.css"/>
</head>
<body>
	<div class="main-container">
		<h1>Stats</h1>
		<div class="row">
			<ul class="stats">
			<?php foreach($attributes as $id => $attr): ?>
				<li class="">
					<span class=""><?php echo strtoupper($id) ?></span>
					<input class="stat-field" id="<?php echo $id ?>" name="stats[<?php echo $id ?>]" type="text" readonly/>
					<button class="roll" data-stat="<?php echo $id ?>"</button>
				</li>
			<?php endforeach; ?>
			</ul>
			<ul class="stats">
				<li>Alter: <input id="age" type="number" name="stats[age]"/> <button class="confirmAge">Bestätigen</button>
				<li id="ageDesc"></li>
					<ul>
						<p>Malus: <span id="agemalus">0</span></p>
						<?php foreach($attributes as $id => $attr): ?>
							<li class="malus" style="display: none;" data-stat="<?php echo $id ?>"><?php echo strtoupper($id) ?>: <input id="<?php echo $id ?>-malus" type="number"/></li>
						<?php endforeach; ?>
						<p>Bonuswürfe:</p>
						<li class ="luckBonusRoll" style="display: none;">Glück:<button class="roll" data-stat="luck">Roll!</button></li>
						<li style="display: none;">BI: <input type="number" readonly/> <button class="roll" data-stat="bi-extra">Roll! (<span id="agebonus">0</span>)</button></li>
					</ul>
				</li> <!-- Bonus/Malus blurb -->
				<li>Glück: <input id="luck" type="number" name="stats[luck]"/> <button class="roll" data-stat="luck"></button></li> <!-- 3w6*5 -->
			</ul>
		</div>
	</div>
</body>
</html>