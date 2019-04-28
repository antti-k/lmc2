# LMC 2
## Note
New version of my [LMC](https://github.com/antti-k/lmc).
## Intro
Little man computer (LMC) is a simple model of a computer that is generally used for learning purposes. When I first read about LMC I tought that programming my own simulator would be a great learning opportunity. Simulator is mostly based on [Wikipedia entry of LMC](https://en.wikipedia.org/wiki/Little_man_computer).  My simulator also has a functional assembler that supports mneumonics and labels for ease of programming. 

## Quick Start
1. [Open the app (Heroku)](https://guarded-brook-49030.herokuapp.com)
2. Choose a pre-loaded program
3. Click Load to get the program
4. Click Assemble to assemble the program to the memory
5. Click Step/Run to run the program

## Registers
The computer has five registers. Three of them hold an integer value and two of them have a boolean value. Program counter holds the value for the next instruction to be executed. Accumulator is used as a work memory that is used in almost every instruction. Cycle count counts the cycles your program has used and can't be altered or accessed. Negative flag shows if accumulator value is negative after a subtraction operation. End of program flag is used to indicate that the end of the program has been reached.

## Memory
Memory consists of 100 slots of 3 digit decimal numbers. The same memory is used for both instructions and program memory.

## Instructions
Instructions consist of 3 digit decimal numbers where first digit generally stands for instruction to execute and last two digits stand for memory address that are used with instruction. 

### List of instructions

Machine code | Assembler | Explanation
-|-|-
1XX | ADD | Adds the value in given memory index to the accumulator. Resets negative flag to false.
2XX | SUB | Subtracts the value in given memory index from the accumulator. If the new accumulator value would be less than zero sets negative flag to true and sets accumulator value to zero.
3XX | STA | Replaces current value in given memory index with the value in the accumulator. 
5XX | LDA | Replaces current accumulator value with a value from given memory index and resets negative flag to false.
6XX | BRA | Replaces current value in the program counter with given address.
7XX | BRZ | If the accumulator value is zero, replaces current value in the program counter with given address.
8XX | BRP | If the accumulator value is positive (negative flag is false), replaces current value in the program counter with given address.
901 | INP | Replaces the accumulator value with the next value in the inbox and removes that value from the inbox.
902 | OUT | Copies the value from the accumulator to the outbox.
000 | HLT | Stops the program from running.
None | DAT | Stores a value to the next available memory slot. Not an instruction but only used in assembler with labels.

## GUI

1. Menubar
  * About
    * Links to the github page.
  * Load
    * Loads a template program to the code input.
  * Assemble
    * Assembles code to the memory.
  * Step
    * Execute the next instruction.
  * Run
    * Executes the program instantly until the end (or 1000 cycles).
2. Code Input
  * Input your code here.
3. Reg
  * PC
    * Shows the current value of the program counter.
  * CC
    * Shows the amount of computer cycles executed so far.
  * AC
    * Shows the current value of the accumulator.
4. Inbox
  * Here you can enter the input. Each value is separated by new line.
5. Outbox
  * Your program prints the output here.
6. Memory
  * Shows current value in each memory address.
    

