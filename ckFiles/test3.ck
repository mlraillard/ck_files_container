<<< "Sine Wave 880" >>>;

SinOsc osc => dac;
osc.freq(880);
1::second => now;
<<< "PASSED", "" >>>;