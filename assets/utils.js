// Utilities and constants

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function clamp(num, min, max) {
  return Math.max(min, Math.min(num, max));
}

function formatPercent(val) {
  return `${Math.round(val)}%`;
}

function riskLabel(p) {
  p = clamp(p, 0, 100);
  if (p <= 8) return "Low risk";
  if (p <= 16) return "Gettin' dicey";
  if (p <= 24) return "Are you sure you want to keep going?";
  if (p <= 30) return "Your middle name is Danger";
  return "Incredible bravery (or stupidity)?";
}

function scrollLogToBottom() {
  setTimeout(() => {
    logArea.scrollTop = logArea.scrollHeight;
  }, 25);
}

const restlessBear = [
  "The bear shifts in its dreams.",
  "The bear lets out a heavy sigh.",
  "The bear twitches its ear.",
  "The bear mumbles in its sleep.",
  "The bear rolls onto its back.",
  "The bear paws at the air.",
  "The bear’s breath comes in huffs.",
  "The bear shivers for a moment.",
  "The bear flicks its tail.",
  "The bear curls tighter in the den.",
  "The bear growls softly.",
  "The bear stretches a hind leg.",
  "The bear exhales a warm gust.",
  "The bear turns its head slowly.",
  "The bear’s chest rises and falls.",
  "The bear stirs without waking.",
  "The bear lets out a low rumble.",
  "The bear kicks lightly in its sleep.",
  "The bear breathes with a steady pace.",
  "The bear growls in a dream.",
  "The bear scratches its side.",
  "The bear moves its paws in slow motion.",
  "The bear flinches at something unseen.",
  "The bear’s nose twitches.",
  "The bear grunts, then settles.",
  "The bear breathes deep and slow.",
  "The bear mutters in its slumber.",
  "The bear stretches both front legs.",
  "The bear rolls half onto its stomach.",
  "The bear tucks its snout under a paw.",
  "The bear lets out a snuffling breath.",
  "The bear’s fur shifts softly with each breath.",
  "The bear’s ears twitch at faint sounds.",
  "The bear flattens one paw to the ground.",
  "The bear lets out a short, sharp snore.",
  "The bear shakes its head in a dream.",
  "The bear shifts its weight from side to side.",
  "The bear’s paws curl and uncurl.",
  "The bear grumbles faintly.",
  "The bear tilts its head to one side.",
  "The bear exhales through its nose.",
  "The bear pushes out a low hum.",
  "The bear loosens its limbs.",
  "The bear settles deeper into the den.",
  "The bear coughs in its sleep.",
  "The bear pulls its legs closer.",
  "The bear breathes in a slow, rattling sound.",
  "The bear scratches at the dirt.",
  "The bear moves its claws slightly.",
  "The bear flutters its eyelids.",
  "The bear’s tail gives the smallest twitch.",
  "The bear yawns without waking.",
  "The bear’s nose sniffs at nothing.",
  "The bear shifts closer to the den wall.",
  "The bear exhales warm, misty air into the cold.",
  "The bear jerks awake for a moment, then sleeps on.",
  "The bear hums low in its throat."
];