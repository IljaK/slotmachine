export const SYMBOLS = [
    "BAR",      // 0
    "2xBAR",    // 1
    "3xBAR",    // 2
    "7",        // 3
    "Cherry"    // 4
]

export const PAYTABLE = [
    [[4,4,4], 2000, "Top line"],
    [[4,4,4], 1000, "Center line"],
    [[4,4,4], 4000, "Bottom line"],

    [[3,3,3], 150, "Any line"],
    [[3,4], 75, "Any combination on any line"],

    [[2,2,2], 50, "Any line"],
    [[1,1,1], 20, "Any line"],
    [[0,0,0], 10, "Any line"],

    [[2,1], 10, "Any line"],
    [[2,0], 10, "Any line"],
    [[1,0], 10, "Any line"],
]
