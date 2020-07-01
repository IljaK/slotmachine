export const SYMBOLS = [
    "BAR",      // 0
    "2xBAR",    // 1
    "3xBAR",    // 2
    "7",        // 3
    "Cherry"    // 4
]

export const PAYTABLE = [
    [[4,4,4], 2000, "Top line"], // 0
    [[4,4,4], 1000, "Center line"], // 1
    [[4,4,4], 4000, "Bottom line"], // 2

    [[3,3,3], 150, "Any line"], // 3
    [[3,4], 75, "Any combination on any line"], // 4

    [[2,2,2], 50, "Any line"], // 5
    [[1,1,1], 20, "Any line"], // 6
    [[0,0,0], 10, "Any line"], // 7

    [[2,1], 5, "Any line"], // 8
    [[2,0], 5, "Any line"], // 9
    [[1,0], 5, "Any line"], // 10
]
