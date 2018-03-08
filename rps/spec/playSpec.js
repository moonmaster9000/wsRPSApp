function Rps(){
    this.playRound = function(p1Throw, p2Throw, observer){
        new PlayRoundRequest(p1Throw, p2Throw, observer).process()
    }
}

function PlayRoundRequest(p1Throw, p2Throw, observer){
    this.process = function(){
        if (isThrowInvalid(p1Throw) || isThrowInvalid(p2Throw))
            observer.invalid()
        else if (isTie())
            observer.tie()
        else if (p1Wins())
            observer.p1Wins()
        else
            observer.p2Wins()
    }

    function isThrowInvalid(theThrow) {
        return !["rock", "paper", "scissors"].includes(theThrow);
    }

    function isTie() {
        return p1Throw === p2Throw;
    }

    function p1Wins() {
        return p1Throw === "rock" && p2Throw === "scissors" || p1Throw === "scissors" && p2Throw === "paper" || p1Throw === "paper" && p2Throw === "rock";
    }
}

describe("play round", function () {
    let observerSpy, rps

    beforeEach(function () {
        rps = new Rps()
    })

    describe("p1 win scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["p1Wins"])
        })

        it("rock v. scissors", function () {
            rps.playRound("rock", "scissors", observerSpy)

            expect(observerSpy.p1Wins).toHaveBeenCalled()
        })

        it("scissors v. paper", function () {
            rps.playRound("scissors", "paper", observerSpy)

            expect(observerSpy.p1Wins).toHaveBeenCalled()
        })

        it("paper v. rock", function () {
            rps.playRound("paper", "rock", observerSpy)

            expect(observerSpy.p1Wins).toHaveBeenCalled()
        })


    })

    describe("p2 win scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["p2Wins"])
        })

        it("scissors v. rock", function () {
            rps.playRound("scissors", "rock", observerSpy)

            expect(observerSpy.p2Wins).toHaveBeenCalled()
        })

        it("paper v. scissors", function () {
            rps.playRound("paper", "scissors", observerSpy)

            expect(observerSpy.p2Wins).toHaveBeenCalled()
        })

        it("rock v. paper", function () {
            rps.playRound("rock", "paper", observerSpy)

            expect(observerSpy.p2Wins).toHaveBeenCalled()
        })
    })


    describe("tie scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["tie"])
        })

        it("rock v. rock", function () {
            rps.playRound("rock", "rock", observerSpy)

            expect(observerSpy.tie).toHaveBeenCalled()
        })

        it("paper v. paper", function () {
            rps.playRound("paper", "paper", observerSpy)

            expect(observerSpy.tie).toHaveBeenCalled()
        })

        it("scissors v. scissors", function () {
            rps.playRound("scissors", "scissors", observerSpy)

            expect(observerSpy.tie).toHaveBeenCalled()
        })
    })

    describe("invalid scenarios", function () {
        beforeEach(function () {
            observerSpy = jasmine.createSpyObj("observerSpy", ["invalid"])
        })

        it("rock v. <invalid>", function () {
            rps.playRound("rock", Math.random(), observerSpy)

            expect(observerSpy.invalid).toHaveBeenCalled()
        })

        it("<invalid> v. rock", function () {
            rps.playRound(Math.random(), "rock", observerSpy)

            expect(observerSpy.invalid).toHaveBeenCalled()
        })

        it("invalid versus the same invalid", function () {
            rps.playRound("sailboat", "sailboat", observerSpy)

            expect(observerSpy.invalid).toHaveBeenCalled()
        })

    })
})