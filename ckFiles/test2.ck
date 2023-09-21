<<< "Sine Wave 440" >>>;

SinOsc osc => dac;
osc.freq(440);
1::second => now;
<<< "PASSED", "" >>>;