pragma circom 2.1.5;

template RoiProof() {
    signal input roi;
    signal output isValid;

    isValid <== roi > 5;
}

component main = RoiProof();