(self.webpackChunklegion_solver = self.webpackChunklegion_solver || []).push([
    [179], {
        372: (e, t, i) => {
            "use strict";
            var n = i(379),
                r = i.n(n),
                o = i(28);
            r()(o.Z, {
                insert: "head",
                singleton: !1
            }), o.Z.locals;
            class s {
                constructor(e, t) {
                    this.x = e, this.y = t
                }
            }
            var l, a, d = i(486);
            class h {
                constructor(e, t, i) {
                    this.shape = e, this.amount = t, this.id = i
                }
                static createPiece(e, t) {
                    return new h(e, t, this.curId++)
                }
                get cellCount() {
                    Object.defineProperty(this, "cellCount", {
                        value: 0,
                        writable: !0
                    });
                    for (let e = 0; e < this.shape.length; ++e)
                        for (let t = 0; t < this.shape[e].length; ++t) this.shape[e][t] > 0 && this.cellCount++;
                    return this.cellCount
                }
                get pointShape() {
                    Object.defineProperty(this, "pointShape", {
                        value: []
                    });
                    for (let e = 0; e < this.shape.length; ++e)
                        for (let t = 0; t < this.shape[e].length; ++t) 1 == this.shape[e][t] ? this.pointShape.push(new c(t, e, !1)) : 2 == this.shape[e][t] && this.pointShape.push(new c(t, e, !0));
                    return this.pointShape
                }
                get offCenter() {
                    Object.defineProperty(this, "offCenter", {
                        value: 0,
                        writable: !0
                    });
                    for (let e = 0; e < this.shape[0].length; e++)
                        if (0 != this.shape[0][e]) {
                            this.offCenter = e;
                            break
                        } return this.offCenter
                }
                get transformations() {
                    Object.defineProperty(this, "transformations", {
                        value: [],
                        writable: !0
                    });
                    let e, t = [...this.shape];
                    for (let i = 0; i < 2; i++) {
                        for (let i = 0; i < 4; i++) {
                            e = new Array(t[0].length).fill(0).map((() => new Array(t.length).fill(0)));
                            for (let i = 0; i < t.length; i++)
                                for (let n = 0; n < t[0].length; n++) 0 != t[i][n] && (e[t[0].length - n - 1][i] = t[i][n]);
                            t = e, this.transformations.push(new h(t, this.amount, this.id))
                        }
                        e = new Array(t.length).fill(0).map((() => new Array(t[0].length).fill(0)));
                        for (let i = 0; i < t.length; i++)
                            for (let n = 0; n < t[0].length; n++) 0 != t[i][n] && (e[t.length - i - 1][n] = t[i][n]);
                        t = e
                    }
                    return this.transformations = d.unionWith(this.transformations, d.isEqual), this.transformations
                }
                get pointTransformations() {
                    Object.defineProperty(this, "pointTransformations", {
                        value: []
                    });
                    for (let e of this.transformations) this.pointTransformations.push(e.pointShape);
                    return this.pointTransformations
                }
                get restrictedTransformations() {
                    Object.defineProperty(this, "restrictedTransformations", {
                        value: []
                    });
                    for (let e of this.transformations) e.shape[0][1 + e.offCenter] && 0 != e.shape[0][1 + e.offCenter] || this.restrictedTransformations.push(e);
                    return this.restrictedTransformations
                }
                get restrictedPointTransformations() {
                    Object.defineProperty(this, "restrictedPointTransformations", {
                        value: []
                    });
                    for (let e of this.restrictedTransformations) this.restrictedPointTransformations.push(e.pointShape);
                    return this.restrictedPointTransformations
                }
            }(a = "curId") in (l = h) ? Object.defineProperty(l, a, {
                value: 1,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }): l[a] = 1;
            class c extends s {
                constructor(e, t, i) {
                    super(e, t), this.isMiddle = i
                }
            }

            function u(e, t, i) {
                return t in e ? Object.defineProperty(e, t, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = i, e
            }
            class g {
                constructor(e, t, i) {
                    u(this, "pausePromise", void 0), u(this, "pauseResolve", void 0), u(this, "iterations", void 0), u(this, "directionFree", void 0), u(this, "success", void 0), u(this, "shouldStop", void 0), this.board = e, this.pieces = t, this.onBoardUpdated = i, this.iterations = 0, this.pieceLength = t.length, this.valid = !0, this.pieceNumber = 0, this.transformationNumber = 0, this.restrictedPieceNumber = 0, this.restrictedTransformationNumber = 0, this.time = (new Date).getTime(), this.history = [], this.middle = [];
                    for (let e = this.board.length / 2 - 1; e < this.board.length / 2 + 1; e++)
                        for (let t = this.board[0].length / 2 - 1; t < this.board[0].length / 2 + 1; t++) - 1 != this.board[e][t] && this.middle.push(new s(t, e));
                    this.emptySpots = [];
                    for (let e = 0; e < this.board.length; e++)
                        for (let t = 0; t < this.board[0].length; t++) 0 == this.board[e][t] && this.emptySpots.push(new s(t, e));
                    this.restrictedSpots = [];
                    for (let e = 0; e < this.board.length; e++)
                        for (let t = 0; t < this.board[0].length; t++) this.searchSurroundings(t, e);
                    this.longSpaces = [];
                    for (let e = 0; e < this.board.length; e++)
                        for (let t = 0; t < this.board[0].length; t++) "horizontal" == this.checkLongSpace(t, e) && this.longSpaces.push(new s(t, e)), "vertical" == this.checkLongSpace(t, e) && this.longSpaces.push(new s(t, e));
                    this.firstAlgorithm = !!this.longSpaces.length
                }
                async solve() {
                    return this.pieces.sort(((e, t) => t.amount * t.cellCount - e.amount * e.cellCount)), this.pieces.push(new h([
                        []
                    ], 0, -1)), this.restrictedSpots.sort(((e, t) => t.spotsFilled - e.spotsFilled)), this.success = await this.solveInternal(), this.success
                }
                async solveInternal(e = 3e4) {
                    let t, i, n, r = [],
                        o = 0;
                    for (; this.pieces[0].amount > 0 || !this.valid;) {
                        if (this.shouldStop) return;
                        if (this.valid && 0 != this.restrictedSpots.length && this.pieces[this.restrictedPieceNumber].amount && 5 != this.directionFree && !this.firstAlgorithm) this.restrictedPieceNumber != this.pieceLength && (n = this.restrictedSpots[0], i = this.pieces[this.restrictedPieceNumber].restrictedTransformations[this.restrictedTransformationNumber], this.determineDirectionFree(n), this.isPlaceable(n, i) ? (r.push([0, 0, this.takeFromList(this.restrictedPieceNumber), [...this.restrictedSpots], n, this.restrictedPieceNumber, this.restrictedTransformationNumber, this.directionFree, [], 0, this.valid]), this.restrictedSpots.splice(0, 1), this.placePiece(n, i), this.isValid(), this.restrictedPieceNumber = 0, this.restrictedTransformationNumber = 0) : this.changeIndex(!0));
                        else if (this.valid && this.pieces[this.pieceNumber].amount && (this.firstAlgorithm || 0 == this.restrictedSpots.length) && 5 != this.directionFree) {
                            if (this.directionFree = 0, !this.firstAlgorithm)
                                for (o = 0; o < this.emptySpots.length && 0 != this.board[this.emptySpots[o].y][this.emptySpots[o].x];) o++;
                            if (o == this.emptySpots.length) return !0;
                            if (n = this.emptySpots[o], i = this.pieces[this.pieceNumber].transformations[this.transformationNumber], this.isPlaceable(n, i)) {
                                let e = [];
                                for (let t = 0; t < this.longSpaces.length; t++) e.push(this.longSpaces[t]);
                                if (r.push([this.pieceNumber, this.transformationNumber, this.takeFromList(this.pieceNumber), [...this.restrictedSpots], n, 0, 0, 0, e, o, this.valid]), this.placePiece(n, i), this.isValid(), this.firstAlgorithm) {
                                    for (; o < this.emptySpots.length && 0 != this.board[this.emptySpots[o].y][this.emptySpots[o].x];) o++;
                                    if (o == this.emptySpots.length) return !0
                                }
                                this.pieceNumber = 0, this.transformationNumber = 0
                            } else this.changeIndex(!1)
                        } else {
                            if (0 == r.length) return !1;
                            this.valid || (this.valid = !0), [this.pieceNumber, this.transformationNumber, t, this.restrictedSpots, n, this.restrictedPieceNumber, this.restrictedTransformationNumber, this.directionFree, this.longSpaces, o, this.valid] = r.pop(), 0 == this.directionFree ? (this.returnToList(this.pieceNumber, t), this.takeBackPiece(n, this.pieces[this.pieceNumber].transformations[this.transformationNumber])) : (this.returnToList(this.restrictedPieceNumber, t), this.takeBackPiece(n, this.pieces[this.restrictedPieceNumber].restrictedTransformations[this.restrictedTransformationNumber])), this.firstAlgorithm = !(0 == this.longSpaces.length), this.firstAlgorithm ? this.changeIndex(!1) : this.changeIndex(0 == !this.restrictedSpots.length)
                        }
                        this.iterations++, this.iterations % e == 0 && (this.onBoardUpdated(), await new Promise((e => setTimeout(e, 0))), await this.pausePromise)
                    }
                    return !0
                }
                takeFromList(e) {
                    this.pieces[e].amount--;
                    let t = this.pieces[e],
                        i = e + 1;
                    for (; t.amount * t.cellCount < this.pieces[i].amount * this.pieces[i].cellCount;) i++;
                    return this.pieces[e] = this.pieces[i - 1], this.pieces[i - 1] = t, i - 1 - e
                }
                returnToList(e, t) {
                    let i = this.pieces[e];
                    this.pieces[e] = this.pieces[e + t], this.pieces[e + t] = i, this.pieces[e].amount++
                }
                isValid() {
                    if (0 == this.middle.length) return !0;
                    let e = 0;
                    for (let t of this.middle) this.board[t.y][t.x] > 0 && this.board[t.y][t.x] <= this.pieceLength && e++;
                    this.valid = e != this.middle.length
                }
                isPlaceable(e, t) {
                    if (!t) return !1;
                    for (let i of t.pointShape) {
                        let n, r;
                        if ([n, r] = this.determinePoint(e, t, i), r >= this.board.length || r < 0 || n >= this.board[0].length || n < 0 || 0 != this.board[r][n]) return !1
                    }
                    return !0
                }
                placePiece(e, t) {
                    let i = [];
                    this.history[this.history.length] = [];
                    for (let n of t.pointShape) {
                        let r, o;
                        [r, o] = this.determinePoint(e, t, n), n.isMiddle ? this.board[o][r] = t.id + 18 : this.board[o][r] = t.id, i.push(new s(r, o)), this.history[this.history.length - 1].push(new s(r, o));
                        for (let e = 0; e < this.restrictedSpots.length; e++) this.restrictedSpots[e].x == r && this.restrictedSpots[e].y == o && (this.restrictedSpots.splice(e, 1), e--);
                        for (let e = 0; e < this.longSpaces.length; e++) this.longSpaces[e].x == r && this.longSpaces[e].y == o && (this.longSpaces.splice(e, 1), e--);
                        0 == this.longSpaces.length && (this.firstAlgorithm = !1)
                    }
                    for (let e of i) this.searchSurroundings(e.x, e.y + 1), this.searchSurroundings(e.x, e.y - 1), this.searchSurroundings(e.x + 1, e.y), this.searchSurroundings(e.x - 1, e.y);
                    let n = [];
                    for (let e = 0; e < this.restrictedSpots.length - 1; e++)
                        for (let t = e + 1; t < this.restrictedSpots.length; t++) this.restrictedSpots[e].x == this.restrictedSpots[t].x && this.restrictedSpots[e].y == this.restrictedSpots[t].y && n.push(e);
                    for (let e = n.length - 1; e >= 0; e--) this.restrictedSpots.splice(n[e], 1);
                    this.restrictedSpots.sort(((e, t) => t.spotsFilled - e.spotsFilled))
                }
                takeBackPiece(e, t) {
                    this.history.pop();
                    for (let i of t.pointShape) {
                        let n, r;
                        [n, r] = this.determinePoint(e, t, i), this.board[r][n] = 0
                    }
                }
                searchSurroundings(e, t) {
                    let i = 0;
                    this.board[t] && 0 == this.board[t][e] && (this.board[t + 1] && 0 == this.board[t + 1][e] && i++, this.board[t - 1] && 0 == this.board[t - 1][e] && i++, this.board[t] && 0 == this.board[t][e + 1] && i++, this.board[t] && 0 == this.board[t][e - 1] && i++, i <= 1 && this.restrictedSpots.push(new p(e, t, 4 - i)))
                }
                checkLongSpace(e, t) {
                    return this.board[t + 1] && 0 == this.board[t + 1][e] && this.board[t - 1] && 0 == this.board[t - 1][e] && this.board[t] && 0 != this.board[t][e + 1] && this.board[t] && 0 != this.board[t][e - 1] ? "vertical" : this.board[t + 1] && 0 != this.board[t + 1][e] && this.board[t - 1] && 0 != this.board[t - 1][e] && this.board[t] && 0 == this.board[t][e + 1] && this.board[t] && 0 == this.board[t][e - 1] ? "horizontal" : void 0
                }
                changeIndex(e) {
                    e ? this.restrictedTransformationNumber < this.pieces[this.restrictedPieceNumber].restrictedTransformations.length - 1 ? this.restrictedTransformationNumber++ : (this.restrictedPieceNumber++, this.restrictedTransformationNumber = 0) : this.transformationNumber < this.pieces[this.pieceNumber].transformations.length - 1 ? this.transformationNumber++ : (this.pieceNumber++, this.transformationNumber = 0)
                }
                determineDirectionFree(e) {
                    this.board[e.y - 1] && 0 == this.board[e.y - 1][e.x] ? this.directionFree = 1 : this.board[e.y] && 0 == this.board[e.y][e.x + 1] ? this.directionFree = 2 : this.board[e.y + 1] && 0 == this.board[e.y + 1][e.x] ? this.directionFree = 3 : this.board[e.y] && 0 == this.board[e.y][e.x - 1] ? this.directionFree = 4 : this.directionFree = 5
                }
                determinePoint(e, t, i) {
                    let n, r;
                    return 0 == this.directionFree || 3 == this.directionFree || 5 == this.directionFree ? (n = e.x + i.x - t.offCenter, r = e.y + i.y) : 1 == this.directionFree ? (n = e.x - i.x + t.offCenter, r = e.y - i.y) : 2 == this.directionFree ? (n = e.x + i.y, r = e.y + i.x - t.offCenter) : (n = e.x - i.y, r = e.y - i.x + t.offCenter), [n, r]
                }
                pause() {
                    this.time -= (new Date).getTime(), 0 != this.iterations && (document.getElementById("iterations").style.visibility = "visible", document.getElementById("iterationsValue").innerText = `${this.iterations}`, document.getElementById("time").style.visibility = "visible", document.getElementById("timeValue").innerText = -this.time + "ms"), this.pausePromise = new Promise((e => this.pauseResolve = e))
                }
                continue () {
                    this.time += (new Date).getTime(), document.getElementById("iterations").style.visibility = "hidden", document.getElementById("time").style.visibility = "hidden", this.pauseResolve(), this.pausePromise = null
                }
                stop() {
                    this.shouldStop = !0
                }
            }
            class p extends s {
                constructor(e, t, i) {
                    super(e, t), this.spotsFilled = i
                }
            }
            const m = {
                KMS: {
                    title: "메이플스토리M 유니온 배치 계산기",
                    instructions: "TIP",
                    instructionsSub1: "1. 원하는 칸 만큼 드래그 , 클릭",
                    instructionsSub2: "2. 직업 맞춰 유니온 캐릭터 숫자 설정",
                    instructionsSub3: "3. 배치 시작으로 확인",
                    instructionsSub4: "4. 적절한 초기화",
                    instructionsSub5: "5. 다크 모드를 애용합시다.",
                    instructionsSub6: "6. 길드 바깥으로 공유 시 서비스 종료",
                    spacesToBeFilled: "캐릭터 산정된 공간: ",
                    boardSpacesFilled: "지도 선택된 공간: ",
                    iterations: "반복 횟수: ",
                    time: "소요 시간: ",
                    bigClick: "칸 선택",
                    liveSolve: "실시간 보기",
                    darkMode: "다크 모드",
                    start: "배치 시작",
                    pause: "배치 중지",
                    continue: "배치 계속",
                    reset: "배치 리셋",
                    clearPieces: "캐릭터 초기화",
                    clearBoard: "지도 초기화",
                    failText: "지도를 연결 후 재설정 해주세요.",
                    lvl60: "Lv 60",
                    lvl100: "Lv 100",
                    warriorPirate140: "Lv 140 전사/해적",
                    mageThiefArcher140: "Lv 140 마법사/도적/궁수/제논",
                    warrior200: "Lv 200 전사",
                    archer200: "Lv 200 궁수",
                    thiefLab200: "Lv 200 도적/제논",
                    mage200: "Lv 200 마법사",
                    pirate200: "Lv 200 해적",
                    warrior250: "Lv 250 전사",
                    archer250: "Lv 250 궁수",
                    thief250: "Lv 250 도적",
                    mage250: "Lv 250 마법사",
                    pirate250: "Lv 250 해적",
                    xenon250: "Lv 250 제논",
                    enhancedLab200: "Lv 200 Enhanced Lab",
                    enhancedLab250: "Lv 250 Enhanced Lab",
                    lab250: "Lv 250 Lab"
                },
            };
            let f = b();

            function b() {
                const e = function() {
                    let e;
                    switch (window.navigator.userLanguage || window.navigator.language) {
                      /*
                        case "en":
                            e = "GMS";
                            break;
                            */
                        case "ko":
                            e = "KMS";
                            break;
                            /*
                        case "ja":
                            e = "JMS";
                            break;
                        case "cn":
                            e = "CMS";
                            break;
                            */
                        default:
                            e = null
                    }
                    return e
                }();
                return localStorage.getItem("i18n") || e || "KMS"
            }

            function y(e) {
                return m[f][e]
            }

            function v(e, t) {
                const i = [],
                    n = /^\s*$/;
                return function e(r) {
                    if (3 == r.nodeType) !t && n.test(r.nodeValue) || i.push(r);
                    else
                        for (var o = 0, s = r.childNodes.length; o < s; ++o) e(r.childNodes[o])
                }(e), i
            }
            document.getElementById("title").textContent = y("title"),
            v(document.getElementById("instructions"))[0].textContent = y("instructions"),
            v(document.getElementById("paragraph"))[0].textContent = y("instructionsSub1"),
            v(document.getElementById("paragraph"))[1].textContent = y("instructionsSub2"),
            v(document.getElementById("paragraph"))[2].textContent = y("instructionsSub3"),
            v(document.getElementById("paragraph"))[3].textContent = y("instructionsSub4"),
            v(document.getElementById("currentPieces"))[0].textContent = y("spacesToBeFilled"),
            v(document.getElementById("boardFilled"))[0].textContent = y("boardSpacesFilled"),
            v(document.getElementById("iterations"))[0].textContent = y("iterations"),
            v(document.getElementById("time"))[0].textContent = y("time"),
            document.querySelector('label[for="bigClick"]').textContent = y("bigClick"),
            document.querySelector('label[for="liveSolve"]').textContent = y("liveSolve"),
            document.querySelector('label[for="darkMode"]').textContent = y("darkMode"),
            document.getElementById("boardButton").textContent = y("start"),
            document.getElementById("resetButton").textContent = y("reset"),
            document.getElementById("clearPieces").textContent = y("clearPieces"),
            document.getElementById("clearBoard").textContent = y("clearBoard"),
            document.getElementById("failText").textContent = y("failText"),
            document.getElementById("languageSelectBox").addEventListener("change", (function() {
                localStorage.setItem("i18n", this.value), location.reload()
            })), document.getElementById(f).selected = !0;
            const x = [
                    [
                        [2]
                    ],
                    [
                        [2, 2]
                    ],
                    [
                        [1, 0],
                        [2, 1]
                    ],
                    [
                        [1, 2, 1]
                    ],
                    [
                        [2, 2],
                        [2, 2]
                    ],
                    [
                        [1, 2, 2, 1]
                    ],
                    [
                        [1, 0, 0],
                        [1, 2, 1]
                    ],
                    [
                        [0, 1, 0],
                        [1, 2, 1]
                    ],
                    [
                        [1, 2, 0],
                        [0, 2, 1]
                    ],
                    [
                        [1, 1, 2],
                        [0, 1, 1]
                    ],
                    [
                        [1, 1, 2, 1, 1]
                    ],
                    [
                        [0, 0, 1],
                        [1, 2, 1],
                        [0, 0, 1]
                    ],
                    [
                        [0, 1, 0],
                        [1, 2, 1],
                        [0, 1, 0]
                    ],
                    [
                        [1, 2, 0, 0],
                        [0, 1, 1, 1]
                    ],
                    [
                        [1, 1, 0],
                        [0, 2, 0],
                        [0, 1, 1]
                    ]
                ],
                S = [
                    [
                        [1, 0, 0, 0],
                        [0, 1, 2, 1]
                    ],
                    [
                        [1, 0, 0, 0, 1],
                        [0, 1, 2, 1, 0]
                    ],
                    [
                        [1, 0, 1],
                        [1, 2, 1]
                    ]
                ],
                L = [];
            for (let e of x) L.push(h.createPiece(e, 0));

            function B() {
                return !!["GMS", "TMS"].find((e => e === b()))
            }
            if (B())
                for (let e of S) L.push(h.createPiece(e, 0));
            let I = new Map;
            I.set(-1, "white"), I.set(0, "grey");
            for (let e = 0; e < 2; e++) I.set(1 + 18 * e, "lightpink"), I.set(2 + 18 * e, "lightcoral"), I.set(3 + 18 * e, "indianred"), I.set(4 + 18 * e, "darkseagreen"), I.set(5 + 18 * e, "firebrick"), I.set(6 + 18 * e, "mediumseagreen"), I.set(7 + 18 * e, "purple"), I.set(8 + 18 * e, "dodgerblue"), I.set(9 + 18 * e, "lightsteelblue"), I.set(10 + 18 * e, "maroon"), I.set(11 + 18 * e, "green"), I.set(12 + 18 * e, "indigo"), I.set(13 + 18 * e, "blue"), I.set(14 + 18 * e, "cadetblue"), I.set(15 + 18 * e, "mediumpurple"), I.set(16 + 18 * e, "aquamarine"), I.set(17 + 18 * e, "aquamarine"), I.set(18 + 18 * e, "aquamarine");
            for (let e = 0; e < L.length; e++) {
                let t = `<tr>${'<td class="pieceCell"></td>'.repeat(L[e].shape[0].length)}</tr>`.repeat(L[e].shape.length);
                document.querySelector("#pieceForm form").innerHTML += `<div class="piece">\n        <div id="pieceDescription${e+1}"></div>\n        <label for="piece${e+1}">\n            <table id="pieceDisplay${e+1}">\n                <tbody>${t}</tbody>\n            </table>\n        </label>\n        <input id="piece${e+1}" type="number" min=0 value=0>\n    </div>`, document.getElementById(`pieceDisplay${e+1}`).style.borderCollapse = "collapse", document.getElementById(`pieceDisplay${e+1}`).style.borderSpacing = "0", document.getElementById(`pieceDescription${e+1}`).style.paddingRight = "15px";
                for (let t = 0; t < L[e].shape.length; t++)
                    for (let i = 0; i < L[e].shape[t].length; i++) 0 != L[e].shape[t][i] && (document.getElementById(`pieceDisplay${e+1}`).getElementsByTagName("tr")[t].getElementsByTagName("td")[i].style.background = I.get(e + 1))
            }
            document.getElementById("pieceDescription1").textContent = y("lvl60"), document.getElementById("pieceDescription2").textContent = y("lvl100"), document.getElementById("pieceDescription3").textContent = y("warriorPirate140"), document.getElementById("pieceDescription4").textContent = y("mageThiefArcher140"), document.getElementById("pieceDescription5").textContent = y("warrior200"), document.getElementById("pieceDescription6").textContent = y("archer200"), document.getElementById("pieceDescription7").textContent = y("thiefLab200"), document.getElementById("pieceDescription8").textContent = y("mage200"), document.getElementById("pieceDescription9").textContent = y("pirate200"), document.getElementById("pieceDescription10").textContent = y("warrior250"), document.getElementById("pieceDescription11").textContent = y("archer250"), document.getElementById("pieceDescription12").textContent = y("thief250"), document.getElementById("pieceDescription13").textContent = y("mage250"), document.getElementById("pieceDescription14").textContent = y("pirate250"), document.getElementById("pieceDescription15").textContent = y("xenon250"), B() && (document.getElementById("pieceDescription16").textContent = y("enhancedLab200"), document.getElementById("pieceDescription17").textContent = y("enhancedLab250"), document.getElementById("pieceDescription18").textContent = y("lab250"));
            let E = 0;
            localStorage.getItem("currentPieces") && (E = JSON.parse(localStorage.getItem("currentPieces")), document.getElementById("currentPiecesValue").innerText = `${E}`);
            let w = JSON.parse(localStorage.getItem("pieceAmounts"));
            if (w) {
                for (let e = 0; e < L.length; e++) document.getElementById(`piece${e+1}`).value = w[e] || 0;
                C()
            }

            function C() {
                for (let e of L) e.amount = parseInt(document.getElementById(`piece${e.id}`).value) || 0;
                E = (0, d.sumBy)(L, (e => e.cellCount * e.amount)), localStorage.setItem("pieceAmounts", JSON.stringify(L.map((e => e.amount)))), localStorage.setItem("currentPieces", JSON.stringify(E)), document.getElementById("currentPiecesValue").innerText = `${E}`
            }
            document.getElementById("pieceForm").addEventListener("input", C), document.getElementById("clearPieces").addEventListener("click", (function() {
                for (let e = 0; e < L.length; e++) document.getElementById(`piece${e+1}`).value = 0;
                C()
            }));
            let T = JSON.parse(localStorage.getItem("legionBoard"));
            if (!T) {
                T = [];
                for (let e = 0; e < 16; e++) {
                    T[e] = [];
                    for (let t = 0; t < 18; t++)
                    T[e][t] = -1
                }
            }
            let k = [],
                P = [];
            const N = "start",
                F = "running",
                M = "paused",
                D = "completed";
            let W = N;
            const O = [];
            for (let e = 0; e < 16; e++) O[e] = [];
            document.querySelector("#legionBoard tbody").innerHTML = T.map((e => `<tr>${e.map((e=>'<td class="legionCell"></td>')).join("")}</tr>`)).join(""), U(),
                function() {
                    for (let e = 0; e < T.length / 4; e++)
                        for (let t = e; t < T.length / 2; t++)
                        O[0].push(new s(t, e)),
                        O[1].push(new s(e, t + 1)),
                        O[2].push(new s(e, T[0].length - 2 - t)),
                        O[3].push(new s(t, T[0].length - 1 - e)),
                        O[4].push(new s(T.length - 1 - t, T[0].length - 1 - e)),
                        O[5].push(new s(T.length - 1 - e, T[0].length - 2 - t)),
                        O[6].push(new s(T.length - 1 - e, t + 1)),
                        O[7].push(new s(T.length - 1 - t, e));
                    for (let e = T.length / 4; e < T.length / 2; e++)
                        for (let t = e; t < T.length / 2; t++)
                        O[8].push(new s(t, e)),
                        O[9].push(new s(e, t + 1)),
                        O[10].push(new s(3 * T.length / 4 - 1 - t, T.length / 4 + 1 + e)),
                        O[11].push(new s(t, T[0].length - 1 - e)),
                        O[12].push(new s(T.length - 1 - t, T[0].length - 1 - e)),
                        O[13].push(new s(t + T.length / 4, e + T.length / 4 + 1)),
                        O[14].push(new s(t + T.length / 4, 3 * T.length / 4 - e)),
                        O[15].push(new s(T.length - t - 1, e))
                }();
            let $ = 0;
            localStorage.getItem("boardFilled") && ($ = JSON.parse(localStorage.getItem("boardFilled")), document.getElementById("boardFilledValue").innerText = `${$}`);
            let A = !1;
            localStorage.getItem("isBigClick") && (document.getElementById("bigClick").checked = JSON.parse(localStorage.getItem("isBigClick")), JSON.parse(localStorage.getItem("isBigClick")) && Q());
            let J = !1;
            localStorage.getItem("isLiveSolve") && (document.getElementById("liveSolve").checked = JSON.parse(localStorage.getItem("isLiveSolve")), JSON.parse(localStorage.getItem("isLiveSolve")) && Y()), document.getElementById("bigClick").addEventListener("click", Q), document.getElementById("liveSolve").addEventListener("click", Y), document.getElementById("clearBoard").addEventListener("click", (function() {
                for (let e = 0; e < T.length; e++)
                    for (let t = 0; t < T[0].length; t++) T[e][t] = -1, Z(e, t).style.background = I.get(T[e][t]);
                $ = 0, localStorage.setItem("legionBoard", JSON.stringify(T)), localStorage.setItem("boardFilled", JSON.stringify(0)), document.getElementById("boardFilledValue").innerText = `${$}`
            })), document.getElementById("boardButton").addEventListener("click", (async function(e) {
                switch (W) {
                    case N:
                        e.target.innerText = y("pause"), document.getElementById("clearBoard").disabled = !0, W = F, await async function() {
                            if (0 == $ && currentPieces > 0) return !1;
                            let e = [];
                            for (let t = 0; t < T.length; t++) {
                                e[t] = [];
                                for (let i = 0; i < T[0].length; i++) e[t][i] = T[T.length - 1 - t][T[0].length - 1 - i]
                            }
                            let t = [];
                            for (let e = 0; e < T[0].length; e++) {
                                t[e] = [];
                                for (let i = 0; i < T.length; i++) t[e][i] = T[T.length - i - 1][e]
                            }
                            let i = [];
                            for (let e = 0; e < T[0].length; e++) {
                                i[e] = [];
                                for (let t = 0; t < T.length; t++) i[e][t] = T[t][T[0].length - 1 - e]
                            }
                            P = [], k.push(new g(T, _.cloneDeep(L), te)), k.push(new g(t, _.cloneDeep(L), (() => !1))), k.push(new g(e, _.cloneDeep(L), (() => !1))), k.push(new g(i, _.cloneDeep(L), (() => !1)));
                            let n = 0 != k[0].longSpaces.length;
                            const r = k[0].solve();
                            let o, s;
                            if (n) {
                                const e = k[1].solve(),
                                    t = k[2].solve(),
                                    i = k[3].solve();
                                o = await Promise.race([r, e, t, i])
                            } else o = await r;
                            for (let e of k) e.stop();
                            if (void 0 !== k[0].success) {
                                for (let e = 0; e < k[0].board.length; e++)
                                    for (let t = 0; t < k[0].board[0].length; t++) T[e][t] = k[0].board[e][t];
                                s = k[0], P = k[0].history
                            } else if (void 0 !== k[1].success) {
                                for (let e = 0; e < k[1].board[0].length; e++)
                                    for (let t = 0; t < k[1].board.length; t++) T[e][t] = k[1].board[t][k[1].board[0].length - 1 - e];
                                for (let e of k[1].history)
                                    for (let t of e) {
                                        let e = t.y;
                                        t.y = k[1].board[0].length - 1 - t.x, t.x = e
                                    }
                                s = k[1], P = k[1].history
                            } else if (void 0 !== k[2].success) {
                                for (let e = 0; e < k[2].board.length; e++)
                                    for (let t = 0; t < k[2].board[0].length; t++) T[e][t] = k[2].board[k[2].board.length - 1 - e][k[2].board[0].length - 1 - t];
                                for (let e of k[2].history)
                                    for (let t of e) t.y = k[2].board.length - 1 - t.y, t.x = k[2].board[0].length - 1 - t.x;
                                s = k[2], P = k[2].history
                            } else if (void 0 !== k[3].success) {
                                for (let e = 0; e < k[3].board[0].length; e++)
                                    for (let t = 0; t < k[3].board.length; t++) T[e][t] = k[3].board[k[3].board.length - t - 1][e];
                                for (let e of k[3].history)
                                    for (let t of e) {
                                        let e = t.x;
                                        t.x = k[3].board.length - 1 - t.y, t.y = e
                                    }
                                s = k[3], P = k[3].history
                            }
                            return document.getElementById("iterations").style.visibility = "visible", document.getElementById("iterationsValue").innerText = `${s.iterations}`, document.getElementById("time").style.visibility = "visible", document.getElementById("timeValue").innerText = (new Date).getTime() - s.time + "ms", o && U(), o
                        }() || (document.getElementById("failText").style.visibility = "visible"), e.target.innerText = y("reset"), W = D;
                        break;
                    case F:
                        e.target.innerText = y("continue");
                        for (let e of k) e.pause();
                        W = M, document.getElementById("resetButton").style.visibility = "visible";
                        break;
                    case M:
                        e.target.innerText = y("pause"), P = [];
                        for (let e of k) e.continue();
                        W = F, document.getElementById("resetButton").style.visibility = "hidden";
                        break;
                    case D:
                        ee()
                }
            })), document.getElementById("resetButton").addEventListener("click", ee), document.getElementById("darkMode").addEventListener("click", X);
            let j, R = !1;
            for (let e = 0; e < T.length; e++)
                for (let t = 0; t < T[0].length; t++) {
                    let i = Z(e, t);
                    i.addEventListener("mousedown", (() => {
                        j = 0 == T[e][t] ? -1 : 0, z(e, t, j), R = !0
                    })), i.addEventListener("mouseover", (() => {
                        R ? z(e, t, j) : H(e, t)
                    })), i.addEventListener("mouseout", (() => {
                        R || K(e, t)
                    }))
                }
                // 칸 계산식
            function V() {
                for (let e = 0; e < T.length; e++)
                    for (let t = 0; t < T[0].length; t++)
                      Z(e, t).style.borderWidth = "1px";
                for (let e = 0; e < T[0].length / 2; e++)
                  Z(e, e).style.borderTopWidth = "3px",
                  Z(e, e).style.borderRightWidth = "3px",
                  Z(T.length - e - 1, e).style.borderBottomWidth = "3px",
                  Z(T.length - e - 1, e).style.borderRightWidth = "3px",
                  Z(e, T[0].length - e - 1).style.borderTopWidth = "3px",
                  Z(e, T[0].length - e - 1).style.borderLeftWidth = "3px",
                  Z(T.length - e - 1, T[0].length - e - 1).style.borderBottomWidth = "3px",
                  Z(T.length - e - 1, T[0].length - e - 1).style.borderLeftWidth = "3px";
                for (let e = 0; e < T.length; e++)
                  Z(e, 0).style.borderLeftWidth = "3px",
                  Z(e, T[0].length / 2).style.borderLeftWidth = "3px",
                  Z(e, T[0].length - 1).style.borderRightWidth = "3px";
                for (let e = 0; e < T[0].length; e++)
                  Z(0, e).style.borderTopWidth = "3px",
                  Z(T.length / 2, e).style.borderTopWidth = "3px",
                  Z(T.length - 1, e).style.borderBottomWidth = "3px";
                for (let e = T.length - 13; e < 1 * T.length - 3; e++)
                  Z(e, Math.floor(T[0].length - 15)).style.borderLeftWidth = "3px",
                  Z(e, Math.floor(3.3 * T[0].length / 4)).style.borderRightWidth = "3px";
                for (let e = Math.ceil(T[0].length / 6); e < Math.floor(3 * T[0].length / 3.5); e++)
                  Z(T.length - 13, e).style.borderTopWidth = "3px",
                  Z(1 * T.length - 3, e).style.borderTopWidth = "3px"
            }
            document.documentElement.addEventListener("mouseup", (() => {
                R = !1
            })), document.getElementById("legion").addEventListener("dragstart", (e => e.preventDefault()));
            let q = !1;

            function G(e, t) {
                for (let i = 0; i < O.length; i++)
                    for (let n of O[i])
                        if (n.x == e && n.y == t) return i
            }

            function Z(e, t) {
                return document.getElementById("legionBoard").getElementsByTagName("tr")[e].getElementsByTagName("td")[t]
            }

            function z(e, t, i) {
                if (W == N) {
                    if (A)
                        if (0 == i)
                            for (let i of O[G(e, t)]) Z(i.x, i.y).style.background = I.get(0), -1 == T[i.x][i.y] && $++, T[i.x][i.y] = 0;
                        else
                            for (let i of O[G(e, t)]) Z(i.x, i.y).style.background = I.get(-1), 0 == T[i.x][i.y] && $--, T[i.x][i.y] = -1;
                    else {
                        let n = Z(e, t); - 1 == i ? -1 != T[e][t] && (T[e][t] = -1, n.style.background = I.get(-1), $--) : 0 != T[e][t] && (T[e][t] = 0, n.style.background = I.get(0), $++)
                    }
                    localStorage.setItem("legionBoard", JSON.stringify(T)), localStorage.setItem("boardFilled", JSON.stringify($)), document.getElementById("boardFilledValue").innerText = `${$}`
                }
            }

            function H(e, t) {
                if (W == N)
                    if (A)
                        for (let i of O[G(e, t)]) - 1 == T[i.x][i.y] ? Z(i.x, i.y).style.background = q ? "dimgrey" : "silver" : Z(i.x, i.y).style.background = q ? "rgb(20, 20, 20)" : "dimgrey";
                    else -1 == T[e][t] ? Z(e, t).style.background = q ? "dimgrey" : "silver" : Z(e, t).style.background = q ? "rgb(20, 20, 20)" : "dimgrey"
            }

            function K(e, t) {
                if (W == N)
                    if (A)
                        for (let i of O[G(e, t)]) - 1 == T[i.x][i.y] ? Z(i.x, i.y).style.background = I.get(-1) : Z(i.x, i.y).style.background = I.get(0);
                    else -1 == T[e][t] ? Z(e, t).style.background = I.get(-1) : Z(e, t).style.background = I.get(0)
            }

            function U() {
                V(),
                    function() {
                        let e;
                        for (let t = 0; t < T.length; t++)
                            for (let i = 0; i < T[0].length; i++) e = T[t][i], Z(t, i).style.background = I.get(e);
                        0 == P.length && k[0] && (P = k[0].history);
                        for (let e of P)
                            for (let t = 0; t < e.length; t++) {
                                T[e[t].y][e[t].x - 1] > 0 && ("3px" == Z(e[t].y, e[t].x).style.borderLeftWidth || "3px" == Z(e[t].y, e[t].x - 1).style.borderRightWidth) && (Z(e[t].y, e[t].x).style.borderLeftWidth = "1px", Z(e[t].y, e[t].x - 1).style.borderRightWidth = "1px"), T[e[t].y - 1] && T[e[t].y - 1][e[t].x] > 0 && ("3px" == Z(e[t].y, e[t].x).style.borderTopWidth || "3px" == Z(e[t].y - 1, e[t].x).style.borderBottomWidth) && (Z(e[t].y, e[t].x).style.borderTopWidth = "1px", Z(e[t].y - 1, e[t].x).style.borderBottomWidth = "1px");
                                for (let i = 0; i < e.length; i++) t != i && e[t].x - 1 == e[i].x && e[t].y == e[i].y && (Z(e[t].y, e[t].x).style.borderLeftWidth = "0px", T[0][e[t].x - 1] && (Z(e[t].y, e[t].x - 1).style.borderRightWidth = "0px")), t != i && e[t].x == e[i].x && e[t].y - 1 == e[i].y && (Z(e[t].y, e[t].x).style.borderTopWidth = "0px", T[e[t].y - 1] && (Z(e[t].y - 1, e[t].x).style.borderBottomWidth = "0px"))
                            }
                    }()
            }

            function X() {
                let e, t;
                if (q = !q, localStorage.setItem("isDarkMode", JSON.stringify(q)), q) {
                    t = "white", document.getElementById("body").style.backgroundColor = "rgb(54, 57, 63)";
                    for (let e = 0; e < L.length; e++) document.getElementById(`piece${e+1}`).style.backgroundColor = "silver";
                    I.set(-1, "grey"), I.set(0, "rgb(50, 50, 50)")
                } else {
                    t = "black", document.getElementById("body").style.backgroundColor = "white";
                    for (let e = 0; e < L.length; e++) document.getElementById(`piece${e+1}`).style.backgroundColor = "white";
                    I.set(-1, "white"), I.set(0, "grey")
                }
                U();
                for (let i = 0; i < T.length; i++)
                    for (let n = 0; n < T[0].length; n++) e = Z(i, n), e.style.borderTopColor != t && (e.style.borderTopColor = t), e.style.borderBottomColor != t && (e.style.borderBottomColor = t), e.style.borderRightColor != t && (e.style.borderRightColor = t), e.style.borderLeftColor != t && (e.style.borderLeftColor = t);
                document.getElementById("body").style.color = t
            }

            function Q() {
                A = !A, localStorage.setItem("isBigClick", JSON.stringify(A))
            }

            function Y() {
                J = !J, localStorage.setItem("isLiveSolve", JSON.stringify(J)), J && W != D && U()
            }

            function ee() {
                ! function() {
                    for (let e = 0; e < k.length; e++)
                        for (let t = 0; t < k[e].board.length; t++)
                            for (let i = 0; i < k[e].board[0].length; i++) 0 == e ? (Z(t, i).style.borderWidth = "1px", k[e].board[t][i] >= 0 && (Z(t, i).style.background = I.get(0), k[e].board[t][i] = 0)) : k[e].board[t][i] >= 0 && (k[e].board[t][i] = 0);
                    V(), k = []
                }(), document.getElementById("clearBoard").disabled = !1, document.getElementById("boardButton").innerText = y("start"), document.getElementById("resetButton").style.visibility = "hidden", document.getElementById("iterations").style.visibility = "hidden", document.getElementById("time").style.visibility = "hidden", document.getElementById("failText").style.visibility = "hidden", P = [], W = N
            }

            function te() {
                J && U()
            }
            localStorage.getItem("isDarkMode") && (document.getElementById("darkMode").checked = JSON.parse(localStorage.getItem("isDarkMode")), JSON.parse(localStorage.getItem("isDarkMode")) && X())
        },
        28: (e, t, i) => {
            "use strict";
            i.d(t, {
                Z: () => o
            });
            var n = i(645),
                r = i.n(n)()((function(e) {
                    return e[1]
                }));
            r.push([e.id, "body {\n    display: flex;\n    flex-direction: column;\n}\n\nform {\n    margin-bottom: 0;\n}\n\n#title {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-top: 0;\n}\n\n#header {\n    display: flex;\n    justify-content: flex-end;\n}\n\n#subtitle {\n    text-align: center;\n}\n\n#legionBoard {\n    border-spacing: 0;\n    border-collapse: collapse;\n}\n\n#legionBoard td.legionCell {\n    width: 25px;\n    height: 27px;\n    border-style: solid;\n    border-width: 1px;\n}\n\n#legion {\n    display: flex;\n    flex-direction: column;\n}\n\n#legionFooter {\n    margin-top: 10px;\n}\n\n#options {\n    display: flex;\n    flex-direction: column;\n    text-align: end;\n}\n\n#checkboxes {\n    margin-bottom: 10px;\n}\n\n#darkModeLabel {\n    padding-top: 10px;\n}\n\n#iterationTime {\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n}\n\n#iterations, #time, #resetButton {\n  visibility: hidden;\n}\n\n#boardFilled {\n    margin-bottom: 7px;\n}\n\n#middlelabels {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n#pieceForm {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-end;\n    padding-right: 20px;\n}\n\n#pieceForm td.pieceCell {\n    width: 7px;\n    height: 9px;\n    border-style: solid;\n    border-width: 0px;\n}\n\n.piece {\n    display: flex;\n    flex-direction: row;\n    margin-bottom: 15px;\n    justify-content: flex-end;\n}\n\n#resetButton {\n    margin-top: 5px;\n}\n\n#failText {\n    text-align: right;\n    visibility: hidden;\n}\n\n#bigClick, #liveSolve {\n    margin-left: 20px;\n}\n\n#pieceForm input {\n    width: 50px;\n    height: 20px;\n    margin-left: 10px;\n}\n\n.centerMiddleChild {\n    display: flex;\n}\n\n.centerMiddleChild > :nth-child(1), .centerMiddleChild > :nth-child(3) {\n    flex: 1;\n}\n\n#instructions {\n    margin-left: 30px;\n}\n\n#paragraph {\n    padding-right: 80px;\n}\n\n#currentPieces {\n    white-space: nowrap;\n}", ""]);
            const o = r
        }
    },
    0, [
        [372, 666, 736]
    ]
]);
