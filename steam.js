(function() {
    var createModuleFactory = function createModuleFactory(t) {
        var e;
        return function(r) {
            return e || t(e = {
                    exports: {},
                    parent: r
                }, e.exports),
                e.exports
        }
    };
    var _$withdraw_75 = createModuleFactory(function(module, exports) {;;
        const card = _$sinUmd_43((attrs, children) => _$sinUmd_43 `.rounded.font-bold.text-gray-200.text-sm.flex.flex-col.w-200.h-170.bg-gray-500.mr-20.p-10.uppercase` (attrs, children));;
        module.exports = Socket => _$sinUmd_43(({
            route
        }) => route({
            '/': _$sinUmd_43(() => _$sinUmd_43 `div.flex.flex-row` ([_$sinUmd_43 `div.m-30.flex-1` ([_$sinUmd_43 `div.flex.flex-row.mb-30` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase` ('Withdraw Options')]), _$sinUmd_43 `h2.uppercase.text-gray-200.font-bold.text-sm.mb-20` ('Withdraw Skins'), _$sinUmd_43 `.flex.flex-row.mb-50` ([card `.cursor-pointer.hover:bg-gray-400` ({
                onclick() {
                    route(route + '/steam')
                }
            }, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex` (_$sinUmd_43 `img.m-auto; w 94` ({
                src: '/images/csgo.png',
                alt: 'CSGO'
            })), _$sinUmd_43 `span.ml-10` ('CSGO')])]), _$balance_22.deposited < 500 || ['US', 'XX', 'T1'].includes(_$auth_21.country) ? [] : [_$sinUmd_43 `h2.uppercase.text-gray-200.font-bold.text-sm.mb-20` ('Withdraw Cryptocurrency'), _$sinUmd_43 `.flex.flex-row.mb-50` ([card `.cursor-pointer.hover:bg-gray-400` ({
                onclick() {
                    route(route + '/eth')
                }
            }, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex; c black` (_$icons_8.eth `.w-60.m-auto`), _$sinUmd_43 `span.ml-10` ('Ethereum (ETH)')]), card `.opacity-25` ({}, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex; c black` (_$icons_8.btc `.w-60.m-auto`), _$sinUmd_43 `span.ml-10` ('Bitcoin (BTC) ', _$sinUmd_43 `span.text-xs` ('- Coming Soon'))])])]])])),
            '/eth': guard(!(_$balance_22.deposited < 500 || ['US', 'XX', 'T1'].includes(_$auth_21.country)), route, _$withdraw_62({})),
            '/steam': _$withdraw_74({})(Socket)
        }))

        function guard(prop, route, view) {
            if (prop === false)
                return () => route('/', {
                    replace: true
                })
            return view
        }
    });
    var _$withdraw_74 = createModuleFactory(function(module, exports) {;
        const {
            buttonFlat, buttonYellow, buttonLink
        } = _$button_4;;;;;
        const {
            filterPriceQuery, filterPriceFn
        } = _$utils_73;;;;;;;

        function rarity(r) {
            switch (r) {
                case 'Contraband':
                    return '#FFB963'
                case 'Covert':
                case 'Extraordinary':
                    return '#FF6566'
                case 'Classified':
                case 'Exotic':
                    return '#FF8FD4'
                case 'Restricted':
                case 'Remarkable':
                    return '#B088FF'
                case 'Mil-Spec Grade':
                case 'High Grade':
                    return '#6F91FF'
                case 'Industrial Grade':
                    return '#69D0FC'
                default:
                    return '#8D8EA0'
            }
        }

        function rarityHighlights(r) {
            return _$sinUmd_43 `
    border-color: ${rarity(r)};
    background-image: linear-gradient(0, ${rarity(r) + '36'}, ${rarity(r) + '00'});
  `
        }
        const select = _$sinUmd_43(({
            label, oninput
        }, options) => _$sinUmd_43 `label.uppercase.font-bold.text-sm.items-center.text-center.justify-center.text-gray-200` (label, _$sinUmd_43 `select.appearance-none.adjust-exact.uppercase.font-bold.bg-gray-700.text-yellow.rounded.h-20.focus:bg-gray-800.focus:outline-none.ml-10
    background-repeat: no-repeat;
    background-image: url('/icons/arrow-down-yellow.svg');
    background-position: right .5rem center;
    padding-right: 1.25rem;
  ` ({
            oninput
        }, options)))
        module.exports = (Socket) => _$sinUmd_43(({
            route
        }) => {
            var items = []
            var showTradelocked = false
            var showCustomPriced = true
            var sortOrder = 1
            var filterPrice = '-1'
            var loading = true
            var query = ''
            var submitting = false
            var marketError = ''
            var withdrawError = ''
            async
            function fetchmarket() {
                const {
                    min, max
                } = filterPriceQuery(filterPrice)
                items = []
                loading = true
                marketError = ''
                const {
                    items: newItems,
                    error
                } = await _$sinUmd_43.request({
                    method: 'GET',
                    url: "https://api.rollbit.com" + '/steam/market',
                    withCredentials: true,
                    params: {
                        query, order: sortOrder, showTradelocked, showCustomPriced, min, max
                    }
                })
                loading = false
                if (error) {
                    marketError = error
                    items = []
                    return
                }
                items = newItems
                filter()
            }
            async
            function fetchwithdrawals() {;
                ({
                    withdrawals
                } = await _$sinUmd_43.request({
                    method: 'GET',
                    url: "https://api.rollbit.com" + '/steam/withdrawals',
                    withCredentials: true
                }))
                withdrawals.sort(_$stateOrdering_70)
            }
            async
            function loadmore() {
                var {
                    min, max
                } = filterPriceQuery(filterPrice)
                if (sortOrder > 0)
                    max = Math.min(...filtered.map(i => i.price))
                else
                    min = Math.max(...filtered.map(i => i.price))
                marketError = ''
                const {
                    items: moreItems,
                    error
                } = await _$sinUmd_43.request({
                    method: 'GET',
                    url: "https://api.rollbit.com" + '/steam/market',
                    withCredentials: true,
                    params: {
                        query, order: sortOrder, showTradelocked, showCustomPriced, min, max
                    }
                })
                if (error) {
                    marketError = error
                    items = []
                    return
                }
                items.push(...moreItems)
                filter()
            }
            var withdrawQueue = []
            var withdrawals = []

            function queuewithdrawal(item) {
                if (submitting)
                    return
                withdrawQueue.push(item)
            }

            function dequeuewithdrawal(item) {
                if (submitting)
                    return
                withdrawQueue.splice(withdrawQueue.indexOf(item), 1)
            }
            const search = _$pDebounce_35(fetchmarket, 200)
            var filtered = items

            function filter() {
                filtered = items.filter(i => showCustomPriced ? true : i.markup <= 0).filter(filterPriceFn(filterPrice)).filter(i => i.items.some(it => it.name.toLowerCase().includes(query.toLowerCase()))).filter(i => withdrawQueue.findIndex(wq => i.ref === wq.ref) < 0).sort((a, b) => sortOrder * sortPrice(a, b))
            }
            async
            function dowithdraw() {
                async
                function attempt() {
                    submitting = true
                    withdrawError = ''
                    const res = await _$sinUmd_43.request({
                        method: 'POST',
                        url: "https://api.rollbit.com" + '/steam/withdraw',
                        withCredentials: true,
                        body: {
                            refs: withdrawQueue.map(w => w.ref)
                        }
                    })
                    submitting = false
                    if (res.success === false) {
                        if (res.error.hasTradeInfo === false) {
                            const self = _$steamModal_71(() => {
                                modals.splice(modals.indexOf(self), 1)
                                attempt()
                            }, () => {
                                modals.splice(modals.indexOf(self), 1)
                            })
                            modals.push(self)
                            return
                        }
                        if (res.error) {
                            withdrawError = res.error
                            return
                        }
                    }
                    withdrawals = res.withdrawals
                    withdrawals.sort(_$stateOrdering_70)
                    withdrawQueue = []
                    filter()
                }
                return attempt()
            }
            async
            function removewithdrawal(item) {
                withdrawals.splice(withdrawals.indexOf(item), 1)
                await _$sinUmd_43.request({
                    method: 'DELETE',
                    url: "https://api.rollbit.com" + '/steam/withdraw',
                    withCredentials: true,
                    body: {
                        ref: item.ref
                    }
                })
            }
            async
            function ackwithdrawal(item) {
                var [withd] = withdrawals.splice(withdrawals.indexOf(item), 1)
                await _$sinUmd_43.request({
                    method: 'POST',
                    url: "https://api.rollbit.com" + '/steam/withdraw/ack',
                    withCredentials: true,
                    body: {
                        ref: withd.ref
                    }
                })
            }
            const teardownMarket = Socket.listen('steam/market', (item) => {
                if (item.state === 'listed')
                    items.push(item)
                if (item.state === 'gone') {
                    const idx = items.findIndex(i => i.ref === item.ref)
                    if (idx != null)
                        items.splice(idx, 1)
                    const idxWithdraws = withdrawQueue.findIndex(i => i.ref === item.ref)
                    if (idxWithdraws != null)
                        withdrawQueue.splice(idxWithdraws, 1)
                }
                filter()
            })
            const teardownWithdrawals = Socket.listen('steam/withdrawal', (item) => {
                var d = withdrawals.find(d => d.ref === item.ref)
                if (d != null)
                    Object.assign(d, item)
                if (item.state === 'confirmed')
                    _$sounds_27.play('ready')
                _$sinUmd_43.redraw()
            })
            const modals = []
            return () => {
                const insufficientBalance = withdrawQueue.reduce((s, i) => s + i.price, 0) > _$balance_22.balance / 100
                return _$sinUmd_43 `div.flex.flex-row` ({
                    life() {
                        fetchmarket()
                        return () => {
                            teardownMarket()
                            teardownWithdrawals()
                        }
                    }
                }, [_$p2pWithdrawModal_69(), modals, _$sinUmd_43 `div.m-30.flex-1` ([_$sinUmd_43 `div.flex.flex-row.mb-30` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase` ('Withdraw CSGO Skins'), !(_$balance_22.deposited <= 0 || ['US', 'XX', 'T1'].includes(_$auth_21.country)) && buttonFlat.medium `.uppercase.px-15.ml-auto` ({
                    onclick() {
                        route('/withdraw')
                    }
                }, ['Other methods', _$icons_8.arrowBack `.ml-10; transform scaleX(-1)`])]), _$sinUmd_43 `div.flex.flex-row.items-center.mb-20` (_$sinUmd_43 `div.relative.mr-auto` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-40.w-160.p-16.pl-40.text-gray-100.font-body.font-medium.text-base.focus:border-yellow.focus:outline-none.rounded
              ::placeholder {
                color: var(--color-gray-100);
                opacity: 0.3;
              }
            ` ({
                    value: query,
                    placeholder: 'Search...',
                    oninput() {
                        query = this.value;
                        filter();
                        search()
                    }
                }), _$icons_8.search({
                    className: 'absolute inset-y-auto text-gray-300 top-0 bottom-0 m-auto',
                    style: 'height: 20px; transform: scale(0.7); left: 16px'
                })]), _$sinUmd_43 `label.font-medium.text-base.text-gray-200.align-text` (_$checkbox_5 `.mr-10.-mb-px` ({
                    checked: showCustomPriced,
                    oninput() {
                        showCustomPriced = this.checked;
                        filter();
                        search()
                    }
                }), _$sinUmd_43 `span.inline-block.mb-px` ('Custom Priced')), _$sinUmd_43 `.mr-20.border-r.border-l.border-gray-400.px-20.mx-20` (select({
                    label: ['Price range ', _$icons_8.coins `.inline-block.text-yellow.-mb-px.ml-10; w 12; h 14; transform scale(0.6)`],
                    oninput() {
                        filterPrice = this[this.selectedIndex].value;
                        filter();
                        search()
                    }
                }, [_$sinUmd_43 `option` ({
                    value: -1
                }, 'All'), _$sinUmd_43 `option` ({
                    value: 0
                }, '0–5'), _$sinUmd_43 `option` ({
                    value: 5
                }, '5–25'), _$sinUmd_43 `option` ({
                    value: 25
                }, '25–100'), _$sinUmd_43 `option` ({
                    value: 100
                }, '100–500'), _$sinUmd_43 `option` ({
                    value: 500
                }, '500+')])), select({
                    label: 'Sort by',
                    oninput() {
                        sortOrder = this[this.selectedIndex].value;
                        filter();
                        search()
                    }
                }, [_$sinUmd_43 `option` ({
                    value: 1
                }, 'Highest price'), _$sinUmd_43 `option` ({
                    value: -1
                }, 'Lowest price')])), _$sinUmd_43(() => () => {
                    if (loading)
                        return _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-300.uppercase.mx-auto.my-30` ('Loading...')
                    if (marketError)
                        return _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-300.uppercase.mx-auto.my-30` (marketError)
                    if (filtered.length === 0)
                        return _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-300.uppercase.mx-auto.my-30` ('No items match')
                    return _$sinUmd_43 `div.grid.grid-flow-row.overflow-y-scroll
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 10px;
          flex: 1 1 0%;
          ` (filtered.map(item))
                }), buttonFlat.large `.uppercase.mt-20.mx-auto.px-20` ({
                    disabled: loading,
                    onclick() {
                        loadmore()
                    }
                }, 'Load More')]), withdrawQueue.length ? _$sinUmd_43 `section.bg-gray-600.w-280.flex.flex-col.flex-none.sticky
          top 60
          height calc(100vh - 60px)
        ` ({}, [_$sinUmd_43 `header.p-30.font-body.text-sm.items-center.flex.flex-col` ({}, [_$sinUmd_43 `.uppercase.w-1.flex.flex-row.justify-center.align-center.text-sm.font-bold.text-gray-200.mb-20` ('You will spend ', _$icons_8.coins `.inline-block.mx-5.text-yellow; w 16; h 14; transform scale(0.6)`, _$sinUmd_43 `span.text-gray-100.font-medium.font-numeric` (withdrawQueue.reduce((s, i) => s + i.price, 0).toFixed(2))), buttonYellow.large `.w-1.uppercase` ({
                    onclick: dowithdraw,
                    disabled: submitting || insufficientBalance
                }, insufficientBalance ? 'Insufficient Balance' : 'Withdraw'), _$sinUmd_43 `p.text-red.font-medium.text-base.mt-15` (withdrawError)]), _$sinUmd_43 `section.px-20.overflow-y-scroll.flex.flex-col
            flex: 1;
          ` ({}, [withdrawQueue.map(i => [_$itemCard_67({
                    onclick() {
                            dequeuewithdrawal(i);
                            filter();
                            search()
                        },
                        item: i.items[0],
                        key: 'withdrawing:item-card:' + item.ref
                })])])]) : _$sinUmd_43 `section.bg-gray-600.w-280.flex.flex-col.flex-none.sticky
          top 60
          height calc(100vh - 60px)
        ` ({}, [_$sinUmd_43 `header.h-50.px-20.font-body.text-sm.text-gray-100.bg-gray-500.items-center.flex` ({}, [`Withdrawals (${withdrawals.length})`]), _$sinUmd_43 `section.p-20.overflow-y-scroll.flex.flex-col
            flex: 1;
          ` (_$sinUmd_43(async() => {
                    await fetchwithdrawals()
                    return () => {
                        if (withdrawals.length === 0)
                            return _$sinUmd_43 `.m-auto.self-center.text-center.font-bold.text-gray-200.text-sm.uppercase` ({
                                key: 'no-key'
                            }, [_$icons_8.lightning `.inline-block`, _$sinUmd_43 `` ('No active trades')])
                        return withdrawals.map((item) => [_$sinUmd_43 `div.border-b.border-gray-400.mb-20
                  :last-child {
                    border none
                  }
                ` ({
                            key: 'withdrawal:item-card:' + item.ref
                        }, listing(item))])
                    }
                }, _$sinUmd_43 `.m-auto.self-center.text-center.font-bold.text-gray-200.text-sm.uppercase` ({
                    key: 'no-key'
                }, 'Loading...')))])])
            }

            function listing(item) {
                switch (item.state) {
                    case 'withdrawn':
                        return [_$itemCard_67({
                            onclick() {
                                    removewithdrawal(item);
                                    filter()
                                },
                                item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-10.font-medium.text-sm.text-gray-200` (['The seller has ', [_$fastText_6(() => formatAcceptExpire(item))
                            `span.ml-auto.font-numeric.text-gray-100` ({
                                key: item.state
                            })
                        ], ' to accept']), progressAccept(item), buttonLink.medium `.w-1.uppercase` ({
                            onclick() {
                                removewithdrawal(item);
                                filter()
                            }
                        }, 'Cancel Trade')])]
                    case 'accepted':
                        return [_$itemCard_67({
                            item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-10.font-medium.text-sm.text-gray-200` (['The seller has ', [_$fastText_6(() => formatConfirmExpire(item))
                            `span.ml-auto.font-numeric.text-gray-100` ({
                                key: item.state
                            })
                        ], ' to send you the trade']), progressConfirm(item)])]
                    case 'confirmed':
                        return [_$itemCard_67({
                            item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-10.font-medium.text-sm.text-gray-200` (['You have ', [_$fastText_6(() => formatCompleteExpire(item))
                            `span.ml-auto.font-numeric.text-gray-100` ({
                                key: item.state
                            })
                        ], ' to accept the trade']), progressComplete(item), buttonYellow.large `.uppercase.w-200.mt-15.mx-auto` ({
                            onclick(e) {
                                window.open(`https://steamcommunity.com/tradeoffer/${item.tradeofferid}/`, '_blank', 'noreferrer')
                            }
                        }, 'View Trade')])]
                    case 'buyer_cancelled':
                        return [_$itemCard_67({
                            onclick() {
                                    ackwithdrawal(item)
                                },
                                item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('You cancelled the trade'), buttonLink.medium `.w-1.uppercase` ({
                            onclick() {
                                ackwithdrawal(item)
                            }
                        }, 'Dismiss')])]
                    case 'seller_cancelled':
                        return [_$itemCard_67({
                            onclick() {
                                    ackwithdrawal(item)
                                },
                                item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('Seller cancelled the trade'), buttonLink.medium `.w-1.uppercase` ({
                            onclick() {
                                ackwithdrawal(item)
                            }
                        }, 'Dismiss')])]
                    case 'cancelled':
                        return [_$itemCard_67({
                            onclick() {
                                    ackwithdrawal(item)
                                },
                                item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('Your trade was cancelled on Steam'), buttonLink.medium `.w-1.uppercase` ({
                            onclick() {
                                ackwithdrawal(item)
                            }
                        }, 'Dismiss')])]
                    case 'expired':
                        return [_$itemCard_67({
                            onclick() {
                                    ackwithdrawal(item)
                                },
                                item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('The trade expired'), buttonLink.medium `.w-1.uppercase` ({
                            onclick() {
                                ackwithdrawal(item)
                            }
                        }, 'Dismiss')])]
                    case 'completed':
                        return [_$itemCard_67({
                            onclick() {
                                    ackwithdrawal(item)
                                },
                                item: item.items[0]
                        }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('The trade completed'), buttonLink.medium `.w-1.uppercase` ({
                            onclick() {
                                ackwithdrawal(item)
                            }
                        }, 'Dismiss')])]
                }
            }

            function sortPrice(a, b) {
                return -_$compare_34(a.price, b.price)
            }

            function item(it) {
                var i = it.items[0]
                i.tradable = true
                return _$sinUmd_43 `div.h-240.rounded.relative` ({
                    key: it.ref,
                    className: 'bg-gray-400 ' + (i.tradable ? 'cursor-pointer hover:bg-gray-300 transition duration-75 ease-in-out' : ''),
                    onclick: i.tradable ? function() {
                        queuewithdrawal(it);
                        filter()
                    } : () => {}
                }, [_$sinUmd_43 `div.h-120.flex.bg-gray-600.relative.border-b
        ${rarityHighlights(i.rarity)}
      ` ([_$sinUmd_43 `img.mx-auto.self-center.z-20.-mb-15.w-100` ({
                    src: `https://steamcommunity-a.akamaihd.net/economy/image/${i.image}/200x200`,
                    alt: i.weapon + ' | ' + i.skin
                }), _$sinUmd_43 `p.font-bold.text-xs.text-gray-200.uppercase.absolute; t 10; l 10;` (i.exterior || ' '), [i.tradable ? '' : _$icons_8.lock `.text-yellow.absolute; w 12; b 10; l 10; transform scale(0.6)`]]), _$sinUmd_43 `div.p-15.font-medium.text-base.leading-tight.text-gray-100` ([i.skin && _$sinUmd_43 `p.font-bold.text-xs.text-gray-200.mb-10.leading-none` (i.weapon), i.skin == null ? i.weapon : i.skin]), _$sinUmd_43 `div.absolute.font-medium.text-sm.text-gray-100; b 10; l 10;` ([_$icons_8.coins `.inline-block.mr-10.text-yellow; w 12; h 14; transform scale(0.6)`, it.price.toFixed(2), i.markup ? _$sinUmd_43 `span.inline-block.ml-10` ({
                    className: Math.sign(it.markup) > 0 ? 'text-gray-200' : 'text-green-text'
                }, ` (${Math.sign(it.markup) > 0 ? '+' : ''}${it.markup}%)`) : ''])])
            }
        })

        function formatAcceptExpire(item) {
            return new Date(Math.max(0, Date.parse(item.acceptExpireAt) - Date.now())).toISOString().substr(14, 5)
        }

        function formatConfirmExpire(item) {
            return new Date(Math.max(0, Date.parse(item.confirmExpireAt) - Date.now())).toISOString().substr(14, 5)
        }

        function formatCompleteExpire(item) {
            return new Date(Math.max(0, Date.parse(item.completedExpireAt) - Date.now())).toISOString().substr(14, 5)
        }

        function progressAccept(item) {
            const delta = Date.parse(item.acceptExpireAt) - Date.parse(item.withdrawnAt)
            const progress = Date.parse(item.acceptExpireAt) - Date.now()
            return _$sinUmd_43 `div.progress.w-140.h-5.bg-gray-800.overflow-hidden; br 3` (_$sinUmd_43 `div.progress.h-5.bg-yellow.w-1
      br 3
      transform scaleX(0)
      transform-origin 0
      animation ${delta}ms -${delta - progress}ms linear {
        from {
          transform scaleX(1)
        }
      }
    `)
        }

        function progressConfirm(item) {
            const delta = Date.parse(item.confirmExpireAt) - Date.parse(item.acceptedAt)
            const progress = Date.parse(item.confirmExpireAt) - Date.now()
            return _$sinUmd_43 `div.progress.w-140.h-5.bg-gray-800.mb-15.overflow-hidden; br 3` (_$sinUmd_43 `div.progress.h-5.bg-yellow.w-1
      br 3
      transform scaleX(0)
      transform-origin 0
      animation ${delta}ms -${delta - progress}ms linear {
        from {
          transform scaleX(1)
        }
      }
    `)
        }

        function progressComplete(item) {
            const delta = Date.parse(item.completedExpireAt) - Date.parse(item.confirmedAt)
            const progress = Date.parse(item.completedExpireAt) - Date.now()
            return _$sinUmd_43 `div.progress.w-140.h-5.bg-gray-800.mb-15.overflow-hidden; br 3` (_$sinUmd_43 `div.progress.h-5.bg-yellow.w-1
      br 3
      transform scaleX(0)
      transform-origin 0
      animation ${delta}ms -${delta - progress}ms linear {
        from {
          transform scaleX(1)
        }
      }
    `)
        }
    });
    var _$withdraw_62 = createModuleFactory(function(module, exports) {;;
        const {
            buttonGreen, buttonLink, buttonFlat
        } = _$button_4;;
        const steamDollar = 1.7
        module.exports = _$sinUmd_43(({
            route
        }) => {
            async
            function fetchInfo() {
                return _$sinUmd_43.request({
                    method: 'GET',
                    url: "https://api.rollbit.com" + '/eth/withdrawals',
                    withCredentials: true
                })
            }
            async
            function withdraw() {
                pending = true
                try {
                    var res = await _$sinUmd_43.request({
                        method: 'POST',
                        url: "https://api.rollbit.com" + '/eth/withdraw',
                        withCredentials: true,
                        body: {
                            address: addressInput.toLowerCase(),
                            amount: Math.round(amountInput * 100)
                        }
                    })
                    if (res.success) {
                        withdrawals.unshift(res.withdrawal)
                        while (withdrawals.length > 2)
                            withdrawals.pop()
                        addressInput = ''
                        amountInput = ''
                        submitError = ''
                        addressError = false
                        amountError = false
                        return
                    }
                    if (res.error) {
                        submitError = res.error
                    }
                } catch (ex) {
                    submitError = 'Unexpected error. Try again later'
                } finally {
                    pending = false
                }
            }
            var exchangeRate = 1
            var coins = 170
            var coinsInput = 170
            var withdrawals = []
            var pending = false
            var addressInput = ''
            var addressError = false
            var amountInput = ''
            var amountError = false
            var submitError = ''
            fetchInfo().then(info => {
                exchangeRate = info.exchangeRate
                withdrawals = info.withdrawals
            })

            function fixupCoinsInput() {
                if (typeof coinsInput === 'string')
                    coinsInput = parseFloat(coinsInput)
                if (Number.isNaN(coinsInput))
                    coinsInput = 0
                coinsInput = clamp(0, Infinity, Math.round(coinsInput * 100) / 100)
            }

            function fixupCoins() {
                if (typeof coinsInput === 'string')
                    coins = parseFloat(coinsInput)
                else
                    coins = coinsInput
                if (Number.isNaN(coins))
                    coins = 0
                coins = clamp(0, Infinity, Math.round(coins * 100) / 100)
            }

            function clamp(min, max, v) {
                v = Math.abs(v)
                if (v > max)
                    return max
                if (v < min)
                    return min
                return v
            }

            function validateAddress() {
                addressError = !/^0x[A-Za-z0-9]{40}$/.test(addressInput)
            }

            function validateAmount() {
                amountInput = Math.round(parseFloat(amountInput) * 100) / 100
                if (Number.isNaN(amountInput)) {
                    amountInput = ''
                    amountError = true
                }
                if (amountInput < 0) {
                    amountInput = ''
                    amountError = true
                }
                if (amountInput < 5) {
                    amountInput = ''
                    amountError = true
                    submitError = 'Minimum withdrawal is 5.00 Coins'
                }
                if (amountInput > _$balance_22.balance / 100)
                    amountError = true
            }
            return () => {
                return [_$sinUmd_43 `header.text-center.my-50` ([buttonFlat.medium `.uppercase.px-15.ml-30.-mt-15.float-left` ({
                    onclick() {
                        route('/withdraw')
                    }
                }, [_$icons_8.arrowBack `.mr-10`, 'Back']), _$icons_8.eth `.w-50.h-50.m-auto.mb-30`, _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase.mb-10` ('Withdraw Ethereum'), _$sinUmd_43 `h2.text-base.font-medium.text-gray-200` (`1 ETH = ${exchangeRate > 1 ? `
                    $$ {
                        exchangeRate.toFixed(2)
                    }
                    USD ` : 'Loading'}`)]), _$sinUmd_43 `form.m-auto.flex.flex-row.rounded.p-30.bg-gray-500.mb-40
        max-width 730
      ` ({
                    onsubmit(e) {
                        e.preventDefault()
                        validateAddress()
                        validateAmount()
                        if (amountError || addressError) {
                            submitError = 'Address or amount is invalid'
                            return
                        }
                        withdraw()
                    }
                }, [_$sinUmd_43 `div.flex-1` ([_$sinUmd_43 `p.text-gray-100.text-lg.leading-normal.mb-40.font-medium` ('Please enter the Ethereum wallet address you wish to receive the funds on. Once confirmed, the withdrawal is usually processed within a few minutes.'), _$sinUmd_43 `label.font-bold.text-sm.text-gray-200.mb-10.block.uppercase.block` ('Receiving Ethereum Address'), _$sinUmd_43 `div.relative.mb-30
          ` ([_$sinUmd_43 `input.bg-gray-700.font-body.font-medium.text-gray-100.rounded.w-1.px-20.text-base.focus:outline-none.focus:border-yellow.border
            line-height: 50px;

            ::placeholder {
              color: var(--color-gray-100);
              opacity: 0.3;
            }
            ` ({
                    placeholder: 'Paste your Ethereum Wallet receiving address…',
                    className: addressError ? 'border-red focus:border-red' : 'border-gray-700 focus:border-yellow',
                    value: addressInput,
                    oninput: (e) => {
                        addressInput = e.target.value
                        addressError = false
                        submitError = ''
                    },
                    onblur: () => {
                        validateAddress()
                    }
                })]), _$sinUmd_43 `p.font-body.text-sm.italic.font-normal.text-gray-200.mb-20.ml-10
            margin-top: -25px;
          ` ('Smart contracts are currently not supported'), _$sinUmd_43 `label.font-bold.text-sm.text-gray-200.mb-10.block.uppercase.block` (['Withdraw Amount', _$sinUmd_43 `span.italic.text-xs` ('(min 5.00)')]), _$sinUmd_43 `div.mb-30.flex.flex-row.items-center` ([_$sinUmd_43 `div.relative.mr-30
            ` ([_$sinUmd_43 `input.bg-gray-700.border.h-50.p-16.pl-40.text-gray-100.font-body.text-base.font-medium.focus:border-yellow.focus:outline-none.rounded.w-200.font-numeric
                ::placeholder {
                  color: var(--color-gray-100);
                  opacity: 0.3;
                }
              ` ({
                    inputmode: 'decimal',
                    placeholder: '5.00',
                    className: amountError ? 'border-red focus:border-red' : 'border-gray-700 focus:border-yellow',
                    value: typeof amountInput === 'number' ? amountInput.toFixed(2) : amountInput,
                    oninput: (e) => {
                        amountInput = e.target.value
                        amountError = false
                        submitError = ''
                    },
                    onblur: () => {
                        validateAmount()
                    }
                }), _$icons_8.coins({
                    className: 'absolute inset-y-auto text-yellow top-0 bottom-0 m-auto',
                    style: 'height: 18px; transform: scale(0.7); left: 16px'
                })]), _$sinUmd_43 `p.font-medium.text-base.text-gray-200.flex.flex-row.items-center` (['Available Balance:', _$icons_8.coins `.ml-10.mr-5.h-15.text-yellow
                transform: scale(0.7);
              `, _$sinUmd_43 `span.text-gray-100` ((_$balance_22.balance / 100).toFixed(2))])]), _$sinUmd_43 `div.flex.flex-row.items-center` ([buttonGreen.large `.w-200.uppercase.mr-30` ({
                    type: 'submit',
                    disabled: pending
                }, 'Request Withdrawal'), _$sinUmd_43 `p.text-red.font-medium.text-base` (submitError)])])]), _$sinUmd_43 `section.m-auto.rounded.p-30.bg-gray-500.mb-40
        max-width 730
      ` ([_$sinUmd_43 `div.mr-40.flex-1.text-base.text-gray-100.font-medium.items-center
          display: grid;
          gap: 20px;
          grid-template-columns: auto 1fr auto 1fr auto 1fr;
        ` ([_$sinUmd_43 `label.font-bold.text-sm.text-gray-200.uppercase` ('Calculator'), _$sinUmd_43 `div.relative
          ` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-50.p-16.pl-40.text-gray-100.font-body.text-base.font-medium.focus:border-yellow.focus:outline-none.rounded.font-numeric.w-1
            ` ({
                    inputmode: 'decimal',
                    value: typeof coinsInput === 'number' ? coinsInput.toFixed(2) : coinsInput,
                    oninput: (e) => {
                        coinsInput = e.target.value
                        fixupCoins()
                    },
                    onblur: (e) => {
                        fixupCoinsInput()
                    }
                }), _$icons_8.coins({
                    className: 'absolute inset-y-auto text-yellow top-0 bottom-0 m-auto',
                    style: 'height: 20px; transform: scale(0.7); left: 16px'
                })]), '=', _$sinUmd_43 `div.relative
          ` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-50.p-16.pl-50.text-gray-100.font-body.text-base.font-medium.focus:outline-none.rounded.font-numeric.w-1
            ` ({
                    value: (coins / (exchangeRate * steamDollar)).toPrecision(7),
                    readonly: true
                }), _$icons_8.eth({
                    className: 'absolute inset-y-auto top-0 bottom-0 m-auto',
                    style: 'height: 20px; width: 20px; left: 16px; color: #000'
                })]), '=', _$sinUmd_43 `div.relative
          ` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-50.p-16.pl-50.text-gray-100.font-body.text-base.font-medium.focus:outline-none.rounded.font-numeric.w-1
            ` ({
                    value: (coins / steamDollar).toFixed(2),
                    readonly: true
                }), _$icons_8.dollar({
                    className: 'absolute inset-y-auto text-gray-200 top-0 bottom-0 m-auto',
                    style: 'height: 20px; transform: scale(0.8); left: 20px'
                })])]), _$sinUmd_43 `p.font-body.text-sm.italic.font-normal.text-gray-200.text-center.mt-20` ('The value of Ethereum may vary between now and the time we send your payment')]), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase.mt-70.mb-40.text-center` ('Ethereum Withdrawals'), _$table_49 `.mb-50.mx-auto
      max-width 1060
      ` ({
                    headers: ['Date / Time', 'Amount', 'Status', '']
                }, withdrawals.map(w => _$sinUmd_43 `tr.bg-gray-700.text-gray-100.text-base.font-medium
        border-bottom: 2px solid var(--color-gray-500);
      ` ([_$sinUmd_43 `td.pl-10.py-15.rounded-l.text-gray-200` (w == null ? '-' : new Date(w.timestamp).toLocaleDateString(undefined, {
                    dateStyle: 'short',
                    timeStyle: 'medium'
                })), _$sinUmd_43 `td.pl-10.py-15` ([_$icons_8.eth `.inline-block.mr-10.w-20.h-20.align-middle
          color #000
          `, w.amount == null ? '-' : (w.amount / 10e17).toPrecision(15).replace(/0+$/, '')]), _$sinUmd_43 `td.pl-10.py-15.capitalize` ({
                    className: w.status === 'confirmed' ? 'text-green' : 'text-gray-200'
                }, w.status), _$sinUmd_43 `td.pl-10.py-15.rounded-r` (w.txId == null ? '' : _$sinUmd_43 `a` ({
                    href: `https://etherscan.io/tx/${w.txId}`,
                    target: '_blank',
                    rel: 'noreferrer'
                }, buttonLink.small `.px-15.uppercase.text-gray-100.ml-auto.mr-15` ('View')))])))]
            }
        })
    });
    var _$deposit_60 = createModuleFactory(function(module, exports) {;;
        const card = _$sinUmd_43((attrs, children) => _$sinUmd_43 `.rounded.font-bold.text-gray-200.text-sm.flex.flex-col.w-200.h-170.bg-gray-500.mr-20.p-10.uppercase` (attrs, children));
        module.exports = _$sinUmd_43(({
            route
        }) => {
            return route({
                '/': _$sinUmd_43(() => _$sinUmd_43 `div.flex.flex-row` ([_$sinUmd_43 `div.m-30.flex-1` ([_$sinUmd_43 `div.flex.flex-row.mb-30` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase` ('Deposit Options')]), _$sinUmd_43 `h2.uppercase.text-gray-200.font-bold.text-sm.mb-20` ('Deposit with Skins'), _$sinUmd_43 `.flex.flex-row.mb-50` ([card `.cursor-pointer.hover:bg-gray-400` ({
                    onclick() {
                        route(route + '/steam')
                    }
                }, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex` (_$sinUmd_43 `img.m-auto; w 94` ({
                    src: '/images/csgo.png',
                    alt: 'CSGO'
                })), _$sinUmd_43 `span.ml-10` ('CSGO')])]), ['US', 'XX', 'T1'].includes(_$auth_21.country) ? [] : [_$sinUmd_43 `h2.uppercase.text-gray-200.font-bold.text-sm.mb-20` ('Deposit with Cryptocurrency'), _$sinUmd_43 `.flex.flex-row.mb-50` ([card `.cursor-pointer.hover:bg-gray-400` ({
                    onclick() {
                        route(route + '/eth')
                    }
                }, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex; c black` (_$icons_8.eth `.w-60.m-auto`), _$sinUmd_43 `span.ml-10` ('Ethereum (ETH)')]), card `.opacity-25` ({}, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex; c black` (_$icons_8.btc `.w-60.m-auto`), _$sinUmd_43 `span.ml-10` ('Bitcoin (BTC) ', _$sinUmd_43 `span.text-xs` ('- Coming Soon'))])]), _$sinUmd_43 `h2.uppercase.text-gray-200.font-bold.text-sm.mb-20` ('Deposit with Local Currency', _$sinUmd_43 `span.text-green-text.ml-5` ('New')), _$sinUmd_43 `.flex.flex-row.mb-50` ([card `.cursor-pointer.hover:bg-gray-400` ({
                    onclick() {
                        route(route + '/visa')
                    }
                }, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex; c black` (_$icons_8.visa `.m-auto; w 79`), _$sinUmd_43 `span.ml-10` ('VISA')]), card `.cursor-pointer.hover:bg-gray-400` ({
                    onclick() {
                        route(route + '/mastercard')
                    }
                }, [_$sinUmd_43 `.bg-gray-800.rounded.h-120.mb-10.flex; c black` (_$icons_8.mastercard `.m-auto; w 68`), _$sinUmd_43 `span.ml-10` ('Mastercard')])])]])])),
                '/eth': guard(!['US', 'XX', 'T1'].includes(_$auth_21.country), route, _$deposit_61({})),
                '/steam': _$deposit_63({}),
                '/visa': guard(!['US', 'XX', 'T1'].includes(_$auth_21.country), route, _$deposit_59({})('visa')),
                '/mastercard': guard(!['US', 'XX', 'T1'].includes(_$auth_21.country), route, _$deposit_59({})('mastercard'))
            })
        })

        function guard(prop, route, view) {
            if (prop === false)
                return () => route('/', {
                    replace: true
                })
            return view
        }
    });
    var _$deposit_59 = createModuleFactory(function(module, exports) {;;
        const {
            buttonGreen, buttonFlat
        } = _$button_4;
        const coinDollar = 1.44
        const tinyButton = buttonFlat.small `.mr-5.w-40.text-gray-200
  fw 500
`
        module.exports = card => _$sinUmd_43(({
            route
        }) => {
            var coins = 12
            var coinsInput = 12
            var dollar = coins / coinDollar
            var dollarInput = coins / coinDollar
            var email = ''
            var dollarError = ''
            var emailError = ''
            var pending = false
            async
            function onsubmit() {
                if (dollar < 0.01)
                    return dollarError = 'Please enter a deposit amount'
                emailError = !/^\S+@\S+$/i.test(email)
                if (emailError)
                    return
                pending = true
                try {
                    var res = await _$sinUmd_43.request({
                        method: 'POST',
                        url: "https://api.rollbit.com" + '/payop/deposit',
                        withCredentials: true,
                        body: {
                            email: email,
                            amount: Math.round(dollar * 100) / 100,
                            card
                        }
                    })
                    if (res.success) {
                        dollarError = ''
                        window.location = res.url
                        return
                    }
                    if (res.error) {
                        dollarError = res.error
                    }
                } catch (ex) {
                    dollarError = 'Unexpected error. Try again later'
                } finally {
                    pending = false
                }
            }

            function ceil(v) {
                return Math.round(v * 100) / 100
            }

            function floor(v) {
                return Math.ceil(v * 100) / 100
            }

            function setDollar(val) {
                if (typeof val === 'number') {
                    dollar = val
                    dollarInput = dollar
                    coins = floor(dollar * coinDollar)
                    coinsInput = coins
                } else {
                    dollarInput = val
                    dollar = parseFloat(dollarInput)
                    coins = floor(dollar * coinDollar)
                    coinsInput = Number.isNaN(coins) ? '-' : coins
                }
            }

            function setCoins(val) {
                if (typeof val === 'number') {
                    dollar = ceil(val / coinDollar)
                    dollarInput = dollar
                    coins = floor(dollar * coinDollar)
                    coinsInput = coins
                } else {
                    coinsInput = val
                    coins = parseFloat(val)
                    dollar = ceil(coins / coinDollar)
                    coins = floor(dollar * coinDollar)
                    dollarInput = Number.isNaN(dollar) ? '-' : dollar
                }
            }

            function fixupCoinsInput() {
                if (typeof coinsInput === 'string')
                    coinsInput = parseFloat(coinsInput)
                if (Number.isNaN(coinsInput))
                    coinsInput = 0
                coinsInput = clamp(0, Infinity, floor(coinsInput))
                setCoins(coinsInput)
            }

            function fixupDollarInput() {
                if (typeof dollarInput === 'string')
                    dollarInput = parseFloat(dollarInput)
                if (Number.isNaN(dollarInput))
                    dollarInput = 0
                dollarInput = clamp(0, Infinity, ceil(dollarInput))
                setDollar(dollarInput)
            }

            function clamp(min, max, v) {
                v = Math.abs(v)
                if (v > max)
                    return max
                if (v < min)
                    return min
                return v
            }

            function allowedKeys(e) {
                return e.metaKey || ['Tab', 'Enter', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) || /[0-9.]/.test(e.key)
            }
            return () => {
                return [_$sinUmd_43 `header.text-center.my-50` ([buttonFlat.medium `.uppercase.px-15.ml-30.-mt-15.float-left` ({
                    onclick() {
                        route('/deposit')
                    }
                }, [_$icons_8.arrowBack `.mr-10`, 'Back']), _$sinUmd_43 `.w-100.m-auto.mb-30` (_$icons_8[card]
                    ``), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase.mb-10` ('Pay with ' + card)]), _$sinUmd_43 `form.m-auto.flex.flex-col.rounded.p-30.bg-gray-500.mb-40
        max-width 730
      ` ({
                    onsubmit
                }, [_$sinUmd_43 `p.text-gray-100.text-lg.leading-normal.mb-10.font-medium` ('Select the amount of coins you would like to purchase.'), _$sinUmd_43 `p.text-gray-100.text-lg.leading-normal.mb-30.font-medium` ('US, UK and Canadian cards are currently not supported.'), _$sinUmd_43 `div.mr-40.mb-30.items-center
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-areas:
          'label1 input1'
          'label2 input2'
          'label3 input3';
        grid-gap: 20px 20px;
        ` ([_$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Coin Amount'), _$sinUmd_43 `div.relative
            grid-area: input1;
          ` ([_$sinUmd_43 `input.w-1.bg-gray-700.border.h-50.p-16.pl-40.text-gray-100.font-body.text-sm.font-medium.focus:outline-none.rounded.font-numeric.border-gray-400.focus:border-yellow
            ` ({
                    inputmode: 'decimal',
                    value: typeof coinsInput === 'number' ? coinsInput.toFixed(2) : coinsInput,
                    onkeydown: allowedKeys,
                    oninput: (e) => {
                        setCoins(e.target.value)
                    },
                    onblur: () => {
                        fixupCoinsInput()
                    }
                }), _$icons_8.coins({
                    className: 'absolute inset-y-auto text-yellow top-0 bottom-0 m-auto',
                    style: 'height: 20px; transform: scale(0.7); left: 16px'
                }), _$sinUmd_43 `div.absolute.bottom-0.flex
              top: 10px;
              right: 5px;
              z-index: 1;
            ` ([tinyButton({
                    type: 'button',
                    onclick(e) {
                        e.preventDefault()
                        setCoins(coins + 5)
                    }
                }, '5'), tinyButton({
                    type: 'button',
                    onclick(e) {
                        e.preventDefault()
                        setCoins(coins + 10)
                    }
                }, '10'), tinyButton({
                    type: 'button',
                    onclick(e) {
                        e.preventDefault()
                        setCoins(coins + 25)
                    }
                }, '25'), tinyButton({
                    type: 'button',
                    onclick(e) {
                        e.preventDefault()
                        setCoins(coins + 50)
                    }
                }, '50'), tinyButton({
                    type: 'button',
                    onclick(e) {
                        e.preventDefault()
                        setCoins(coins + 100)
                    }
                }, '100'), tinyButton({
                    type: 'button',
                    onclick(e) {
                        e.preventDefault()
                        setCoins(0)
                    }
                }, 'Clear')])]), _$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('USD Value'), _$sinUmd_43 `div.relative
            grid-area: input2;
          ` ([_$sinUmd_43 `input.w-1.bg-gray-700.border.h-50.p-16.pl-40.text-gray-100.font-body.text-sm.font-medium.focus:outline-none.rounded.font-numeric
            ` ({
                    className: dollarError ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
                    inputmode: 'decimal',
                    value: typeof dollarInput === 'number' ? dollarInput.toFixed(2) : dollarInput,
                    onkeydown: allowedKeys,
                    oninput: (e) => {
                        setDollar(e.target.value)
                    },
                    onblur: () => {
                        fixupDollarInput();
                        dollarError = ''
                    }
                }), _$icons_8.dollar({
                    className: 'absolute inset-y-auto text-gray-200 top-0 bottom-0 m-auto',
                    style: 'height: 20px; transform: scale(0.7); left: 16px'
                }), dollarError && _$tooltip_13 `.z-10.whitespace-no-wrap.text-red; left: 80px; transform: translateX(-50%) translateY(7px);` (dollarError)]), _$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Email'), _$sinUmd_43 `` ([_$sinUmd_43 `input.w-1.bg-gray-700.border.h-50.p-16.text-gray-100.font-body.text-sm.font-medium.focus:outline-none.rounded
              font-variant-numeric: tabular-nums;
            ` ({
                    className: emailError ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
                    inputmode: 'email',
                    value: email,
                    oninput: (e) => {
                        email = e.target.value;
                        emailError = ''
                    },
                    onblur: (e) => {
                        emailError = !/^\S+@\S+$/i.test(email)
                    }
                }), _$sinUmd_43 `p.font-body.text-sm.italic.font-normal.text-gray-200.mt-5.-mb-5.ml-10
            ` ('Required for payment processing. We do not store this data')])]), buttonGreen.large `.w-200.uppercase.mx-auto` ({
                    type: 'submit',
                    disabled: pending
                }, `Buy ${typeof coinsInput === 'number' ? coinsInput.toFixed(2) : coinsInput} for $${typeof dollarInput === 'number' ? dollarInput.toFixed(2) : dollarInput}`), route({
                    '/': _$sinUmd_43 `p.font-body.text-sm.font-normal.text-gray-200.text-center.mt-20` ('You will be redirected to a third party website to complete your payment (Subject to fees)'),
                    '/failed': _$sinUmd_43 `p.font-body.text-sm.font-normal.text-red.text-center.mt-20` ('Your payment failed'),
                    '/success': _$sinUmd_43 `p.font-body.text-sm.font-normal.text-green-text.text-center.mt-20` ('Your payment was completed. Your balance will be credited shortly')
                })])]
            }
        })
    });
    var _$deposit_63 = createModuleFactory(function(module, exports) {;
        const {
            buttonFlat, buttonGreen
        } = _$button_4;;;;;;;
        const {
            filterPriceFn
        } = _$utils_73;;

        function rarity(r) {
            switch (r) {
                case 'Contraband':
                    return '#FFB963'
                case 'Covert':
                case 'Extraordinary':
                    return '#FF6566'
                case 'Classified':
                case 'Exotic':
                    return '#FF8FD4'
                case 'Restricted':
                case 'Remarkable':
                    return '#B088FF'
                case 'Mil-Spec Grade':
                case 'High Grade':
                    return '#6F91FF'
                case 'Industrial Grade':
                    return '#69D0FC'
                default:
                    return '#8D8EA0'
            }
        }

        function rarityHighlights(r) {
            return _$sinUmd_43 `
    border-color: ${rarity(r)};
    background-image: linear-gradient(0, ${rarity(r) + '36'}, ${rarity(r) + '00'});
  `
        }
        const select = _$sinUmd_43(({
            label, oninput
        }, options) => _$sinUmd_43 `label.uppercase.font-bold.text-sm.items-center.text-center.justify-center.text-gray-200` (label, _$sinUmd_43 `select.appearance-none.adjust-exact.uppercase.font-bold.bg-gray-700.text-yellow.rounded.h-20.focus:bg-gray-800.focus:outline-none.ml-10
    background-repeat: no-repeat;
    background-image: url('/icons/arrow-down-yellow.svg');
    background-position: right .5rem center;
    padding-right: 1.25rem;
  ` ({
            oninput
        }, options)))
        module.exports = _$sinUmd_43(({
            route
        }) => {
            var showTradelocked = false
            var sortOrder = 1
            var filterPrice = '-1'
            var query = ''
            var depositQueue = []
            async
            function fetchinvent() {
                await _$depositsModel_64.loadInventory()
            }

            function queuedeposit(item) {
                if (_$depositsModel_64.submitting)
                    return
                item.markup = 0
                depositQueue.push(item)
            }

            function dequeuedeposit(item) {
                if (_$depositsModel_64.submitting)
                    return
                delete item.markup
                depositQueue.splice(depositQueue.indexOf(item), 1)
            }

            function filter() {
                var pf = filterPriceFn(filterPrice)
                return _$depositsModel_64.inventory.filter(i => {
                    if (!i.tradable && !showTradelocked)
                        return false
                    if (!pf(i))
                        return false
                    if (!i.name.toLowerCase().includes(query.toLowerCase()))
                        return false
                    if (depositQueue.indexOf(i) >= 0)
                        return false
                    return true
                }).sort((a, b) => sortOrder * sortPrice(a, b))
            }
            async
            function dodeposit() {
                _$depositsModel_64.submit(depositQueue, function(done) {
                    const self = _$steamModal_71(() => {
                        modals.splice(modals.indexOf(self), 1)
                        done()
                    }, () => {
                        modals.splice(modals.indexOf(self), 1)
                    })
                    modals.push(self)
                }, function() {
                    depositQueue = []
                })
            }

            function editprice(item) {
                const self = _$editPriceModal_66(item, (change) => {
                    modals.splice(modals.indexOf(self), 1)
                })
                modals.push(self)
            }
            const modals = []
            return () => _$sinUmd_43 `div.flex.flex-row` ([_$p2pDepositModal_68(), modals, _$sinUmd_43 `div.m-30.flex-1` ([_$sinUmd_43 `div.flex.flex-row.mb-30` ([buttonFlat.medium `.uppercase.px-15` ({
                onclick() {
                    route('/deposit')
                }
            }, [_$icons_8.arrowBack `.mr-10`, 'Back']), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase.ml-30` ('Deposit CSGO Skins')]), _$sinUmd_43 `div.flex.flex-row.items-center.mb-20` (_$sinUmd_43 `div.relative.mr-auto` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-40.w-160.p-16.pl-40.text-gray-100.font-body.font-medium.text-base.focus:border-yellow.focus:outline-none.rounded
            ::placeholder {
              color: var(--color-gray-100);
              opacity: 0.3;
            }
          ` ({
                value: query,
                placeholder: 'Search...',
                oninput() {
                    query = this.value
                }
            }), _$icons_8.search({
                className: 'absolute inset-y-auto text-gray-300 top-0 bottom-0 m-auto',
                style: 'height: 20px; transform: scale(0.7); left: 16px'
            })]), _$sinUmd_43 `label.font-medium.text-base.text-gray-200.align-text` (_$checkbox_5 `.mr-10.-mb-px` ({
                checked: showTradelocked,
                oninput() {
                    showTradelocked = this.checked
                }
            }), _$sinUmd_43 `span.inline-block.mb-px` ('Tradelocked')), _$sinUmd_43 `.mr-20.border-r.border-l.border-gray-400.px-20.mx-20` (select({
                label: ['Price range ', _$icons_8.coins `.inline-block.text-yellow.-mb-px.ml-10; w 12; h 14; transform scale(0.6)`],
                oninput() {
                    filterPrice = this[this.selectedIndex].value
                }
            }, [_$sinUmd_43 `option` ({
                value: -1
            }, 'All'), _$sinUmd_43 `option` ({
                value: 0
            }, '0–5'), _$sinUmd_43 `option` ({
                value: 5
            }, '5–25'), _$sinUmd_43 `option` ({
                value: 25
            }, '25–100'), _$sinUmd_43 `option` ({
                value: 100
            }, '100–500'), _$sinUmd_43 `option` ({
                value: 500
            }, '500+')])), select({
                label: 'Sort by',
                oninput() {
                    sortOrder = this[this.selectedIndex].value
                }
            }, [_$sinUmd_43 `option` ({
                value: 1
            }, 'Highest price'), _$sinUmd_43 `option` ({
                value: -1
            }, 'Lowest price')])), _$sinUmd_43(async() => {
                await fetchinvent()
                return () => {
                    if (_$depositsModel_64.inventoryError)
                        return _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-300.uppercase.mx-auto.my-30` (_$depositsModel_64.inventoryError)
                    const items = filter()
                    if (items.length === 0)
                        return _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-300.uppercase.mx-auto.my-30` ('No items')
                    return _$sinUmd_43 `div.grid.grid-flow-row.overflow-y-scroll
              grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
              gap: 10px;
            flex: 1 1 0%;
            ` (items.map(item))
                }
            }, _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-300.uppercase.mx-auto.my-30` ('Loading...'))]), depositQueue.length ? _$sinUmd_43 `section.bg-gray-600.w-280.flex.flex-col.flex-none.sticky
        top 60
        height calc(100vh - 60px)
      ` ({}, [_$sinUmd_43 `header.p-30.font-body.text-sm.items-center.flex.flex-col` ({}, [_$sinUmd_43 `.uppercase.w-1.flex.flex-row.justify-center.align-center.text-sm.font-bold.text-gray-200.mb-20` ('You will receive ', _$icons_8.coins `.inline-block.mx-5.text-yellow; w 16; h 14; transform scale(0.6)`, _$sinUmd_43 `span.text-gray-100.font-medium.font-numeric` (depositQueue.reduce((s, i) => s + i.price * (1 + i.markup / 100), 0).toFixed(2))), buttonGreen.large `.w-1.uppercase` ({
                onclick: dodeposit,
                disabled: _$depositsModel_64.submitting
            }, 'Deposit'), _$sinUmd_43 `p.text-red.font-medium.text-base.mt-15` (_$depositsModel_64.depositError)]), _$sinUmd_43 `section.px-20.overflow-y-scroll.flex.flex-col
          flex: 1;
        ` ({}, [depositQueue.map(i => [_$itemCard_67({
                onclick() {
                        dequeuedeposit(i)
                    },
                    item: i,
                    key: 'depositing:item-card:' + i.localId
            }), _$sinUmd_43 `a.block.text-yellow.font-bold.text-sm.uppercase.mb-20.cursor-pointer.hover:underline` ({
                onclick() {
                        editprice(i)
                    },
                    key: 'depositing:item-card-edit:' + i.localId
            }, [_$icons_8.edit `.inline-block.mr-5.text-gray-200; w 16; h 12; transform scale(0.6)`, 'Edit price'])])])]) : _$depositsSidebar_65])

            function sortPrice(a, b) {
                return -_$compare_34(a.price, b.price)
            }

            function item(it) {
                var i = it
                return _$sinUmd_43 `div.h-240.rounded.relative` ({
                    key: i.localId,
                    className: i.depositable ? 'bg-gray-400 ' + (i.tradable ? 'cursor-pointer hover:bg-gray-300 transition duration-75 ease-in-out' : '') : 'bg-gray-600',
                    onclick: i.depositable && i.tradable ? function() {
                        queuedeposit(i)
                    } : () => {}
                }, [_$sinUmd_43 `div.h-120.flex.bg-gray-600.relative.border-b
        ${i.depositable ? rarityHighlights(i.rarity) : _$sinUmd_43`;border - color: var (--color - gray - 800);
                    `}
      ` ([_$sinUmd_43 `img.mx-auto.self-center.-mb-15.w-100` ({
                        src: `https://steamcommunity-a.akamaihd.net/economy/image/${i.image}/200x200`,
                        alt: i.weapon + ' | ' + i.skin,
                        className: i.depositable ? '' : 'opacity-50'
                    }), _$sinUmd_43 `p.font-bold.text-xs.text-gray-200.uppercase.absolute; t 10; l 10;` (i.exterior || ' '), [i.tradable ? '' : _$icons_8.lock `.absolute; w 12; b 10; l 10; transform scale(0.6)` ({
                        className: i.depositable ? 'text-yellow' : 'text-gray-200'
                    })]]), _$sinUmd_43 `div.p-15.font-medium.text-base.leading-tight` ({
                        className: i.depositable ? 'text-gray-100' : 'text-gray-200'
                    }, [i.skin && _$sinUmd_43 `p.font-bold.text-xs.text-gray-200.mb-10.leading-none` (i.weapon), i.skin == null ? i.weapon : i.skin]), _$sinUmd_43 `div.absolute.font-medium.text-sm; b 10; l 10;` ({
                        className: i.depositable ? 'text-gray-100' : 'text-gray-200'
                    }, [_$icons_8.coins `.inline-block.mr-10; w 12; h 14; transform scale(0.6)` ({
                        className: i.depositable ? 'text-yellow' : ''
                    }), i.depositable ? (i.price ? i.price.toFixed(2) : '-') : 'Not Accepted'])
                ])
            }
        })
    });
    var _$deposit_61 = createModuleFactory(function(module, exports) {
        const {
            ethereum: ethUrl
        } = _$qrcode_31;;
        const {
            buttonYellow, buttonLink, buttonFlat
        } = _$button_4;
        const steamDollar = 1.7
        module.exports = _$sinUmd_43(({
            route
        }) => {
            async
            function fetchInfo() {
                return _$sinUmd_43.request({
                    method: 'GET',
                    url: "https://api.rollbit.com" + '/eth/deposits',
                    withCredentials: true
                })
            }
            var address = 'Loading'
            var exchangeRate = 1
            var url = ''
            var coins = 170
            var coinsInput = 170
            var deposits = []
            fetchInfo().then(info => {
                address = info.address
                exchangeRate = info.exchangeRate
                deposits = info.deposits
                redrawSvg()
            })

            function fixupCoinsInput() {
                if (typeof coinsInput === 'string')
                    coinsInput = parseFloat(coinsInput)
                if (Number.isNaN(coinsInput))
                    coinsInput = 0
                coinsInput = clamp(0, Infinity, Math.round(coinsInput * 100) / 100)
            }

            function fixupCoins() {
                if (typeof coinsInput === 'string')
                    coins = parseFloat(coinsInput)
                else
                    coins = coinsInput
                if (Number.isNaN(coins))
                    coins = 0
                coins = clamp(0, Infinity, Math.round(coins * 100) / 100)
            }

            function clamp(min, max, v) {
                v = Math.abs(v)
                if (v > max)
                    return max
                if (v < min)
                    return min
                return v
            }

            function redrawSvg() {
                const out = ethUrl({
                    address
                }, {
                    padding: 2
                })
                url = out.url
                return out.qrcode
            }
            return () => {
                return [_$sinUmd_43 `header.text-center.my-50` ([buttonFlat.medium `.uppercase.px-15.ml-30.-mt-15.float-left` ({
                    onclick() {
                        route('/deposit')
                    }
                }, [_$icons_8.arrowBack `.mr-10`, 'Back']), _$icons_8.eth `.w-50.h-50.m-auto.mb-30`, _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase.mb-10` ('Pay with Ethereum'), _$sinUmd_43 `h2.text-base.font-medium.text-gray-200` (`1 ETH = ${exchangeRate > 1 ? `
                    $$ {
                        exchangeRate.toFixed(2)
                    }
                    USD ` : 'Loading'}`)]), _$sinUmd_43 `section.m-auto.flex.flex-row.rounded.p-30.bg-gray-500.mb-40
        max-width 730
      ` ([_$sinUmd_43 `div.mr-40.flex-1` ([_$sinUmd_43 `p.text-gray-100.text-lg.leading-normal.mb-40.font-medium` ('Send the amount of Ethereum of your choice to the following address to receive the equivalent in Coins.'), _$sinUmd_43 `label.font-bold.text-sm.text-gray-200.mb-10.block.uppercase` ('Your Personal ETH Deposit Address'), _$sinUmd_43 `div.relative
          ` ([_$sinUmd_43 `input.bg-gray-700.border-gray-700.font-body.font-medium.text-gray-100.rounded.w-1.px-20.pr-80.text-sm.focus:outline-none.focus:border-yellow.border
            line-height: 50px;
            ` ({
                    readonly: true,
                    value: address
                }), _$sinUmd_43 `div.absolute.bottom-0.flex
              top: 5px;
              right: 5px;
              z-index: 1;
            ` ([buttonYellow.medium `.px-15.uppercase` ({
                    onclick() {
                        navigator.clipboard.writeText(address)
                    }
                }, 'Copy Address')])]), _$sinUmd_43 `p.font-body.text-base.font-normal.text-gray-200.mt-5.-mb-5.ml-10
          ` ('Deposits from smart contracts are not supported. We cannot refund for deposits from smart contracts')]), _$sinUmd_43 `a.w-170.h-170.rounded.overflow-hidden.block
        background: white;
        ` ({
                    href: url,
                    rel: 'noreferrer'
                }, [address.length > 36 ? _$sinUmd_43.trust(redrawSvg()) : ''])]), _$sinUmd_43 `section.m-auto.rounded.p-30.bg-gray-500.mb-40
        max-width 730
      ` ([_$sinUmd_43 `div.mr-40.flex-1.text-base.text-gray-100.font-medium.items-center
          display: grid;
          gap: 20px;
          grid-template-columns: auto 1fr auto 1fr auto 1fr;
        ` ([_$sinUmd_43 `label.font-bold.text-sm.text-gray-200.uppercase` ('Calculator'), _$sinUmd_43 `div.relative
          ` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-50.p-16.pl-40.text-gray-100.font-body.text-base.font-medium.focus:border-yellow.focus:outline-none.rounded.font-numeric.w-1
            ` ({
                    inputmode: 'decimal',
                    value: typeof coinsInput === 'number' ? coinsInput.toFixed(2) : coinsInput,
                    oninput: (e) => {
                        coinsInput = e.target.value
                        fixupCoins()
                    },
                    onblur: (e) => {
                        fixupCoinsInput()
                    }
                }), _$icons_8.coins({
                    className: 'absolute inset-y-auto text-yellow top-0 bottom-0 m-auto',
                    style: 'height: 20px; transform: scale(0.7); left: 16px'
                })]), '=', _$sinUmd_43 `div.relative
          ` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-50.p-16.pl-50.text-gray-100.font-body.text-base.font-medium.focus:outline-none.rounded.font-numeric.w-1
            ` ({
                    value: (coins / (exchangeRate * steamDollar)).toPrecision(7),
                    readonly: true
                }), _$icons_8.eth({
                    className: 'absolute inset-y-auto top-0 bottom-0 m-auto',
                    style: 'height: 20px; width: 20px; left: 16px; color: #000'
                })]), '=', _$sinUmd_43 `div.relative
          ` ([_$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-50.p-16.pl-50.text-gray-100.font-body.text-base.font-medium.focus:outline-none.rounded.font-numeric.w-1
            ` ({
                    value: (coins / steamDollar).toFixed(2),
                    readonly: true
                }), _$icons_8.dollar({
                    className: 'absolute inset-y-auto text-gray-200 top-0 bottom-0 m-auto',
                    style: 'height: 20px; transform: scale(0.8); left: 20px'
                })])]), _$sinUmd_43 `p.font-body.text-sm.italic.font-normal.text-gray-200.text-center.mt-20` ('The value of Ethereum may vary between now and the time we receive your payment')]), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.uppercase.mt-70.mb-40.text-center` ('Ethereum Deposits'), _$table_49 `.mb-50.mx-auto
      max-width 1060
      ` ({
                    headers: ['Date / Time', 'Amount', 'Status', '']
                }, deposits.map(d => _$sinUmd_43 `tr.bg-gray-700.text-gray-100.text-base.font-medium
        border-bottom: 2px solid var(--color-gray-500);
      ` ([_$sinUmd_43 `td.pl-10.py-15.rounded-l.text-gray-200` (new Date(d.timestamp).toLocaleDateString(undefined, {
                    dateStyle: 'short',
                    timeStyle: 'medium'
                })), _$sinUmd_43 `td.pl-10.py-15` ([_$icons_8.eth `.inline-block.mr-10.w-20.h-20.align-middle
          color #000
          `, (d.amount / 10e17).toPrecision(15).replace(/0+$/, '')]), _$sinUmd_43 `td.pl-10.py-15` ({
                    className: d.confirmed ? 'text-green' : 'text-gray-200'
                }, d.confirmed ? 'Completed' : 'Confirming...'), _$sinUmd_43 `td.pl-10.py-15.rounded-r` (_$sinUmd_43 `a` ({
                    href: `https://etherscan.io/tx/${d.txId}`,
                    target: '_blank',
                    rel: 'noreferrer'
                }, buttonLink.small `.px-15.uppercase.text-gray-100.ml-auto.mr-15` ('View')))])))]
            }
        })
    });
    var _$_empty_33 = createModuleFactory(function(module, exports) {});
    var _$account_48 = createModuleFactory(function(module, exports) {;;;;;
        const {
            buttonYellow, buttonGreen, buttonGray
        } = _$button_4
        module.exports = _$sinUmd_43(({
            route
        }) => {
            _$referral_26.refresh()
            return () => [_$sinUmd_43 `section.p-20.pr-50
      display: grid;
      grid-template-columns: 1fr 3.25fr;
      gap: 50px;
    ` ([_$sinUmd_43 `nav.bg-gray-600.rounded.font-body.font-bold.text-sm.text-gray-200.p-20.uppercase.flex.flex-col
      ` ({}, [_$sinUmd_43 `a.h-40.px-15.rounded.flex.flex-row.items-center.hover:bg-gray-700
        ` ({
                href: route() + '/',
                className: route.has('/') ? 'text-yellow' : ''
            }, [_$icons_8.player `.pr-10
            transform scale(0.8)
            height 16px
          `, 'Account']), _$sinUmd_43 `a.h-40.px-15.rounded.flex.flex-row.items-center.hover:bg-gray-700
        ` ({
                href: route() + '/referrals',
                className: route.has('/referrals') ? 'text-yellow' : ''
            }, [_$icons_8.referrals `.pr-10
            transform scale(0.8)
            height 16px
          `, 'Referrals']), ]), _$sinUmd_43 `section.py-30.text-gray-100` (route({
                '/': () => [_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.leading-none.uppercase.mb-40` ('Account'), _$sinUmd_43 `h2.text-base.font-extrabold.text-gray-200.leading-none.uppercase.mb-20` ('My Details'), _$sinUmd_43 `section.rounded.p-30.bg-gray-500.uppercase.flex.flex-row
          ` ([_$sinUmd_43 `img.rounded.h-70.w-70.mr-30` ({
                    src: _$auth_21.profile.avatarBig || 'images/default-avatar.svg'
                }), _$sinUmd_43 `div` ([_$sinUmd_43 `h1.normal-case.font-bold.text-2xl.text-gray-100.inline-block.mr-15` (_$auth_21.profile.displayName), _$sinUmd_43 `a.text-yellow.text-sm.font-bold
              ` ({
                    href: 'https://steamcommunity.com/profiles/' + _$auth_21.profile.steamId,
                    target: '_blank',
                    rel: 'noreferrer'
                }, 'View Steam profile'), _$sinUmd_43 `br`, _$sinUmd_43 `span.font-bold.text-sm.text-gray-200` ('Member since ', new Date(_$auth_21.profile.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }))])])],
                '/referrals': () => [_$sinUmd_43 `div.mb-50.w-1` (_$sinUmd_43.trust("<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 790 292\"><style>.B{fill:#000}.C{fill:#e99900}.D{fill:#fff}.E{fill:#ffb019}.F{fill:#ffc24e}.G{fill:#c78100}.H{fill:#d88c00}.I{fill:#ca8403}.J{fill:#e3e6ec}.K{font-family:Flama-webfont}.L{font-weight:500}.M{font-family:Flama-webfont}.N{font-weight:600}</style><defs><filter id=\"A\" width=\"170.9%\" height=\"250%\" x=\"-35.5%\" y=\"-75%\"><feOffset dy=\"9\" in=\"SourceAlpha\"/><feGaussianBlur stdDeviation=\"9\"/><feColorMatrix result=\"C\" values=\"0 0 0 0 0.0784313725 0 0 0 0 0.0901960784 0 0 0 0 0.133333333 0 0 0 0.5 0\"/><feMerge><feMergeNode in=\"C\"/><feMergeNode in=\"SourceGraphic\"/></feMerge></filter><filter id=\"B\" width=\"101.4%\" height=\"102.9%\" x=\"-.7%\" y=\"-.7%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feColorMatrix values=\"0 0 0 0 0.780392157 0 0 0 0 0.505882353 0 0 0 0 0 0 0 0 1 0\"/></filter><filter id=\"C\" width=\"101.7%\" height=\"103.5%\" x=\"-.9%\" y=\"-.9%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feColorMatrix values=\"0 0 0 0 1 0 0 0 0 0.737026457 0 0 0 0 0.237709604 0 0 0 1 0\"/></filter><filter id=\"D\" width=\"101.7%\" height=\"103.5%\" x=\"-.9%\" y=\"-.9%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feComposite in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\"/><feColorMatrix values=\"0 0 0 0 0.850980392 0 0 0 0 0.57254902 0 0 0 0 0.0392156863 0 0 0 1 0\"/></filter><filter id=\"E\" width=\"103.3%\" height=\"109.5%\" x=\"-1.6%\" y=\"-2.4%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feColorMatrix values=\"0 0 0 0 0.977496603 0 0 0 0 0.655625175 0 0 0 0 0.0400460689 0 0 0 1 0\"/></filter><filter id=\"F\" width=\"103.3%\" height=\"109.5%\" x=\"-1.6%\" y=\"-2.4%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feComposite in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\"/><feColorMatrix values=\"0 0 0 0 0.716768569 0 0 0 0 0.464638922 0 0 0 0 0 0 0 0 1 0\"/></filter><filter id=\"G\" width=\"100%\" height=\"100%\" x=\"0%\" y=\"0%\"><feOffset in=\"SourceAlpha\"/><feColorMatrix values=\"0 0 0 0 1 0 0 0 0 0.737026457 0 0 0 0 0.237709604 0 0 0 1 0\"/></filter><filter id=\"H\" width=\"100%\" height=\"100%\" x=\"0%\" y=\"0%\"><feOffset in=\"SourceAlpha\"/><feComposite in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\"/><feColorMatrix values=\"0 0 0 0 0.850980392 0 0 0 0 0.57254902 0 0 0 0 0.0392156863 0 0 0 1 0\"/></filter><filter id=\"I\" width=\"100%\" height=\"100%\" x=\"0%\" y=\"0%\"><feOffset in=\"SourceAlpha\"/><feColorMatrix values=\"0 0 0 0 1 0 0 0 0 0.690196078 0 0 0 0 0.0980392157 0 0 0 1 0\"/></filter><filter id=\"J\" width=\"100%\" height=\"100%\" x=\"0%\" y=\"0%\"><feOffset in=\"SourceAlpha\"/><feComposite in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\"/><feColorMatrix values=\"0 0 0 0 0.716768569 0 0 0 0 0.464638922 0 0 0 0 0 0 0 0 0.6 0\"/></filter><filter id=\"K\" width=\"101.6%\" height=\"106.9%\" x=\"-.8%\" y=\"-1.7%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feColorMatrix values=\"0 0 0 0 1 0 0 0 0 0.737026457 0 0 0 0 0.237709604 0 0 0 1 0\"/></filter><filter id=\"L\" width=\"101.6%\" height=\"106.9%\" x=\"-.8%\" y=\"-1.7%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feComposite in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\"/><feColorMatrix values=\"0 0 0 0 0.850980392 0 0 0 0 0.57254902 0 0 0 0 0.0392156863 0 0 0 1 0\"/></filter><filter id=\"M\" width=\"102.9%\" height=\"107.4%\" x=\"-1.5%\" y=\"-3.7%\"><feOffset dy=\"1\" in=\"SourceAlpha\"/><feComposite in2=\"SourceAlpha\" k2=\"-1\" k3=\"1\" operator=\"arithmetic\"/><feColorMatrix values=\"0 0 0 0 0.716768569 0 0 0 0 0.464638922 0 0 0 0 0 0 0 0 0.6 0\"/></filter><ellipse id=\"S\" cx=\"33.788\" cy=\"15.474\" rx=\"33.788\" ry=\"15.474\"/><ellipse id=\"T\" cx=\"33.788\" cy=\"15.474\" rx=\"31.284\" ry=\"14.363\"/><ellipse id=\"U\" cx=\"33.788\" cy=\"15.474\" rx=\"33.788\" ry=\"15.474\"/><ellipse id=\"V\" cx=\"33.788\" cy=\"15.474\" rx=\"31.284\" ry=\"14.363\"/><ellipse id=\"W\" cx=\"33.52\" cy=\"15.529\" rx=\"33.52\" ry=\"15.529\"/><ellipse id=\"X\" cx=\"33.52\" cy=\"15.529\" rx=\"31.036\" ry=\"14.414\"/><ellipse id=\"Y\" cx=\"33.52\" cy=\"15.529\" rx=\"33.52\" ry=\"15.529\"/><ellipse id=\"Z\" cx=\"33.52\" cy=\"15.529\" rx=\"31.036\" ry=\"14.414\"/><ellipse id=\"a\" cx=\"33.52\" cy=\"15.529\" rx=\"33.52\" ry=\"15.529\"/><ellipse id=\"b\" cx=\"33.52\" cy=\"15.529\" rx=\"31.036\" ry=\"14.414\"/><path id=\"N\" d=\"M29.764 18.083c5.79 0 10.486 4.7 10.486 10.5s-4.695 10.5-10.486 10.5a10.62 10.62 0 01-.807-.031l-19.04-.72 17.88-1.352-4.405-.06a10.54 10.54 0 01-3.057-3.742l-7.047-.47 6.654-.444a10.49 10.49 0 010-7.363l-6.655-.443 7.047-.472a10.54 10.54 0 013.059-3.743l4.403-.06-17.88-1.35 19.053-.72c.262-.02.528-.03.795-.03zm0 6.563c-2.172 0-3.932 1.763-3.932 3.938s1.76 3.938 3.932 3.938 3.932-1.763 3.932-3.937-1.76-3.937-3.932-3.937z\"/><path id=\"O\" d=\"M0 0v8.674c0 8.555 15.127 15.5 33.788 15.5s33.788-6.935 33.788-15.5V0\"/><path id=\"P\" d=\"M35.84 8.123c6.586 0 11.924 3.03 11.924 6.77s-5.34 6.77-11.924 6.77c-.296 0-.59-.006-.88-.018l-21.69-.465 20.328-.872-5.006-.04c-1.66-.723-2.977-1.688-3.784-2.802l-7.558-.204 7.295-.196c-.407-.682-.628-1.413-.628-2.174s.22-1.492.628-2.174l-7.295-.195 7.558-.204c.808-1.115 2.125-2.08 3.788-2.804l5-.038-20.327-.87 21.667-.464a21.26 21.26 0 01.904-.019zm0 4.23c-2.47 0-4.472 1.136-4.472 2.54s2.002 2.538 4.472 2.538 4.472-1.136 4.472-2.538-2.002-2.54-4.472-2.54z\"/><path id=\"Q\" d=\"M0 0v8.705C0 17.29 15.007 24.25 33.52 24.25s33.52-6.96 33.52-15.545V0\"/><path id=\"R\" d=\"M35.554 8.152c6.533 0 11.83 3.042 11.83 6.794s-5.296 6.793-11.83 6.793a20.857 20.857 0 01-.894-.019l-21.498-.466 20.172-.875-4.97-.038c-1.65-.726-2.955-1.695-3.756-2.814l-7.498-.204 7.237-.196c-.404-.685-.623-1.418-.623-2.18s.22-1.497.623-2.18l-7.236-.197 7.497-.203c.802-1.12 2.11-2.09 3.76-2.815l4.967-.038-20.172-.874 21.5-.466c.298-.013.6-.02.902-.02zm0 4.246c-2.45 0-4.436 1.14-4.436 2.548s1.986 2.547 4.436 2.547 4.436-1.14 4.436-2.547-1.986-2.548-4.436-2.548z\"/><path id=\"f\" d=\"M266.19 249.826c.783 2.345 4.52 4.122 9.01 4.122s8.226-1.777 9.01-4.122a2.88 2.88 0 01.151.916c0 2.782-4.1 5.038-9.16 5.038s-9.16-2.256-9.16-5.038a2.88 2.88 0 01.151-.916z\"/><path id=\"g\" d=\"M4.47-29.38h7.023v58.105H4.47zm8.938 0h3.83v58.105h-3.83z\"/><path id=\"h\" d=\"M4.228 23.418L44.792-4.93l8.74 4.255-42.32 27.993zm9.18 4.452L54.947.506l4.062 1.626-41.933 26.98z\"/><path id=\"i\" d=\"M4.434-29.484H11.4V28.83H4.434zm8.867 0h3.8V28.83h-3.8z\"/><path id=\"j\" d=\"M4.194 23.502L44.436-4.95l8.67 4.27-41.984 28.093zM13.3 27.97L54.51.508l4.03 1.632-41.6 27.076z\"/><circle id=\"c\" cx=\"35\" cy=\"35\" r=\"35\"/><circle id=\"d\" cx=\"28.583\" cy=\"28.583\" r=\"28.583\"/><rect id=\"e\" width=\"790\" height=\"292\" rx=\"12\"/></defs><g fill=\"none\" fill-rule=\"evenodd\"><mask id=\"k\" class=\"D\"><use xlink:href=\"#e\"/></mask><use fill=\"#262a38\" xlink:href=\"#e\"/><g fill=\"#141722\" fill-opacity=\".25\" mask=\"url(#k)\"><ellipse cx=\"275.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\"/><use xlink:href=\"#f\" y=\"3.674\"/><ellipse cx=\"215.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-60\"/><use xlink:href=\"#f\" x=\"-60\" y=\"3.674\"/><ellipse cx=\"155.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-120\"/><use xlink:href=\"#f\" x=\"-120\" y=\"3.674\"/><ellipse cx=\"95.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-180\"/><use xlink:href=\"#f\" x=\"-180\" y=\"3.674\"/><ellipse cx=\"35.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-240\"/><use xlink:href=\"#f\" x=\"-240\" y=\"3.674\"/><ellipse cx=\"275.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" y=\"-60\"/><use xlink:href=\"#f\" y=\"-56.326\"/><ellipse cx=\"215.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-60\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-56.326\"/><ellipse cx=\"155.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-60\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-56.326\"/><ellipse cx=\"95.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-60\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-56.326\"/><ellipse cx=\"35.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-60\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-56.326\"/><ellipse cx=\"305.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"30\" y=\"-30\"/><use xlink:href=\"#f\" x=\"30\" y=\"-26.326\"/><ellipse cx=\"245.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-30\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-26.326\"/><ellipse cx=\"185.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-30\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-26.326\"/><ellipse cx=\"125.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-30\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-26.326\"/><ellipse cx=\"65.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-30\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-26.326\"/><ellipse cx=\"5.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-30\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-26.326\"/><ellipse cx=\"275.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" y=\"-120\"/><use xlink:href=\"#f\" y=\"-116.326\"/><ellipse cx=\"215.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-120\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-116.326\"/><ellipse cx=\"155.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-120\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-116.326\"/><ellipse cx=\"95.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-120\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-116.326\"/><ellipse cx=\"35.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-120\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-116.326\"/><ellipse cx=\"275.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" y=\"-180\"/><use xlink:href=\"#f\" y=\"-176.326\"/><ellipse cx=\"215.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-180\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-176.326\"/><ellipse cx=\"155.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-180\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-176.326\"/><ellipse cx=\"95.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-180\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-176.326\"/><ellipse cx=\"35.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-180\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-176.326\"/><ellipse cx=\"305.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"30\" y=\"-90\"/><use xlink:href=\"#f\" x=\"30\" y=\"-86.326\"/><ellipse cx=\"245.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-90\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-86.326\"/><ellipse cx=\"185.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-90\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-86.326\"/><ellipse cx=\"125.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-90\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-86.326\"/><ellipse cx=\"65.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-90\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-86.326\"/><ellipse cx=\"5.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-90\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-86.326\"/><ellipse cx=\"305.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"30\" y=\"-150\"/><use xlink:href=\"#f\" x=\"30\" y=\"-146.326\"/><ellipse cx=\"245.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-150\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-146.326\"/><ellipse cx=\"185.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-150\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-146.326\"/><ellipse cx=\"125.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-150\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-146.326\"/><ellipse cx=\"65.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-150\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-146.326\"/><ellipse cx=\"5.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-150\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-146.326\"/><ellipse cx=\"275.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" y=\"-240\"/><use xlink:href=\"#f\" y=\"-236.326\"/><ellipse cx=\"215.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-240\"/><use xlink:href=\"#f\" x=\"-60\" y=\"-236.326\"/><ellipse cx=\"155.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-240\"/><use xlink:href=\"#f\" x=\"-120\" y=\"-236.326\"/><ellipse cx=\"95.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-240\"/><use xlink:href=\"#f\" x=\"-180\" y=\"-236.326\"/><ellipse cx=\"35.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-240\"/><use xlink:href=\"#f\" x=\"-240\" y=\"-236.326\"/><ellipse cx=\"305.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"30\" y=\"-210\"/><use xlink:href=\"#f\" x=\"30\" y=\"-206.326\"/><ellipse cx=\"245.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-210\"/><use xlink:href=\"#f\" x=\"-30\" y=\"-206.326\"/><ellipse cx=\"185.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-210\"/><use xlink:href=\"#f\" x=\"-90\" y=\"-206.326\"/><ellipse cx=\"125.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-210\"/><use xlink:href=\"#f\" x=\"-150\" y=\"-206.326\"/><ellipse cx=\"65.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-210\"/><use xlink:href=\"#f\" x=\"-210\" y=\"-206.326\"/><ellipse cx=\"5.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-210\"/><use xlink:href=\"#f\" x=\"-270\" y=\"-206.326\"/><ellipse cx=\"305.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"30\" y=\"30\"/><use xlink:href=\"#f\" x=\"30\" y=\"33.674\"/><ellipse cx=\"245.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-30\" y=\"30\"/><use xlink:href=\"#f\" x=\"-30\" y=\"33.674\"/><ellipse cx=\"185.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-90\" y=\"30\"/><use xlink:href=\"#f\" x=\"-90\" y=\"33.674\"/><ellipse cx=\"125.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-150\" y=\"30\"/><use xlink:href=\"#f\" x=\"-150\" y=\"33.674\"/><ellipse cx=\"65.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-210\" y=\"30\"/><use xlink:href=\"#f\" x=\"-210\" y=\"33.674\"/><ellipse cx=\"5.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"-270\" y=\"30\"/><use xlink:href=\"#f\" x=\"-270\" y=\"33.674\"/><ellipse cx=\"635.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"360\"/><use xlink:href=\"#f\" x=\"360\" y=\"3.674\"/><ellipse cx=\"575.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"300\"/><use xlink:href=\"#f\" x=\"300\" y=\"3.674\"/><ellipse cx=\"515.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"240\"/><use xlink:href=\"#f\" x=\"240\" y=\"3.674\"/><ellipse cx=\"455.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"180\"/><use xlink:href=\"#f\" x=\"180\" y=\"3.674\"/><ellipse cx=\"395.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"120\"/><use xlink:href=\"#f\" x=\"120\" y=\"3.674\"/><ellipse cx=\"335.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"60\"/><use xlink:href=\"#f\" x=\"60\" y=\"3.674\"/><ellipse cx=\"635.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"360\" y=\"-60\"/><use xlink:href=\"#f\" x=\"360\" y=\"-56.326\"/><ellipse cx=\"575.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"300\" y=\"-60\"/><use xlink:href=\"#f\" x=\"300\" y=\"-56.326\"/><ellipse cx=\"515.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"240\" y=\"-60\"/><use xlink:href=\"#f\" x=\"240\" y=\"-56.326\"/><ellipse cx=\"455.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"180\" y=\"-60\"/><use xlink:href=\"#f\" x=\"180\" y=\"-56.326\"/><ellipse cx=\"395.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"120\" y=\"-60\"/><use xlink:href=\"#f\" x=\"120\" y=\"-56.326\"/><ellipse cx=\"335.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"60\" y=\"-60\"/><use xlink:href=\"#f\" x=\"60\" y=\"-56.326\"/><ellipse cx=\"665.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"390\" y=\"-30\"/><use xlink:href=\"#f\" x=\"390\" y=\"-26.326\"/><ellipse cx=\"605.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"330\" y=\"-30\"/><use xlink:href=\"#f\" x=\"330\" y=\"-26.326\"/><ellipse cx=\"545.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"270\" y=\"-30\"/><use xlink:href=\"#f\" x=\"270\" y=\"-26.326\"/><ellipse cx=\"485.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"210\" y=\"-30\"/><use xlink:href=\"#f\" x=\"210\" y=\"-26.326\"/><ellipse cx=\"425.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"150\" y=\"-30\"/><use xlink:href=\"#f\" x=\"150\" y=\"-26.326\"/><ellipse cx=\"365.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"90\" y=\"-30\"/><use xlink:href=\"#f\" x=\"90\" y=\"-26.326\"/><ellipse cx=\"635.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"360\" y=\"-120\"/><use xlink:href=\"#f\" x=\"360\" y=\"-116.326\"/><ellipse cx=\"575.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"300\" y=\"-120\"/><use xlink:href=\"#f\" x=\"300\" y=\"-116.326\"/><ellipse cx=\"515.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"240\" y=\"-120\"/><use xlink:href=\"#f\" x=\"240\" y=\"-116.326\"/><ellipse cx=\"455.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"180\" y=\"-120\"/><use xlink:href=\"#f\" x=\"180\" y=\"-116.326\"/><ellipse cx=\"395.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"120\" y=\"-120\"/><use xlink:href=\"#f\" x=\"120\" y=\"-116.326\"/><ellipse cx=\"335.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"60\" y=\"-120\"/><use xlink:href=\"#f\" x=\"60\" y=\"-116.326\"/><ellipse cx=\"635.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"360\" y=\"-180\"/><use xlink:href=\"#f\" x=\"360\" y=\"-176.326\"/><ellipse cx=\"575.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"300\" y=\"-180\"/><use xlink:href=\"#f\" x=\"300\" y=\"-176.326\"/><ellipse cx=\"515.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"240\" y=\"-180\"/><use xlink:href=\"#f\" x=\"240\" y=\"-176.326\"/><ellipse cx=\"455.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"180\" y=\"-180\"/><use xlink:href=\"#f\" x=\"180\" y=\"-176.326\"/><ellipse cx=\"395.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"120\" y=\"-180\"/><use xlink:href=\"#f\" x=\"120\" y=\"-176.326\"/><ellipse cx=\"335.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"60\" y=\"-180\"/><use xlink:href=\"#f\" x=\"60\" y=\"-176.326\"/><ellipse cx=\"665.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"390\" y=\"-90\"/><use xlink:href=\"#f\" x=\"390\" y=\"-86.326\"/><ellipse cx=\"605.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"330\" y=\"-90\"/><use xlink:href=\"#f\" x=\"330\" y=\"-86.326\"/><ellipse cx=\"545.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"270\" y=\"-90\"/><use xlink:href=\"#f\" x=\"270\" y=\"-86.326\"/><ellipse cx=\"485.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"210\" y=\"-90\"/><use xlink:href=\"#f\" x=\"210\" y=\"-86.326\"/><ellipse cx=\"425.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"150\" y=\"-90\"/><use xlink:href=\"#f\" x=\"150\" y=\"-86.326\"/><ellipse cx=\"365.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"90\" y=\"-90\"/><use xlink:href=\"#f\" x=\"90\" y=\"-86.326\"/><ellipse cx=\"665.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"390\" y=\"-150\"/><use xlink:href=\"#f\" x=\"390\" y=\"-146.326\"/><ellipse cx=\"605.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"330\" y=\"-150\"/><use xlink:href=\"#f\" x=\"330\" y=\"-146.326\"/><ellipse cx=\"545.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"270\" y=\"-150\"/><use xlink:href=\"#f\" x=\"270\" y=\"-146.326\"/><ellipse cx=\"485.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"210\" y=\"-150\"/><use xlink:href=\"#f\" x=\"210\" y=\"-146.326\"/><ellipse cx=\"425.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"150\" y=\"-150\"/><use xlink:href=\"#f\" x=\"150\" y=\"-146.326\"/><ellipse cx=\"365.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"90\" y=\"-150\"/><use xlink:href=\"#f\" x=\"90\" y=\"-146.326\"/><ellipse cx=\"635.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"360\" y=\"-240\"/><use xlink:href=\"#f\" x=\"360\" y=\"-236.326\"/><ellipse cx=\"575.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"300\" y=\"-240\"/><use xlink:href=\"#f\" x=\"300\" y=\"-236.326\"/><ellipse cx=\"515.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"240\" y=\"-240\"/><use xlink:href=\"#f\" x=\"240\" y=\"-236.326\"/><ellipse cx=\"455.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"180\" y=\"-240\"/><use xlink:href=\"#f\" x=\"180\" y=\"-236.326\"/><ellipse cx=\"395.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"120\" y=\"-240\"/><use xlink:href=\"#f\" x=\"120\" y=\"-236.326\"/><ellipse cx=\"335.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"60\" y=\"-240\"/><use xlink:href=\"#f\" x=\"60\" y=\"-236.326\"/><ellipse cx=\"665.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"390\" y=\"-210\"/><use xlink:href=\"#f\" x=\"390\" y=\"-206.326\"/><ellipse cx=\"605.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"330\" y=\"-210\"/><use xlink:href=\"#f\" x=\"330\" y=\"-206.326\"/><ellipse cx=\"545.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"270\" y=\"-210\"/><use xlink:href=\"#f\" x=\"270\" y=\"-206.326\"/><ellipse cx=\"485.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"210\" y=\"-210\"/><use xlink:href=\"#f\" x=\"210\" y=\"-206.326\"/><ellipse cx=\"425.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"150\" y=\"-210\"/><use xlink:href=\"#f\" x=\"150\" y=\"-206.326\"/><ellipse cx=\"365.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"90\" y=\"-210\"/><use xlink:href=\"#f\" x=\"90\" y=\"-206.326\"/><ellipse cx=\"665.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"390\" y=\"30\"/><use xlink:href=\"#f\" x=\"390\" y=\"33.674\"/><ellipse cx=\"605.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"330\" y=\"30\"/><use xlink:href=\"#f\" x=\"330\" y=\"33.674\"/><ellipse cx=\"545.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"270\" y=\"30\"/><use xlink:href=\"#f\" x=\"270\" y=\"33.674\"/><ellipse cx=\"485.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"210\" y=\"30\"/><use xlink:href=\"#f\" x=\"210\" y=\"33.674\"/><ellipse cx=\"425.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"150\" y=\"30\"/><use xlink:href=\"#f\" x=\"150\" y=\"33.674\"/><ellipse cx=\"365.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"90\" y=\"30\"/><use xlink:href=\"#f\" x=\"90\" y=\"33.674\"/><ellipse cx=\"755.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"480\"/><use xlink:href=\"#f\" x=\"480\" y=\"3.674\"/><ellipse cx=\"695.2\" cy=\"247.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"420\"/><use xlink:href=\"#f\" x=\"420\" y=\"3.674\"/><ellipse cx=\"755.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"480\" y=\"-60\"/><use xlink:href=\"#f\" x=\"480\" y=\"-56.326\"/><ellipse cx=\"695.2\" cy=\"187.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"420\" y=\"-60\"/><use xlink:href=\"#f\" x=\"420\" y=\"-56.326\"/><ellipse cx=\"785.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"510\" y=\"-30\"/><use xlink:href=\"#f\" x=\"510\" y=\"-26.326\"/><ellipse cx=\"725.2\" cy=\"217.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"450\" y=\"-30\"/><use xlink:href=\"#f\" x=\"450\" y=\"-26.326\"/><ellipse cx=\"755.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"480\" y=\"-120\"/><use xlink:href=\"#f\" x=\"480\" y=\"-116.326\"/><ellipse cx=\"695.2\" cy=\"127.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"420\" y=\"-120\"/><use xlink:href=\"#f\" x=\"420\" y=\"-116.326\"/><ellipse cx=\"755.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"480\" y=\"-180\"/><use xlink:href=\"#f\" x=\"480\" y=\"-176.326\"/><ellipse cx=\"695.2\" cy=\"67.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"420\" y=\"-180\"/><use xlink:href=\"#f\" x=\"420\" y=\"-176.326\"/><ellipse cx=\"785.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"510\" y=\"-90\"/><use xlink:href=\"#f\" x=\"510\" y=\"-86.326\"/><ellipse cx=\"725.2\" cy=\"157.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"450\" y=\"-90\"/><use xlink:href=\"#f\" x=\"450\" y=\"-86.326\"/><ellipse cx=\"785.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"510\" y=\"-150\"/><use xlink:href=\"#f\" x=\"510\" y=\"-146.326\"/><ellipse cx=\"725.2\" cy=\"97.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"450\" y=\"-150\"/><use xlink:href=\"#f\" x=\"450\" y=\"-146.326\"/><ellipse cx=\"755.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"480\" y=\"-240\"/><use xlink:href=\"#f\" x=\"480\" y=\"-236.326\"/><ellipse cx=\"695.2\" cy=\"7.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"420\" y=\"-240\"/><use xlink:href=\"#f\" x=\"420\" y=\"-236.326\"/><ellipse cx=\"785.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"510\" y=\"-210\"/><use xlink:href=\"#f\" x=\"510\" y=\"-206.326\"/><ellipse cx=\"725.2\" cy=\"37.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"450\" y=\"-210\"/><use xlink:href=\"#f\" x=\"450\" y=\"-206.326\"/><ellipse cx=\"785.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"510\" y=\"30\"/><use xlink:href=\"#f\" x=\"510\" y=\"33.674\"/><ellipse cx=\"725.2\" cy=\"277.078\" rx=\"9.16\" ry=\"5.038\"/><use xlink:href=\"#f\" x=\"450\" y=\"30\"/><use xlink:href=\"#f\" x=\"450\" y=\"33.674\"/></g><g mask=\"url(#k)\"><g filter=\"url(#A)\" transform=\"translate(86 60)\" fill-rule=\"nonzero\"><path fill=\"#8d8ea0\" d=\"M118.148 33.05l29.332-9.156-38.875 17.686 3.378-12.62-18.726 3.28 29.168-11.704z\"/><path d=\"M32.364 64.22l-.044-.33a2.263 2.263 0 00-.882-1.543c-1.962-1.477-7.12-6.13-8.995-15.212H14.97l4.3 17.57a2.885 2.885 0 002.888 2.205l5.997 2.27c1.323-.022 4.343-3.638 4.21-4.96z\" class=\"E\"/><path fill=\"#de9000\" d=\"M29.94 66.735l-.044-.33a2.267 2.267 0 00-.882-1.543c-2.14-1.61-8.047-6.967-9.414-17.725h-7.672l4.916 20.084a2.885 2.885 0 002.888 2.205l8.003-.154a2.306 2.306 0 002.205-2.535z\"/><path d=\"M6.063 23.26c-3.307 0-5.997 2.7-5.975 5.997v6.35c0 3.307 2.7 5.997 5.997 5.975l7.275-.022-.044-18.343-7.253.044z\" class=\"C\"/><path d=\"M6.107 41.602C2.8 41.602.1 38.934.1 35.627v-3.175l13.272-.022.022 9.17H6.107z\" class=\"I\"/><g transform=\"translate(6.394 16.535)\"><path d=\"M17.196 31.482c.794-.044 1.39-.33 1.962-.926.75-.816 1.257-1.852 1.654-2.866 1.212-3.11 1.653-6.548 1.786-9.855l.044-1.984c0-3.505-.353-7.12-1.41-10.472-.53-1.72-1.455-4.475-3.417-5.05-.683-.198-1.5-.088-2.205-.066h-3.197L5.997.287c-.97 0-1.653.154-2.36.86-.772.772-1.28 1.808-1.675 2.8C.728 7.01.287 10.428.132 13.713.088 14.44.088 15.2.088 15.918c0 3.527.353 7.143 1.41 10.538.53 1.697 1.477 4.475 3.44 5.005.75.198 1.654.066 2.425.066h3.197l6.393-.022c.066-.022.154-.022.242-.022z\" class=\"E\"/><path d=\"M17.02 15.807H.066v.088c0 3.527.353 7.143 1.41 10.538.53 1.698 1.477 4.475 3.44 5.005.75.198 1.653.066 2.425.066h3.197l6.636-.022c.794-.044 1.39-.33 1.962-.926.75-.816 1.257-1.852 1.654-2.866l.33-.904-4.1-10.98z\" class=\"C\"/><ellipse cx=\"17.531\" cy=\"15.854\" rx=\"5.335\" ry=\"15.631\" transform=\"rotate(179.89 17.531 15.854)\" class=\"F\"/></g><path d=\"M62.943 62.7C51.59 49.472 34.238 44.93 24.075 43.388c-.22-.044-.44-.066-.64-.088-1.83-.728-3.263-5.335-3.263-10.89 0-5.534 1.39-10.14 3.197-10.89.22-.044.44-.066.683-.1 10.163-1.587 27.492-6.195 38.78-19.445l-.55 30.38.66 30.358z\" class=\"C\"/><path d=\"M62.943 62.7C51.59 49.472 34.238 44.93 24.075 43.388c-.22-.044-.44-.066-.64-.088-1.83-.728-3.263-5.335-3.263-10.89l42.11-.088.66 30.38z\" class=\"I\"/><g transform=\"translate(55.116)\"><path d=\"M16.888 64.508c-.088 0-.176 0-.287-.022h-.088l-.353-.066c-.022 0-.044-.022-.066-.022l-.265-.066c-.044-.022-.066-.022-.1-.044-.088-.022-.154-.066-.242-.088-.022-.022-.066-.022-.088-.044-.1-.044-.22-.088-.31-.154-.022 0-.022-.022-.044-.022-.088-.044-.176-.1-.265-.154-.044-.022-.066-.044-.1-.066-.066-.044-.154-.088-.22-.154-.044-.022-.066-.044-.1-.066-.088-.066-.154-.132-.242-.176-.022-.022-.044-.022-.066-.044l-.31-.265c-.022-.022-.044-.044-.088-.066-.066-.066-.154-.132-.22-.22a.746.746 0 01-.088-.1c-.066-.088-.154-.154-.22-.242-.022-.022-.044-.066-.088-.088l-.287-.353c-.022-.022-.022-.044-.044-.044l-.265-.353a.279.279 0 00-.088-.1l-.242-.33c-.022-.022-.044-.066-.066-.088l-.31-.463c-.022-.044-.044-.066-.066-.1a4.095 4.095 0 01-.242-.419c-.022-.044-.044-.066-.066-.1l-.31-.573-.066-.132c-.1-.198-.22-.42-.31-.64l-.375-.816c0-.022-.022-.044-.022-.066l-.353-.816c-.022-.044-.044-.088-.044-.132l-.198-.507c0-.022-.022-.044-.022-.066l-.22-.595-.066-.176-.154-.44-.066-.22-.132-.42-.066-.22-.176-.55c-.022-.044-.022-.066-.044-.1l-.238-.74c-.022-.066-.044-.132-.044-.198l-.132-.53-.066-.243-.132-.53c-.022-.066-.044-.132-.044-.198l-.176-.75c0-.044-.022-.088-.022-.132l-.132-.64a1.135 1.135 0 01-.044-.242l-.1-.55a1.11 1.11 0 01-.044-.265l-.132-.683c0-.044-.022-.066-.022-.1l-.2-1.146c0-.044-.022-.088-.022-.154l-.243-1.52v-.022l-.22-1.587c0-.044 0-.066-.022-.1l-.176-1.52c0-.044-.022-.1-.022-.154l-.154-1.52c0-.066 0-.1-.022-.176l-.088-1.28c0-.066 0-.132-.022-.22l-.066-1.3v-.154l-.088-2.36v-.154l-.022-2.028v-.265l.022-2.116.066-1.962V27.8l.1-1.896v-.044l.154-1.874c0-.044 0-.1.022-.154l.198-1.852.243-1.852c0-.044.022-.088.022-.132l.287-1.83c0-.066.022-.132.022-.198l.132-.75c0-.066.022-.1.022-.176l.154-.86c.022-.066.022-.1.044-.176l.177-.838c0-.044.022-.088.022-.132l.198-.904c.022-.066.022-.132.044-.176l.242-.992c.022-.044.022-.088.044-.132l.265-1.014c0-.022 0-.022.022-.044l.375-1.257c.022-.044.022-.066.044-.1l.375-1.146a.41.41 0 00.044-.154c.022-.088.066-.176.088-.265s.066-.176.088-.264.066-.176.088-.242c.044-.088.066-.176.1-.265.022-.088.066-.154.088-.243.044-.088.066-.176.1-.265.022-.088.066-.154.088-.242.044-.088.066-.176.1-.242.044-.088.066-.154.1-.22l.1-.243c.044-.066.066-.154.1-.22l.1-.243c.044-.066.066-.154.1-.22s.066-.154.1-.22l.1-.198c.034-.066.066-.154.1-.22l.1-.2c.034-.068.066-.132.1-.22.044-.066.066-.132.1-.198s.088-.132.1-.2c.044-.066.066-.132.1-.176.044-.066.088-.132.1-.2l.33-.53c.044-.066.088-.1.132-.176.044-.044.066-.1.1-.154.044-.066.088-.1.132-.176.044-.044.066-.1.1-.154s.088-.1.132-.154a.67.67 0 00.11-.154c.044-.044.088-.1.132-.154s.088-.088.1-.132a.96.96 0 00.132-.154c.044-.044.088-.088.1-.132l.132-.132c.044-.044.088-.088.1-.132l.132-.132c.044-.044.088-.066.132-.1s.088-.088.132-.1c.044-.044.088-.066.132-.1l.132-.1c.044-.022.088-.066.132-.088.044-.044.088-.066.132-.1.044-.022.088-.066.132-.088s.088-.066.132-.088.088-.044.132-.088c.044-.022.088-.044.132-.088l.132-.066a1.06 1.06 0 01.154-.066l.132-.066c.044-.022.088-.044.154-.066.044-.022.088-.044.132-.044a.41.41 0 01.154-.044c.044-.022.088-.022.132-.044s.1-.022.154-.044c.044 0 .088-.022.1-.022.044-.022.1-.022.154-.022s.066-.022.1-.022c.066 0 .132-.022.176-.022h.375l-6.504.022c-.066 0-.132.022-.176.022s-.066.022-.1.022-.1.022-.154.022-.088.022-.1.022c-.044.022-.1.022-.154.044s-.088.022-.132.044-.1.022-.154.044-.088.022-.132.044-.1.044-.154.066l.109.001c-.045.02-.088.043-.155.065L8.82.66c-.044.022-.088.044-.132.088-.044.022-.088.044-.132.088-.044.022-.088.066-.132.088s-.088.066-.132.088-.088.066-.132.1c-.044.022-.088.066-.132.088-.044.044-.088.066-.132.1l-.132.1-.132.1-.132.1-.132.132c-.044.044-.088.088-.1.132l-.132.132c-.044.044-.088.088-.1.132a.957.957 0 00-.132.154c-.044.044-.088.088-.1.132-.044.044-.088.1-.132.154s-.088.088-.1.154c-.044.044-.088.1-.132.154a.67.67 0 00-.11.154c-.044.066-.088.1-.132.176-.044.044-.066.1-.1.154-.044.066-.088.1-.132.176l-.22.353-.1.176c-.044.066-.088.132-.1.198-.044.066-.066.132-.1.176a.89.89 0 00-.11.198c-.044.066-.066.132-.1.198s-.066.132-.1.22c-.044.066-.066.132-.1.198s-.066.154-.1.22l-.1.198c-.034.066-.066.154-.1.22s-.066.132-.1.22c-.044.066-.066.154-.1.242-.044.066-.066.154-.1.22l-.1.242c-.044.066-.066.154-.1.22l-.1.242c-.022.088-.066.154-.088.242-.044.088-.066.176-.1.264-.022.088-.066.154-.088.243-.044.088-.066.176-.1.264-.022.088-.066.176-.088.243-.022.088-.066.176-.088.265s-.066.176-.088.242c0 .022-.022.066-.022.088s-.022.044-.022.066l-.375 1.146c-.022.044-.022.066-.044.1l-.375 1.257v.044L2.16 12.83c-.022.044-.022.088-.044.132l-.242.992c0 .022-.022.066-.022.088s-.022.066-.022.088a60.375 60.375 0 00-.199.904c0 .044-.022.088-.022.132l-.176.838c0 .044-.022.066-.022.1 0 .022 0 .044-.022.066-.066.287-.1.573-.154.86-.022.066-.022.132-.022.176l-.132.75c0 .044-.022.088-.022.132v.044l-.287 1.83v.132L.353 23.8v.132l-.154 1.874v.044l-.1 1.896v.154l-.066 1.962v.066L0 31.99v.265l.022 2.028v.154l.088 2.36v.154l.066 1.3a.61.61 0 00.022.198l.088 1.28v.176l.154 1.52c0 .044.022.1.022.154L.64 43.1c0 .044 0 .066.022.1l.22 1.587v.022l.243 1.52v.044c0 .044.022.066.022.1l.198 1.146v.022c0 .022.022.066.022.088l.132.683c.022.088.044.154.044.242l.1.55c.022.088.044.154.044.242l.154.64c0 .044.022.088.022.132l.176.75c.022.066.044.132.044.198l.132.53.066.243.132.53c.022.066.044.132.044.198l.198.683c0 .044.022.066.022.1l.176.573c0 .022.022.066.022.088.022.044.022.088.044.132l.132.42.066.22c.044.154.1.287.154.44l.066.176.22.595c0 .022.022.044.022.066l.198.507c0 .022.022.044.022.066s.022.044.022.066l.353.816c0 .022.022.044.022.066l.375.816.31.64.066.132.31.573s.022.022.022.044c.022.022.022.044.044.066l.243.42c.022.044.044.088.066.1l.31.463s0 .022.022.022c.022.022.022.044.044.066l.242.33a.48.48 0 00.088.11l.264.353c0 .022.022.022.022.044l.287.353.088.088c.066.088.154.154.22.242.022.022.044.044.044.066l.044.044.22.22c.022.022.044.044.088.066l.31.264h.022c.022.022.044.022.044.044.088.066.154.132.242.176.044.022.066.044.1.066.066.044.154.088.22.154.022.022.044.022.066.044.022 0 .022.022.044.022.088.044.176.1.265.154.022 0 .022.022.044.022.1.044.22.1.31.154 0 0 .022 0 .022.022.022 0 .044.022.066.022a1.07 1.07 0 00.242.088c.044.022.066.022.1.044l.265.066c.022 0 .044.022.066.022h.022l.353.066h.088c.088 0 .176.022.287.022H11l6.13-.022c-.132.088-.176.088-.243.088z\" class=\"E\"/><g transform=\"rotate(179.89 16.994 32.298)\"><ellipse cx=\"16.994\" cy=\"32.298\" rx=\"11.023\" ry=\"32.21\" class=\"F\"/><ellipse cx=\"16.994\" cy=\"32.298\" rx=\"9.348\" ry=\"27.338\" class=\"C\"/></g><path d=\"M14.33 58.467c-3.263-2.888-5.776-10.803-6.482-20.68a73.32 73.32 0 01-.198-5.468 89.01 89.01 0 01.176-5.489c.66-9.855 3.153-17.792 6.416-20.68 3.836 3.395 6.658 13.8 6.68 26.147s-2.756 22.774-6.592 26.17z\" class=\"I\"/><path d=\"M7.85 37.788l-.2-5.468.176-5.49 9.17.838.022 9.26-9.17.86z\" class=\"C\"/><ellipse cx=\"16.994\" cy=\"32.298\" rx=\"1.565\" ry=\"4.586\" transform=\"rotate(179.89 16.994 32.298)\" class=\"F\"/></g><path d=\"M55.006 34.37v.154l.088 2.36v.154l.066 1.3c0 .066 0 .132.022.198l.088 1.28v.176l.154 1.52c0 .044.022.1.022.154l.176 1.52c0 .044 0 .066.022.1l.22 1.587v.022l.242 1.52v.044c0 .044.022.066.022.1l.198 1.146v.022c0 .022.022.066.022.088l.132.683c.022.088.044.154.044.243l.1.55c.022.088.044.154.044.242l.154.64c0 .044.022.088.022.132l.176.75c.022.066.044.132.044.198l.132.53.066.242.132.53c.022.066.044.132.044.198l.198.683c0 .044.022.066.022.1l.176.573c0 .022.022.066.022.088.022.044.022.088.044.132l.132.42.066.22c.044.154.1.287.154.44l.066.176.22.595c0 .022.022.044.022.066l.2.507c0 .022.022.044.022.066s.022.044.022.066l.353.816c0 .022.022.044.022.066l.375.816.31.64.066.132.31.573s.022.022.022.044c.022.022.022.044.044.066l.243.42c.022.044.044.088.066.1l.31.463s0 .022.022.022c.022.022.022.044.044.066l.243.33a.279.279 0 00.088.1l.264.353c0 .022.022.022.022.044l.287.353.088.088c.066.088.154.154.22.242.022.022.044.044.044.066l.044.044.22.22c.022.022.044.044.088.066l.31.264h.022c.022.022.044.022.044.044.088.066.154.132.242.176.044.022.066.044.1.066.066.044.154.088.22.154.022.022.044.022.066.044.022 0 .022.022.044.022.088.044.176.1.265.154.022 0 .022.022.044.022.1.044.22.1.31.154 0 0 .022 0 .022.022.022 0 .044.022.066.022a1.07 1.07 0 00.243.088c.044.022.066.022.1.044l.265.066c.022 0 .044.022.066.022h.022l.353.066h.088c.088 0 .176.022.287.022h.176l5.975-.022c-.088 0-.176 0-.287-.022h-.088l-.353-.066c-.022 0-.044-.022-.066-.022l-.264-.066c-.044-.022-.066-.022-.1-.044-.088-.022-.154-.066-.243-.088-.022-.022-.066-.022-.088-.044-.1-.044-.22-.088-.31-.154-.022 0-.022-.022-.044-.022-.088-.044-.176-.1-.265-.154-.044-.022-.066-.044-.1-.066-.066-.044-.154-.088-.22-.154-.044-.022-.066-.044-.1-.066-.088-.066-.154-.132-.242-.176-.022-.022-.044-.022-.066-.044l-.31-.265c-.022-.022-.044-.044-.088-.066-.066-.066-.154-.132-.22-.22a.746.746 0 01-.088-.1c-.066-.088-.154-.154-.22-.242-.022-.022-.044-.066-.088-.088l-.287-.353c-.022-.022-.022-.044-.044-.044l-.265-.353a.279.279 0 00-.088-.1l-.243-.33c-.022-.022-.044-.066-.066-.088l-.31-.463c-.022-.044-.044-.066-.066-.1a4.095 4.095 0 01-.242-.419c-.022-.044-.044-.066-.066-.1l-.31-.573-.066-.132c-.1-.198-.22-.42-.31-.64l-.375-.816c0-.022-.022-.044-.022-.066l-.353-.816c-.022-.044-.044-.088-.044-.132l-.2-.507c0-.022-.022-.044-.022-.066l-.287-.772-.154-.44-.066-.22-.132-.42-.066-.22-.177-.55c-.022-.044-.022-.066-.044-.1l-.2-.683c-.022-.066-.044-.132-.044-.198l-.132-.53-.066-.243-.132-.53c-.022-.066-.044-.132-.044-.198l-.176-.75c0-.044-.022-.088-.022-.132l-.132-.64a1.135 1.135 0 01-.044-.242l-.1-.55c-.022-.088-.044-.176-.044-.265l-.132-.683c0-.044-.022-.066-.022-.1l-.198-1.146c0-.044-.022-.088-.022-.154l-.243-1.52v-.022l-.22-1.587c0-.044 0-.066-.022-.1l-.176-1.52c0-.044-.022-.1-.022-.154l-.154-1.52c0-.066 0-.1-.022-.176l-.088-1.28c0-.066 0-.132-.022-.22l-.066-1.3v-.154l-.088-2.36v-.154l-.022-1.808h-6.13l.022 1.852z\" class=\"C\"/></g><text font-size=\"14\" class=\"J K L\" transform=\"translate(60 50)\"><tspan x=\"3.524\" y=\"159\">Tell your friends about Rollbit </tspan><tspan x=\"8.067\" y=\"182\">by sharing your referral link.</tspan></text><text font-size=\"16\" class=\"E M N\" transform=\"translate(60 50)\"><tspan y=\"129\" x=\"29\">INFORM OTHERS</tspan></text><g transform=\"translate(360.583 60)\"><mask id=\"l\" class=\"D\"><use xlink:href=\"#c\"/></mask><use filter=\"url(#B)\" xlink:href=\"#c\" class=\"B\"/><use xlink:href=\"#c\" class=\"E\"/><g class=\"F\"><path d=\"M22.75-16.917h11.083V73.5H22.75z\" mask=\"url(#l)\" transform=\"rotate(45 28.292 28.292)\"/><path d=\"M17.792-22.75h4.667v90.417h-4.667z\" mask=\"url(#l)\" transform=\"rotate(45 20.125 22.458)\"/></g></g><g transform=\"translate(367 66.417)\"><mask id=\"m\" class=\"D\"><use xlink:href=\"#d\"/></mask><use filter=\"url(#C)\" xlink:href=\"#d\" class=\"B\"/><use xlink:href=\"#d\" class=\"C\"/><use filter=\"url(#D)\" xlink:href=\"#d\" class=\"B\"/><g mask=\"url(#m)\"><use filter=\"url(#E)\" xlink:href=\"#N\" class=\"B\"/><use xlink:href=\"#N\" class=\"G\"/><use filter=\"url(#F)\" xlink:href=\"#N\" class=\"B\"/></g></g><path d=\"M343.983 107.333c3.812 2.23 9.317 1.175 10.767.138-2.204-2.026-10.702-10.775-9.94-24.398-6.583-1.17-19.832-3.98-26.168-10.823a12.237 12.237 0 00-.292 2.638c0 9.27 11.245 14.924 18.317 13.887a29.764 29.764 0 01-9.867 1.945 25.447 25.447 0 01-8.077-1.305c1.2 6.4 6.076 10.612 12.197 10.612 3.435 0 8.507-1.532 10.508-4.263-1.535 3.995-7.57 6.605-12.298 7.1 1.782 2.58 5.128 3.513 8.332 3.513 2.937 0 6.076-2.4 7.87-4.56.203 1.97-.8 4.393-1.35 5.515zm103.2 0c-3.812 2.23-9.317 1.175-10.767.138 2.204-2.026 10.702-10.775 9.94-24.398 6.582-1.17 19.832-3.98 26.168-10.823a11.65 11.65 0 01.292 2.638c0 9.27-11.245 14.924-18.317 13.887a29.764 29.764 0 009.868 1.945 25.447 25.447 0 008.077-1.305c-1.2 6.4-6.076 10.612-12.197 10.612-3.435 0-8.507-1.532-10.508-4.263 1.535 3.995 7.57 6.605 12.298 7.1-1.782 2.58-5.128 3.513-8.332 3.513-2.937 0-6.076-2.4-7.87-4.56-.202 1.97.8 4.393 1.35 5.515z\" fill=\"#8d8ea0\"/><text font-size=\"14\" class=\"J K L\" transform=\"translate(300 50)\"><tspan x=\"6.59\" y=\"159\">Get paid 30% commission on </tspan><tspan x=\"7.745\" y=\"182\">all your referred users’ bets.</tspan></text><text font-size=\"16\" class=\"E M N\" transform=\"translate(300 50)\"><tspan x=\"40.132\" y=\"129\">MAKE PROFIT</tspan></text><g transform=\"translate(582.327 97.571)\"><mask id=\"n\" class=\"D\"><use xlink:href=\"#O\"/></mask><use xlink:href=\"#O\" class=\"H\"/><use xlink:href=\"#g\" mask=\"url(#n)\" class=\"C\"/></g><g transform=\"translate(582.327 81.885)\"><mask id=\"o\" class=\"D\"><use xlink:href=\"#S\"/></mask><use xlink:href=\"#S\" class=\"E\"/><use xlink:href=\"#h\" mask=\"url(#o)\" class=\"F\"/><use filter=\"url(#G)\" xlink:href=\"#T\" class=\"B\"/><use xlink:href=\"#T\" class=\"C\"/><use filter=\"url(#H)\" xlink:href=\"#T\" class=\"B\"/><use filter=\"url(#I)\" xlink:href=\"#P\" class=\"B\"/><use xlink:href=\"#P\" class=\"G\"/><use filter=\"url(#J)\" xlink:href=\"#P\" class=\"B\"/></g><g transform=\"translate(576.327 82.575)\"><mask id=\"p\" class=\"D\"><use xlink:href=\"#d\" href=\"#O\"/></mask><use xlink:href=\"#d\" class=\"H\" href=\"#O\"/><use xlink:href=\"#g\" mask=\"url(#p)\" class=\"C\"/></g><g transform=\"translate(576.327 66.89)\"><mask id=\"q\" class=\"D\"><use xlink:href=\"#U\"/></mask><use xlink:href=\"#U\" class=\"E\"/><use xlink:href=\"#h\" mask=\"url(#q)\" class=\"F\"/><use filter=\"url(#G)\" xlink:href=\"#V\" class=\"B\"/><use xlink:href=\"#V\" class=\"C\"/><use filter=\"url(#H)\" xlink:href=\"#V\" class=\"B\"/><use filter=\"url(#I)\" xlink:href=\"#e\" class=\"B\" href=\"#P\"/><use xlink:href=\"#e\" class=\"G\" href=\"#P\"/><use filter=\"url(#J)\" xlink:href=\"#e\" class=\"B\" href=\"#P\"/></g><g transform=\"translate(621.388 105.788)\"><mask id=\"r\" class=\"D\"><use xlink:href=\"#Q\"/></mask><use xlink:href=\"#Q\" class=\"H\"/><use xlink:href=\"#i\" mask=\"url(#r)\" class=\"C\"/></g><g transform=\"translate(621.388 90.046)\"><mask id=\"s\" class=\"D\"><use xlink:href=\"#W\"/></mask><use xlink:href=\"#W\" class=\"E\"/><use xlink:href=\"#j\" mask=\"url(#s)\" class=\"F\"/><use filter=\"url(#K)\" xlink:href=\"#X\" class=\"B\"/><use xlink:href=\"#X\" class=\"C\"/><use filter=\"url(#L)\" xlink:href=\"#X\" class=\"B\"/><use filter=\"url(#I)\" xlink:href=\"#R\" class=\"B\"/><use xlink:href=\"#R\" class=\"G\"/><use filter=\"url(#M)\" xlink:href=\"#R\" class=\"B\"/></g><g transform=\"translate(626.788 89.938)\"><mask id=\"t\" class=\"D\"><use xlink:href=\"#h\" href=\"#Q\"/></mask><use xlink:href=\"#h\" class=\"H\" href=\"#Q\"/><use xlink:href=\"#i\" mask=\"url(#t)\" class=\"C\"/></g><g transform=\"translate(626.788 74.196)\"><mask id=\"u\" class=\"D\"><use xlink:href=\"#Y\"/></mask><use xlink:href=\"#Y\" class=\"E\"/><use xlink:href=\"#j\" mask=\"url(#u)\" class=\"F\"/><use filter=\"url(#K)\" xlink:href=\"#Z\" class=\"B\"/><use xlink:href=\"#Z\" class=\"C\"/><use filter=\"url(#L)\" xlink:href=\"#Z\" class=\"B\"/><use filter=\"url(#I)\" xlink:href=\"#i\" class=\"B\" href=\"#R\"/><use xlink:href=\"#i\" class=\"G\" href=\"#R\"/><use filter=\"url(#M)\" xlink:href=\"#i\" class=\"B\" href=\"#R\"/></g><g transform=\"translate(621.343 75.742)\"><mask id=\"v\" class=\"D\"><use xlink:href=\"#j\" href=\"#Q\"/></mask><use xlink:href=\"#j\" class=\"H\" href=\"#Q\"/><use xlink:href=\"#i\" mask=\"url(#v)\" class=\"C\"/></g><g transform=\"translate(621.343 60)\"><mask id=\"w\" class=\"D\"><use xlink:href=\"#a\"/></mask><use xlink:href=\"#a\" class=\"E\"/><use xlink:href=\"#j\" mask=\"url(#w)\" class=\"F\"/><use filter=\"url(#K)\" xlink:href=\"#b\" class=\"B\"/><use xlink:href=\"#b\" class=\"C\"/><use filter=\"url(#L)\" xlink:href=\"#b\" class=\"B\"/><use filter=\"url(#I)\" xlink:href=\"#k\" class=\"B\" href=\"#R\"/><use xlink:href=\"#k\" class=\"G\" href=\"#R\"/><use filter=\"url(#M)\" xlink:href=\"#k\" class=\"B\" href=\"#R\"/></g><text font-size=\"14\" class=\"J K L\" transform=\"translate(540 50)\"><tspan x=\"12.372\" y=\"159\">Collect your earnings at any </tspan><tspan x=\"5.519\" y=\"182\">time using the button below.</tspan></text><text font-size=\"16\" class=\"E M N\" transform=\"translate(540 50)\"><tspan x=\"5.16\" y=\"129\">COLLECT COMMISSION</tspan></text></g></g></svg>")), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.leading-none.uppercase.mb-40` ('My Referrals'), _$sinUmd_43 `section.rounded.p-30.bg-gray-500.uppercase.mb-40
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 20px;
          ` ([_$sinUmd_43 `form` ({
                    onsubmit(ev) {
                        ev.preventDefault()
                        _$referral_26.update(_$referral_26.codeInput)
                    }
                }, [_$sinUmd_43 `label.font-bold.text-sm.text-gray-200.mb-10.block` ('Set Custom Referral Code'), _$sinUmd_43 `div.relative` ([_$sinUmd_43 `input.bg-gray-700.border-gray-700.font-body.font-medium.text-yellow.rounded.w-1.px-20.pr-80.text-base.focus:outline-none.focus:border-yellow.border
                line-height: 50px;
                ` ({
                    value: _$referral_26.codeInput,
                    oninput: (e) => {
                        _$referral_26.codeInput = e.target.value
                    }
                }), _$sinUmd_43 `div.absolute.bottom-0.flex
                  top: 10px;
                  right: 10px;
                  z-index: 1;
                ` ([buttonYellow.small `.px-15.uppercase` ({
                    type: 'submit'
                }, 'Apply')])])]), _$sinUmd_43 `div` ([_$sinUmd_43 `label.font-bold.text-sm.text-gray-200.mb-10.block` ('Your Referral Link'), _$sinUmd_43 `div.relative
              ` ([_$sinUmd_43 `input.bg-gray-700.border-gray-700.font-body.font-medium.text-yellow.rounded.w-1.px-20.pr-80.text-base.focus:outline-none.focus:border-yellow.border
                line-height: 50px;
                ` ({
                    readonly: true,
                    value: 'https://www.rollbit.com/r/' + _$referral_26.code
                }), _$sinUmd_43 `div.absolute.bottom-0.flex
                  top: 10px;
                  right: 10px;
                  z-index: 1;
                ` ([buttonGray.small `.px-15.uppercase` ({
                    onclick() {
                        navigator.clipboard.writeText(`https://www.rollbit.com/r/${_$referral_26.code}`)
                    }
                }, 'Copy')])])])]), _$sinUmd_43 `section.mb-40
            display grid
            grid-template-columns: 1fr 1fr 2fr;
            gap: 20px;
          ` ([_$sinUmd_43 `div.rounded.p-20.bg-gray-500.uppercase.font-numeric.font-body.font-medium.text-gray-100.text-lg.text-center` ([_$sinUmd_43 `span.block.text-gray-200.font-bold.text-sm.mb-10` ('Total wagered'), _$icons_8.coins `.text-yellow.inline-block.mr-10
                height 14
                transform scale(0.7)
              `, (_$referral_26.stats.totalWagered / 100).toFixed(2)]), _$sinUmd_43 `div.rounded.p-20.bg-gray-500.uppercase.font-numeric.font-body.font-medium.text-gray-100.text-lg.text-center` ([_$sinUmd_43 `span.block.text-gray-200.font-bold.text-sm.mb-10` ('Commission (30%)'), _$icons_8.coins `.text-yellow.inline-block.mr-10
                height 14
                transform scale(0.7)
              `, (_$referral_26.stats.totalCommission / 100).toFixed(2)]), _$sinUmd_43 `div.rounded.p-20.bg-gray-500.uppercase.font-numeric.font-body.font-medium.text-gray-100.text-lg.flex.flex-row
              background #2B4132
            ` ([_$sinUmd_43 `div.mr-auto` ([_$sinUmd_43 `span.block.text-green.font-bold.text-sm.mb-10` ('Available commission'), _$icons_8.coins `.text-yellow.inline-block.mr-10
                  height 14
                  transform scale(0.7)
                `, (_$referral_26.stats.availableCommission / 100).toFixed(2)]), buttonGreen.medium `.uppercase.px-20.self-center` ({
                    disabled: _$referral_26.stats.availableCommission === 0,
                    async onclick() {
                        this.disabled = true
                        await _$referral_26.claim()
                        this.disabled = false
                    }
                }, 'Claim')])]), _$sinUmd_43 `h2.text-base.font-extrabold.text-gray-200.leading-none.uppercase.mb-20` ({
                    life: () => {
                        _$referral_26.list()
                    }
                }, 'Your Referred Users:'), _$table_49({
                    headers: ['Username', 'Total Wagered', 'Commission Generated', 'Member Since']
                }, _$referral_26.commissions.map(m => _$sinUmd_43 `tr.bg-gray-700.text-gray-100.text-base.font-medium
            border-bottom: 2px solid var(--color-gray-500);
          ` ([_$sinUmd_43 `td.pl-10.py-15.rounded-l` ([_$sinUmd_43 `img.rounded-sm.h-20.w-20.mr-10.inline-block` ({
                    src: m.avatar || 'images/default-avatar.svg'
                }), m.displayName]), _$sinUmd_43 `td.pl-10.py-15` ([_$icons_8.coins `.text-yellow.inline-block.mr-10
                height 14
                transform scale(0.7)
              `, (m.totalWagered / 100).toFixed(2)]), _$sinUmd_43 `td.pl-10.py-15` ([_$icons_8.coins `.text-yellow.inline-block.mr-10
                height 14
                transform scale(0.7)
              `, (m.totalCommission / 100).toFixed(2)]), _$sinUmd_43 `td.pl-10.py-15.rounded-r.text-gray-200` (new Date(m.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }))])))],
            }))])]
        })
    });
    var _$provablyFair_77 = createModuleFactory(function(module, exports) {;;;
        module.exports = () => _$sinUmd_43 `section.mx-auto.font-body.text-gray-200.text-base.leading-snug.p-50
  max-width 750px
` ({
            oninit() {
                _$xRoulette_29.loadPreviousRounds()
            }
        }, [_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.mb-10` ('Provably Fair'), ...groupBySeed(_$xRoulette_29.previousRounds).map(g => [_$sinUmd_43 `div.flex.flex-row.items-center` ([_$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm.mr-20` ('Global Seed'), _$sinUmd_43 `input.bg-gray-700.border.border-gray-400.text-gray-100.font-body.font-medium.text-base.focus:border-yellow.focus:outline-none.rounded.font-numeric.flex-1.leading-none
      padding 15px
      width: fit-content;
      ` ({
            readonly: true,
            value: _$xRoulette_29.nonces[g[0].seed - 1]
        })]), _$sinUmd_43 `div` (_$table_49 `.overflow-scroll.my-30` ({
            headers: ['Date / Time', _$sinUmd_43 `span.inline-block.w-100` ('Result'), _$sinUmd_43 `span.inline-block.w-100` ('Round ID'), 'Hash']
        }, g.map(r => _$sinUmd_43 `tr.bg-gray-700.text-gray-100.text-base.font-medium.overflow-scroll-x
      border-bottom: 2px solid var(--color-gray-500);
    ` ([_$sinUmd_43 `td.pl-10.py-15.rounded-l.whitespace-no-wrap.pr-15.text-gray-200` ([new Date(r.closeTimestamp + 5000).toLocaleDateString(undefined, {
            dateStyle: 'short',
            timeStyle: 'medium'
        })]), _$sinUmd_43 `td.pl-10.py-15.whitespace-no-wrap.w-70` ({
            className: r.result > 190 ? 'text-green' : ''
        }, [r.result === 0 ? '-' : 'x ' + (r.result / 100).toFixed(2)]), _$sinUmd_43 `td.pl-10.py-15.whitespace-no-wrap` (['#' + r.counter]), _$sinUmd_43 `td.pl-10.py-15.rounded-r.text-gray-200.font-numeric` (r.hash)]))))]), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.mb-10` ('Algorithm'), _$sinUmd_43 `p` ('All multiplayer, provably-fair games on Rollbit are based on a few well-studied cryptographic primitives. All rounds of a game are determined before the games starts using a hash chain. To generate a hash chain, first a seed is generated following algorithm 1:'), _$sinUmd_43 `pre.whitespace-pre.overflow-y-scroll.bg-gray-100.text-gray-800.rounded.p-10.my-20` ('Seed = 256-bit Cryptographically random integer'), _$sinUmd_43 `p` ('To generate a hash chain of N rounds, algorithm 2 is used:'), _$sinUmd_43 `pre.whitespace-pre.overflow-y-scroll.bg-gray-100.text-gray-800.rounded.p-10.my-20` (`Round N = Seed
Round N - 1 = Hash(Round N)
Round N - 2 = Hash(Round N - 1)
...
Round 0 = Hash(Round 1)
  `), _$sinUmd_43 `p` ('On Rollbit Hash is the BLAKE2b-256 hash function with no key or personalisation arguments. Each round hash has two purposes, 1) it is a cryptographic commitment to the outcome of the next round (known as the pre-image) and 2) it is the key for the current round, used for the provably fair random number generator (PFRNG) explained in the next section.'), _$sinUmd_43 `p` ('To generate random numbers in an unbiased, uniform and provably fair manner, the base primitive is a cryptographic stream cipher. Stream ciphers have the advantage that they generate uniform, unbiased bits indistinguishable from true random. From random bits various probability distributions can be constructed. Stream ciphers require a key and a nonce. For Rollbit, the round hash is used as the key, and a bitcoin block hash is used as the nonce:'), _$sinUmd_43 `pre.whitespace-pre.overflow-y-scroll.bg-gray-100.text-gray-800.rounded.p-10.my-20` (`pfrng = stream_cipher(hash, nonce)

pfrng(0) = first 64 random bytes
pfrng(1) = next 64 random bytes
...
pfrng(232 - 1) = last 64 random bytes
  `), _$sinUmd_43 `p` ('Rollbit specifically uses the algorithm ChaCha20, which requires a key of 256 random bits (64 bytes) and a nonce of 192 bits (24 bytes). For Rollbit the key is the pre-image to the hash and the nonce is the last 24 bytes of a bitcoin block hash.'), _$sinUmd_43 `p` ('It is important for user assurance that the hash of the first round (the commitment to the result) is published before the nonce is known, such that the user can be sure that the hash chain was not generated in favour of the house. Otherwise the house could repeatedly try seeds (known as mining) to the hash chain until rounds were in favour of the house.'), _$sinUmd_43 `p` ('Worked example:'), _$sinUmd_43 `pre.whitespace-pre.overflow-y-scroll.bg-gray-100.text-gray-800.rounded.p-10.my-20` (`// 256 bits encoded as hexadecimal (hence 64 characters).
// Generated prior to the bitcoin block hash being mined
seed = 003a70da6c7975c4d6a1444372ac2a0eb284e8a7e34ab44049ccbf72a6ceb2f7
// Last 24 bytes of bitcoin block hash 618400 encoded as hexadecimal
// (hence 48 characters)
nonce = 000cb464f3754abe8fc939728f34e173a8d259e4ef0ab37e

// Generate 5 rounds
Round 5 = 003a70da6c7975c4d6a1444372ac2a0eb284e8a7e34ab44049ccbf72a6ceb2f7
Round 4 = 240e07ea0a4c9f58bbc6315688c4fb4fafbd2b6673321d8724dbd929348b1f13
Round 3 = 59c1f9d61086a06fea608a5b710719e002c2c9978e436069c148a4f4cb90d937
Round 2 = 6ac91228e6bc085f33489a74d92c30dbce17f665e9a0ee79a8f19e625d14f7b7
Round 1 = 2336b810aafe35a7fff2ccd2773363da5f48389b69076d4fad23447e5f1f753f
// Round 0 is the commitment to the result of round 1
Round 0 = 869ae06635225948119bb67bd3c8f8f8f3dc0bdaafb6bb8a4054834343020ea3
  `), _$sinUmd_43 `p` ('To verify a result you apply the hash function to the pre-image and check that it matches the commitment. Eg:'), _$sinUmd_43 `pre.whitespace-pre.overflow-y-scroll.bg-gray-100.text-gray-800.rounded.p-10.my-20` (`// Hash(Round 0) is strictly equal to Round 1.
// Or in other words Commitment === Pre-image
BLAKE2b-256(
  2336b810aafe35a7fff2ccd2773363da5f48389b69076d4fad23447e5f1f753f
)
==
869ae06635225948119bb67bd3c8f8f8f3dc0bdaafb6bb8a4054834343020ea3
  `), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.mb-10` ('X-Roulette'), _$sinUmd_43 `p` ('X-Roulette is based on an truncated exponential distribution in the range [1, 1000000] (both inclusive) using the formula "outcome = max(100, min(1000000, floor(95 / (1 - X)))) / 100", where X is a uniform, equidistant number in the double floating point range [0, 1) (1 exclusive). The expected value of 1.90. X is generated using the following formula:'), _$sinUmd_43 `pre.whitespace-pre.overflow-y-scroll.bg-gray-100.text-gray-800.rounded.p-10.my-20` (`r = 52 random bits from stream
// X = r / 2^52
// Or practically the following Javascript:
const write = new Uint8Array(8)
const read = new Float64Array(write.buffer)
//           s|exponent
write[7] = 0b00111111

function randomDouble (pfrng) {
  // Read 7 bytes from PFRNG
  pfrng(7, write)
  //                 exponent|
  write[6] = write[6] | 0b11110000
  return read[0] - 1
}

`)])

        function groupBySeed(rounds) {
            return rounds.reduce((s, r) => {
                var last = s.length - 1
                if (s[last] == null || s[last][0].seed !== r.seed) {
                    s.push([])
                    last++
                }
                s[last].push(r)
                return s
            }, [])
        }
    });
    var _$apiKeyFaq_50 = createModuleFactory(function(module, exports) {;
        module.exports = _$sinUmd_43(() => _$sinUmd_43 `section.mx-auto.font-body.text-gray-200.text-base.leading-snug.p-50
  max-width 750px
` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.mb-10` ('API Key FAQ'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.mb-30` ('Last updated: April 15, 2020'), _$sinUmd_43 `p` (['Rollbit has a unique P2P (peer-to-peer) deposit and withdrawal system. Unlike other sites, our system allows users to deposit and withdraw CS:GO items even when CS:GO Player Inventories are critical. We are able to do this because we track user trading history using the Steam Web API. To utilise the Steam Web API, we require the user to generate and supply us with their API key. There are lots of misconceptions about this API key in the community so we\'ve made this page to clear them up and give a much better understanding of the facts surrounding Steam Web API keys.']), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.mt-30.mb-15` ('How do I generate and give Rollbit my Steam Web API Key?'), _$sinUmd_43 `p` (['Rollbit will ask for your Steam Web API Key when you attempt to use the P2P system for the first time. We will provide a link directly to the page where you can generate a Steam Web API Key. The page will ask for a "domain". This value can be anything such as "localhost" or "apples". Once your key is generated, simply copy and paste it into the field provided on Rollbit. As long as your Steam trade URL and Steam Web API Key are valid, you will be able to start using our P2P system.']), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.mt-30.mb-15` ('Why does Rollbit need my Steam Web API Key?'), _$sinUmd_43 `p` (['Rollbit needs your Steam Web API Key to ensure P2P trades are as smooth as possible. This makes our P2P trading system much more reliable than other sites as we can confirm that a trade was made between two users. More importantly, it allows us to see the status of the created trade. This allows us to update the trade\'s progress throughout the transaction. This extra visibility gives our system many benefits including the ability to let the buyer know an offer has been sent by the seller and is awaiting their acceptance. A Steam Web API key can be used for a variety of things but Rollbit\'s use is strictly for tracking P2P trades, nothing more.']), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.mt-30.mb-15` ('Why should I trust Rollbit with my API Key?'), _$sinUmd_43 `p` (['Rollbit\'s longevity and success is dependent on being trustworthy and transparent. Rollbit is a fully licensed and regulated business. Rollbit stores your API key securely within a database. To ensure we maintain a good level of security and protect your API keys, we adhere to secure programming standards and are regularly audited for any security issues.']), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.mt-30.mb-15` ('What\'s the worst that can be done with a Steam Web API Key?'), _$sinUmd_43 `p` (['One of the biggest misconceptions about Steam Web API keys is that they can do absolutely anything on your Steam account. This is simply not true. A Steam Web API key is locked down to a very specific set of actions. A Steam Web API Key cannot allow you to reset passwords, change an account\'s email address, disable 2-factor authentication, send trade offers, accept trade offers or view sensitive payment information. You can verify this and read more about the actions a Steam Web API Key can do ', _$sinUmd_43 `a.text-yellow.hover:underline` ({
            href: 'https://partner.steamgames.com/doc/webapi',
            target: '_blank',
            rel: 'noreferrer'
        }, 'here'), '.']), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.mt-30.mb-15` ('Watch out for scams!'), _$sinUmd_43 `p.mb-20` (['Unfortunately, there is such a thing as a "API scam" within the Steam and CS:GO community. You can be the victim of a API scam if you provide a nefarious party with your API key. The typical way a API scam will work is a nefarious party will compromise your Steam Web API key. With access to your Steam Web API Key, they will monitor your trading history and intercept any trades where you are sending an item to another Steam user (a "gift" trade). They will then cancel the offer, impersonate the recipient and send a trade offer from the impersonator to trick you into sending the item to a Steam account they control. This is why Rollbit recommends verifying a user\'s Steam level and registration date before sending them an offer. Under no circumstance should a buyer (the "withdrawer") send a seller (the "depositor") a trade offer. When depositing an item to Rollbit, if the withdrawer sends you a trade offer please cancel it immediately and report the user to us.']), _$sinUmd_43 `p` (['One of the most common ways a scammer will get your Steam Web API Key is if you install a malicious browser extension. Be wary of browser extensions that aren\'t popular, not created by a trustworthy individual or business and request permission to read and/or change data on "steamcommunity.com". Rollbit staff will NEVER ask for your API key, please report any impersonators to us. If you notice your Steam Web API key was already set when you go to generate it and you can\'t remember doing it yourself, you should immediately revoke it, reset your Steam account password and review your browser extensions for anything suspicious.'])]))
    });
    var _$support_78 = createModuleFactory(function(module, exports) {;
        module.exports = _$sinUmd_43(() => _$sinUmd_43 `section.mx-auto.font-body.text-gray-200.text-base.leading-snug.p-50
  max-width 750px
` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.mb-10` ('Support'), _$sinUmd_43 `p` (['For any support, inquiries or questions please contact support. Please provide your Steam 64 ID and be as specific as possible:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('By email: ', link('mailto:support@rollbit.com', 'support@rollbit.com')), _$sinUmd_43 `li` ('By phone (09:00 - 16:00 UTC): ', link('tel:+441847557857', '+44 1847 557857'))]), _$sinUmd_43 `br`, 'PENGWINS N.V. (Registration Number 152488)', _$sinUmd_43 `br`, 'Abraham de Veerstraat 9', _$sinUmd_43 `br`, 'Willemstad', _$sinUmd_43 `br`, 'Curacao'])]))

        function link(url, text) {
            return _$sinUmd_43 `a.underline.hover:text-yellow` ({
                href: url,
                target: '_blank',
                rel: 'noreferrer'
            }, text)
        }
    });
    var _$xRoulette_82 = createModuleFactory(function(module, exports) {;;
        const {
            buttonFlat
        } = _$button_4;;;;;;;
        const XRoulette = _$xRoulette_29(_$websocket_28);;;;;
        module.exports = _$sinUmd_43(({
            route
        }) => {
            const modals = []
            const unlisten = XRoulette.listenWin(({
                x, i, profit
            }) => {
                const self = _$winModal_89({
                    d: _$selectSkin_84({
                        x,
                        i,
                        profit: profit / 100
                    }),
                    amount: profit,
                    onclose() {
                        modals.splice(modals.indexOf(self))
                    }
                })
                modals.push(self)
            })
            return () => _$sinUmd_43 `section.mt-20.mb-50
    display: grid;
    grid: 'game leaderboard';
    grid-template-columns: minmax(0, 1fr) 320px;
    display: border-box;
  ` ({
                life() {
                    return unlisten
                }
            }, [modals, _$sinUmd_43 `section.game
      grid-area: game;
    ` ([progress({
                status: XRoulette.status
            }), _$sinUmd_43 `div.rolls.relative.max-w-1` ([_$sinUmd_43 `div.ticker.absolute.m-auto.z-10.inset-x-0.bottom-0
          width: 11px;
          top: -10px;

          & #ticker {
            transition 250ms
          }
        ` (_$sinUmd_43.trust(`<svg width="11px" height="203px" xmlns="http://www.w3.org/2000/svg">
            <g fill-rule="evenodd">
                <g transform="translate(-685, -130)" fill="#DEE2FD">
                    <g transform="translate(198, 130)">
                        <path id="ticker" d="${!XRoulette.csgoMode ? 'M487,180 L491,172 L491,8 L487.723607,1.4472136 C487.476618,0.953235098 487.676842,0.352562058 488.17082,0.105572809 C488.309676,0.0361450918 488.462789,2.50562666e-16 488.618034,0 L496.381966,0 C496.934251,-7.67586877e-16 497.381966,0.44771525 497.381966,1 C497.381966,1.1552451 497.345821,1.30835816 497.276393,1.4472136 L494,8 L494,172 L498,180 L487,180 Z' : 'M487,203 L491,195 L491,8 L487.723607,1.4472136 C487.476618,0.953235098 487.676842,0.352562058 488.17082,0.105572809 C488.309676,0.0361450918 488.462789,2.50562666e-16 488.618034,0 L496.381966,0 C496.934251,-7.67586877e-16 497.381966,0.44771525 497.381966,1 C497.381966,1.1552451 497.345821,1.30835816 497.276393,1.4472136 L494,8 L494,195 L498,203 L487,203 Z'}"></path>
                    </g>
                </g>
            </g>
        </svg>`)), _$sinUmd_43 `div.roll.overflow-hidden` (_$sinUmd_43 `div.slide.flex.relative
          will-change: left, transform, transition, height;

            & .tile {
              transition: opacity 250ms, height 250ms;
            }

            &.loss .tile, &.win .tile {
              opacity: 0.5;
            }

            &.loss .tile.result, &.win .tile.result {
              opacity: 1;
            }
          ` ({
                className: XRoulette.status + ' ' + (XRoulette.csgoMode ? '180' : '160'),
                style: `left: calc(${XRoulette.offset * 110}px + 50%);
              transform: translateX(calc(-${(XRoulette.idx) * 110 + 86 * XRoulette.r + 12}px)) translateZ(0);
              transition: height 250ms, transform 5000ms cubic-bezier(.15,.80,.20,.95) -${5000 * XRoulette.rollProgress}ms;`
            }, [...XRoulette.rollsInView.map(roll)]))]), previousResults, _$wagerForm_87({
                XRoulette
            }), _$sinUmd_43 `section.m-30
        display grid
        gap 20px
        grid-template-columns: repeat(auto-fit, 240px);
      ` (XRoulette.wagers.filter(w => w.you).map(_$wagerTile_88)), _$sinUmd_43 `section.details.flex.flex-row.items-center.ml-30` ([_$sinUmd_43 `img` ({
                src: '/images/provably-fair.svg'
            }), _$sinUmd_43 `p.text-sm.text-gray-200.ml-20` ([_$sinUmd_43 `a.underline.hover:text-yellow` ({
                href: '/provably-fair'
            }, 'Verify fairness'), ' ', _$sinUmd_43 `span.italic` ('(Advanced Users)')])])]), _$sinUmd_43 `section.leaderboard.rounded.bg-gray-500.p-20.flex.flex-col.sticky
      top 80
      grid-area: leaderboard;
      height calc(100vh - 60px - 40px)
    ` (XRoulette.csgoMode ? _$csgoLeaderboard_80(XRoulette.wagers, XRoulette) : _$leaderboard_83(XRoulette.wagers)), _$howToPlay_81.view])
        })

        function previousResults() {
            return _$sinUmd_43 `div.previous-rolls.m-30.flex.items-center` ([_$sinUmd_43 `p.uppercase.text-gray-200.font-body.font-bold.text-sm.mr-15.whitespace-no-wrap` ('Previous Rolls'), _$sinUmd_43 `div.previous-roll.flex.items-center.mr-15.overflow-hidden.flex-row.flex-wrap.h-30` ([...XRoulette.previousResults.map(resultPill), ]), _$icons_8.csgo `.ml-auto.mr-10;mt -2; w 18; h 18`, _$toggle_12({
                id: 'skin-toggle',
                checked: XRoulette.csgoMode,
                oninput() {
                    XRoulette.csgoMode = this.checked
                }
            })])

            function resultPill(r) {
                return _$sinUmd_43 `div.mr-5.h-30.bg-gray-500.rounded-full.items-center.px-15.font-body.text-sm.font-medium.whitespace-no-wrap
      line-height: 30px;
    ` ({
                    className: r >= 2 ? 'text-green' : 'text-gray-200'
                }, 'x ' + r.toFixed(2))
            }
        }

        function roll({
            key, multiplier, result, x, i
        }) {
            const hasWager = XRoulette.wagersCumsum.cumsum(Math.round(multiplier * 100))
            return (XRoulette.csgoMode ? rollCsgo : rollNormal)({
                key,
                multiplier,
                result,
                x,
                i,
                hasWager
            })
        }

        function rollNormal({
            key, multiplier, result, x, hasWager
        }) {
            if (hasWager)
                return _$normal_86.win({
                    key,
                    multiplier,
                    result,
                    amount: hasWager.amount,
                        profit: hasWager.profit
                })
            return _$normal_86({
                key,
                result,
                multiplier
            })
        }

        function rollCsgo({
            key, multiplier, result, x, i, hasWager
        }) {
            const profit = hasWager == null ? Math.round(10 * multiplier) : hasWager.profit / 100
            const d = _$selectSkin_84({
                profit,
                x,
                i
            })
            if (multiplier === 1.00)
                return _$csgo_85.chicken({
                    key,
                    multiplier
                })
            if (hasWager)
                return (XRoulette.csgoMode ? _$csgo_85 : _$normal_86).win({
                    key,
                    multiplier,
                    result,
                    amount: hasWager.amount,
                        profit: hasWager.profit,
                        d
                })
            if (XRoulette.wagersCumsum.length && !hasWager)
                return _$csgo_85.chicken({
                    key,
                    multiplier
                })
            return (XRoulette.csgoMode ? _$csgo_85 : _$normal_86)({
                key,
                result,
                multiplier,
                d
            })
        }

        function progress({
            progress, status
        }) {
            var children
            switch (status) {
                case 'waiting':
                    children = [_$sinUmd_43 `p.absolute.ml-10.left-0.right-0.font-body.font-bold.text-gray-100.uppercase.text-xs` ('Place your coins!'), _$fastText_6(() => `Rolling in ${(XRoulette.timeToRoll / 1000).toFixed(2)}s`)
                        `p.absolute.m-auto.left-0.right-0.w-120.text-center.font-body.font-bold.text-gray-100.uppercase.text-sm.font-numeric`, _$sinUmd_43 `div.progress.h-20.rounded-sm.w-0
          background: rgba(255, 176, 25, 0.5);
          animation ${XRoulette.timeToRoll}ms linear {
            from {
              width: ${100 - XRoulette.waitProgress * 100}%;
            }

            to {
              width: 0%;
            }
          }
        `
                    ]
                    break
                case 'rolling':
                    children = [_$sinUmd_43 `p.absolute.m-auto.left-0.right-0.w-80.text-center.font-body.font-bold.text-gray-100.uppercase.text-sm` ('Rolling...'), _$sinUmd_43 `div.rolling` (), _$sinUmd_43 `div.progress.h-20.rounded-sm.w-1
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 4px,
            var(--color-gray-400) 4px,
            var(--color-gray-400) 8px
          );
          background-size: 200% 200%;
          animation: slide-background 30s linear infinite;

          @keyframes slide-background {
            100% {
              background-position: 100% 100%;
            }
          }
        `]
                    break
                case 'win':
                    children = [_$sinUmd_43 `p.absolute.m-auto.left-0.right-0.w-80.text-center.font-body.font-bold.text-gray-100.uppercase.text-sm` ('You win!'), _$sinUmd_43 `div.progress.h-20.rounded-sm.w-1
          background: rgba(76, 201, 20, .5);
        `]
                    break
                case 'loss':
                    children = [_$sinUmd_43 `p.absolute.m-auto.left-0.right-0.w-140.text-center.font-body.font-bold.text-gray-100.uppercase.text-sm` ('Maybe next round'), _$sinUmd_43 `div.progress.h-20.rounded-sm.w-1
          background: rgba(47, 52, 69, .7);
        `]
                    break
                default:
                    children = []
            }
            return _$sinUmd_43 `div.progress-bar.h-30.bg-gray-800.w-auto.rounded.m-20.mt-0.flex.items-center.relative.p-5
  ` (children)
        }
    });
    var _$termsAndConditions_79 = createModuleFactory(function(module, exports) {;;
        module.exports = _$sinUmd_43(() => _$sinUmd_43 `section.mx-auto.font-body.text-gray-200.text-base.leading-snug.p-50
  max-width 750px
` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.mb-10` ('Terms and Conditions'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.mb-30` ('Last updated: June 10, 2020'), _$sinUmd_43 `p` (['Please read these terms and conditions carefully before using Our Service.', _$sinUmd_43 `br`, 'Rollbit.com is operated by PENGWINS N.V. (Registration Number 152488), has its office registered in Abraham de Veerstraat 9, Willemstad, Curacao']), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Interpretation and Definitions'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Interpretation'), _$sinUmd_43 `p` (['The words of which the initial letter is capitalized have meanings defined under the following conditions.', _$sinUmd_43 `br`, 'The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.']), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Definitions'), _$sinUmd_43 `p` (['For the purposes of these Terms and Conditions:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Account'), ' means a unique account created for You to access our Service or parts of our Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Company'), ' (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to PENGWINS N.V.,']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Country'), ' refers to: Curacao']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Coins'), ' refer to the funds/credits offered for sale on the website.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Orders'), ' mean a request by You to purchase Coins from Us.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Service'), ' refers to the Website.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Terms and Conditions'), ' (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Third-party Social Media Service'), ' rmeans any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Website'), ' refers to rollbit.com, accessible from PENGWINS N.V.,']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('You'), ' means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.'])])]), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Acknowledgement'), _$sinUmd_43 `p` ('These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.'), _$sinUmd_43 `p` ('Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.'), _$sinUmd_43 `p` ('By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.'), _$sinUmd_43 `p` ('By accessing or using the Services You confirm to be 18 years or older. If You are not 18 years or older You may not access the Service.'), _$sinUmd_43 `p` ('Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Grant of License'), _$sinUmd_43 `p` ('We grant You a non-exclusive, personal, non-transferable right to use Our Service on any device able to connect the internet in your possession. All Games and Services will be only available online on the Website.'), _$sinUmd_43 `p` ('The Service is only for Adults, therefore Minors below the age of 18 are not permitted to access the Website or use any Services on the Website. We do not allow usage below the age of 18, even if it is allowed under Your jurisdiction.'), _$sinUmd_43 `p` ('You shall notify Us without delay upon becoming aware that and unauthorized person (every person, except the account owner is unauthorized), was on your account and make sure, that this shall not happen again. If no notice is sent right away, We shall see it as violation of our Terms of Service and may terminate your Account without notice or delay.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Placing Orders for Coins'), _$sinUmd_43 `p` ('By placing an Order for Coins through the Service, You warrant that You legally capable of entering into binding contracts.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Your Information'), _$sinUmd_43 `p` ('If You wish to place an Order for Coins available on the Service, You may be asked to supply certain information relevant to Your Order including, without limitation, Your credit card number, the expiration date of Your credit card and Your billing address.'), _$sinUmd_43 `p` ('You represent and warrant that: (i) You have the legal right to use any credit or debit card(s) or other payment method(s) in connection with any Order; and that (ii) the information You supply to us is true, correct and complete and you are at the age of 18 or older.'), _$sinUmd_43 `p` ('By submitting such information, You grant us the right to provide the information to payment processing third parties for purposes of facilitating the completion of Your Order.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Order Cancellation'), _$sinUmd_43 `p` ('We reserve the right to refuse or cancel Your Order at any time for certain reasons including but not limited to:'), _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('Coins availability'), _$sinUmd_43 `li` ('Errors in the description or prices for Coins'), _$sinUmd_43 `li` ('Errors in Your Order')]), _$sinUmd_43 `p` ('We reserve the right to refuse or cancel Your Order if fraud or an unauthorized or illegal transaction is suspected.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Your Order Cancellation Rights'), _$sinUmd_43 `p` ('Any Coins you purchase can only be returned in accordance with these Terms and Conditions and Our Returns Policy.'), _$sinUmd_43 `p` ('Our Returns Policy forms a part of these Terms and Conditions. Please read our Returns Policy to learn more about your right to cancel Your Order.'), _$sinUmd_43 `p` ('Your right to cancel an Order only applies to Coins that are returned in the same condition as You received them. You should also include all of the products instructions and documents. Coins that are partially used or not in the same condition as You received them or are used in any way will not be refunded. You should therefore take reasonable care of the purchased Coins while they are in Your possession.'), _$sinUmd_43 `p` ('We will reimburse You no later than 14 days from the day on which We receive Your order cancellation notice. We will use the same means of payment as You used for the Order, and You will not incur any fees for such reimbursement.'), _$sinUmd_43 `p` ('You will not have any right to cancel an Order for the supply of any of the following Coins:'), _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('The supply of Coins which are, after delivery, according to their nature, inseparably mixed with other items.'), _$sinUmd_43 `li` ('The supply of digital content which is not supplied on a tangible medium if the performance has begun with Your prior express consent and You have acknowledged Your loss of cancellation right.')]), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Availability, Errors and Inaccuracies'), _$sinUmd_43 `p` ('We are constantly updating Our offerings of Coins on the Service. The Coins available on Our Service may be mispriced, described inaccurately, or unavailable, and We may experience delays in updating information regarding our Coins on the Service and in Our advertising on other websites.'), _$sinUmd_43 `p` ('We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Prices Policy'), _$sinUmd_43 `p` ('The Company reserves the right to revise its prices at any time prior to accepting an Order.'), _$sinUmd_43 `p` ('The prices quoted may be revised by the Company subsequent to accepting an Order in the event of any occurrence affecting delivery caused by government action, variation in customs duties, increased shipping charges, higher foreign exchange costs and any other matter beyond the control of the Company. In that event, You will have the right to cancel Your Order.'), _$sinUmd_43 `p` ('For further information investigate our Privacy Policy.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Payments'), _$sinUmd_43 `p` ('All Coins purchased are subject to a one-time payment. Payment can be made through various payment methods we have available, such as Visa, MasterCard, Affinity Card, American Express cards or online payment methods (PayPal, for example).'), _$sinUmd_43 `p` ('Payment cards (credit cards or debit cards) are subject to validation checks and authorization by Your card issuer. If we do not receive the required authorization, We will not be liable for any delay or non-delivery of Your Order.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('User Accounts'), _$sinUmd_43 `p` ('When You create an account with Us, You must provide Us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.'), _$sinUmd_43 `p` ('You are responsible for safeguarding the password that You use to access the Service and for any activities or actions under Your password, whether Your password is with Our Service or a Third-Party Social Media Service.'), _$sinUmd_43 `p` ('You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.'), _$sinUmd_43 `p` ('You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.'), _$sinUmd_43 `p` ('You may not sell your account or give it any other natural or juristically person. If you give your account to someone else this may result in immediate termination of Your account on Our Service.'), _$sinUmd_43 `p` ('We may ask for additional Information’s according to our AML/KYC Policy for KYC purposes or for legal purposes (Money laundering prevention)'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Intellectual Property'), _$sinUmd_43 `p` ('The Service and its original content (excluding Content provided by You or other users), features and functionality are and will remain the exclusive property of the Company and its licensors.'), _$sinUmd_43 `p` ('The Service is protected by copyright, trademark, and other laws of both the Country and foreign countries.'), _$sinUmd_43 `p` ('Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of the Company.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Links to Other Websites'), _$sinUmd_43 `p` ('Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.'), _$sinUmd_43 `p` ('The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.'), _$sinUmd_43 `p` ('We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Termination'), _$sinUmd_43 `p` ('We may terminate or suspend Your Account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.'), _$sinUmd_43 `p` ('Upon termination, Your right to use the Service will cease immediately. If You wish to terminate Your Account, You may simply discontinue using the Service.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Limitation of Liability'), _$sinUmd_43 `p` ('Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven\'t purchased anything through the Service.'), _$sinUmd_43 `p` ('To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.'), _$sinUmd_43 `p` ('Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party\'s liability will be limited to the greatest extent permitted by law.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('"AS IS" and "AS AVAILABLE" Disclaimer'), _$sinUmd_43 `p` ('The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Shareholders and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.'), _$sinUmd_43 `p` ('Without limiting the foregoing, neither the Company nor any of the company\'s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the  content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.'), _$sinUmd_43 `p` ('Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Governing Law'), _$sinUmd_43 `p` ('The laws of the Country (Curacao), excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.'), _$sinUmd_43 `p` ('These services shall be provided ,governed, and enforced in accordance with the laws of the state Curacao, without regard to its conflict of laws rules. It´s courts shall have exclusive jurisdiction.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Disputes Resolution'), _$sinUmd_43 `p` ('If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('For European Union (EU) Users'), _$sinUmd_43 `p` ('If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident in.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('United States Legal Compliance'), _$sinUmd_43 `p` ('You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a “terrorist supporting” country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Severability and Waiver'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Severability'), _$sinUmd_43 `p` ('If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Waiver'), _$sinUmd_43 `p` ('Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Terms shall not effect a party\'s ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Translation Interpretation'), _$sinUmd_43 `p` ('These Terms and Conditions may have been translated if We have made them available to You on our Service.'), _$sinUmd_43 `p` ('You agree that the original English text shall prevail in the case of a dispute.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Changes to These Terms and Conditions'), _$sinUmd_43 `p` ('We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 14 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.'), _$sinUmd_43 `p` ('By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Gaming License'), _$sinUmd_43 `p.mb-10` ('Our gaming license may be viewed using the link below:'), _$license_9, _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Contact Us'), _$sinUmd_43 `p` ('If you have any questions about these Terms and Conditions, You can contact us:'), _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('By email: support@rollbit.com'), _$sinUmd_43 `li` ('By phone (09:00 - 16:00 UTC): +44 1847 557857')])]))
    });
    var _$privacyPolicy_76 = createModuleFactory(function(module, exports) {;
        module.exports = _$sinUmd_43(() => _$sinUmd_43 `section.mx-auto.font-body.text-gray-200.text-base.leading-snug.p-50
  max-width 750px
` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.mb-10` ('Privacy Policy'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.mb-30` ('Last updated: June 10, 2020'), _$sinUmd_43 `p` (['This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.', _$sinUmd_43 `br`, 'We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.', _$sinUmd_43 `br`, 'Rollbit.com is operated by PENGWINS N.V. (Registration Number 152488), has its office registered in Abraham de Veerstraat 9, Willemstad, Curacao', _$sinUmd_43 `br`]), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Interpretation and Definitions'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Interpretation'), _$sinUmd_43 `p` (['The words of which the initial letter is capitalized have meanings defined under the following conditions.', _$sinUmd_43 `br`, 'The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.']), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Definitions'), _$sinUmd_43 `p` (['For the purposes of this Privacy Policy:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('You'), ' means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.', _$sinUmd_43 `br`, 'Under GDPR (General Data Protection Regulation), You can be referred to as the Data Subject or as the User as you are the individual using the Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Company'), ' (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to PENGWINS N.V.,', _$sinUmd_43 `br`, 'For the purpose of the GDPR, the Company is the Data Controller.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Account'), ' means a unique account created for You to access our Service or parts of our Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Website'), ' refers to rollbit.com, accessible from PENGWINS N.V.,']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Country'), ' refers to: Curacao']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Service Provider'), ' means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.', _$sinUmd_43 `br`, 'For the purpose of the GDPR, Service Providers are considered Data Processors.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Third-party Social Media Service'), ' refers to any website or any social network website through which a User can log in or create an account to use the Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Personal Data'), ' is any information that relates to an identified or identifiable individual.', _$sinUmd_43 `br`, 'For the purposes for GDPR, Personal Data means any information relating to You such as a name, an identification number, location data, online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Cookies'), ' are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Usage Data'), ' refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Data Controller'), ', for the purposes of the GDPR (General Data Protection Regulation), refers to the Company as the legal person which alone or jointly with others determines the purposes and means of the processing of Personal Data.'])])]), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Collecting and Using Your Personal Data'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Types of Data Collected'), _$sinUmd_43 `h4.text-base.font-bold.text-gray-100.my-10` ('Personal Data'), _$sinUmd_43 `p` (['While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('Email address'), _$sinUmd_43 `li` ('First name and last name'), _$sinUmd_43 `li` ('Phone number'), _$sinUmd_43 `li` ('Address, State, Province, ZIP/Postal code, City'), _$sinUmd_43 `li` ('Bank account information in order to pay for products and/or services within the Service'), _$sinUmd_43 `li` ('Usage Data')]), 'When You pay for a product and/or a service via bank transfer, We may ask You to provide information to facilitate this transaction and to verify Your identity. Such information may include, without limitation:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('Date of birth'), _$sinUmd_43 `li` ('Passport or National ID card'), _$sinUmd_43 `li` ('Bank card statement'), _$sinUmd_43 `li` ('Other information linking You to an address')])]), _$sinUmd_43 `h4.text-base.font-bold.text-gray-100.my-10` ('Usage Data'), _$sinUmd_43 `p` (['Usage Data is collected automatically when using the Service.', _$sinUmd_43 `br`, 'Usage Data may include information such as Your Device\'s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.', _$sinUmd_43 `br`, 'When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.', _$sinUmd_43 `br`, 'We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.']), _$sinUmd_43 `h4.text-base.font-bold.text-gray-100.my-10` ('Tracking Technologies and Cookies'), _$sinUmd_43 `p` (['We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.', _$sinUmd_43 `br`, 'You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service.', _$sinUmd_43 `br`, 'Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.', _$sinUmd_43 `br`, 'We use both session and persistent Cookies for the purposes set out below:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Necessary / Essential Cookies'), _$sinUmd_43 `br`, 'Type: Session Cookies', _$sinUmd_43 `br`, 'Administered by: Us', _$sinUmd_43 `br`, 'Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Cookies Policy / Notice Acceptance Cookies'), _$sinUmd_43 `br`, 'Type: Persistent Cookies', _$sinUmd_43 `br`, 'Administered by: Us', _$sinUmd_43 `br`, 'Purpose: These Cookies identify if users have accepted the use of cookies on the Website.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Functionality Cookies'), _$sinUmd_43 `br`, 'Type: Persistent Cookies', _$sinUmd_43 `br`, 'Administered by: Us', _$sinUmd_43 `br`, 'Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('Tracking and Performance Cookies'), _$sinUmd_43 `br`, 'Type: Persistent Cookies', _$sinUmd_43 `br`, 'Administered by: Third-Parties', _$sinUmd_43 `br`, 'Purpose: These Cookies are used to track information about traffic to the Website and how users use the Website. The information gathered via these Cookies may directly or indirectly identify you as an individual visitor. This is because the information collected is typically linked to a pseudonymous identifier associated with the device you use to access the Website. We may also use these Cookies to test new advertisements, pages, features or new functionality of the Website to see how our users react to them.'])]), 'For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy.', _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Use of Your Personal Data'), _$sinUmd_43 `p` (['The Company may use Personal Data for the following purposes:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('To provide and maintain our Service'), ', including to monitor the usage of our Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('To manage Your Account'), ': to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('For the performance of a contract'), ': the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('To contact You'), ': To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application\'s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('To provide You'), ' with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('To manage Your requests'), ': To attend and manage Your requests to Us.'])]), 'We may share your personal information in the following situations:', _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('With Service Providers'), ': We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to show advertisements to You to help support and maintain Our Service, to contact You, to advertise on third party websites to You after You visited our Service or for payment processing.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('For Business transfers'), ': We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of our business to another company.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('With Major Shareholder'), ': We may share Your information with Our major Shareholder, in which case we will require those major Shareholder to honor this Privacy Policy. Major Shareholder include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('With Business partners'), ': We may share Your information with Our business partners to offer You certain products, services or promotions.']), _$sinUmd_43 `li` ([_$sinUmd_43 `strong` ('With other users'), ': when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see You name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.'])])]), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Retention of Your Personal Data'), _$sinUmd_43 `p` (['The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.', _$sinUmd_43 `br`, 'The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.']), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Transfer of Your Personal Data'), _$sinUmd_43 `p` (['Your information, including Personal Data, is processed at the Company\'s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.', _$sinUmd_43 `br`, 'Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.', _$sinUmd_43 `br`, 'The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.']), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Disclosure of Your Personal Data'), _$sinUmd_43 `h4.text-base.font-bold.text-gray-100.my-10` ('Business Transactions'), _$sinUmd_43 `p` ('If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.'), _$sinUmd_43 `h4.text-base.font-bold.text-gray-100.my-10` ('Law enforcement'), _$sinUmd_43 `p` ('Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).'), _$sinUmd_43 `h4.text-base.font-bold.text-gray-100.my-10` ('Other legal requirements'), _$sinUmd_43 `p` ('The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:'), _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('Comply with a legal obligation'), _$sinUmd_43 `li` ('Protect and defend the rights or property of the Company'), _$sinUmd_43 `li` ('Prevent or investigate possible wrongdoing in connection with the Service'), _$sinUmd_43 `li` ('Protect the personal safety of Users of the Service or the public'), _$sinUmd_43 `li` ('Protect against legal liability')]), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Security of Your Personal Data'), _$sinUmd_43 `p` ('The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.')]), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.my-30` ('Detailed Information on the Processing of Your Personal Data'), _$sinUmd_43 `p` ('Service Providers have access to Your Personal Data only to perform their tasks on Our behalf and are obligated not to disclose or use it for any other purpose.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Analytics'), _$sinUmd_43 `p` ('We may use third-party Service providers to monitor and analyze the use of our Service.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Google Analytics'), _$sinUmd_43 `p` ('Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualise and personalise the ads of its own advertising network.'), _$sinUmd_43 `p` ('You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js, analytics.js and dc.js) from sharing information with Google Analytics about visits activity.'), _$sinUmd_43 `p` ('For more information on the privacy practices of Google, please visit the Google Privacy Terms web page: ', link('https://policies.google.com/privacy')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Matomo'), _$sinUmd_43 `p` ('Matomo is a web analytics service. You can visit their Privacy Policy page here: ', link('https://matomo.org/privacy-policy')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Clicky'), _$sinUmd_43 `p` ('Clicky is a web analytics service. Read the Privacy Policy for Clicky here: ', link('https://clicky.com/terms')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Statcounter'), _$sinUmd_43 `p` ('Statcounter is a web traffic analysis tool. You can read the Privacy Policy for Statcounter here: ', link('https://statcounter.com/about/legal/')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Flurry Analytics'), _$sinUmd_43 `p` ('Flurry Analytics service is provided by Yahoo! Inc.'), _$sinUmd_43 `p` ('You can opt-out from Flurry Analytics service to prevent Flurry Analytics from using and sharing your information by visiting the Flurry\'s Opt-out page: ', link('https://developer.yahoo.com/flurry/end-user-opt-out/')), _$sinUmd_43 `p` ('For more information on the privacy practices and policies of Yahoo!, please visit their Privacy Policy page: ', link('https://policies.yahoo.com/xa/en/yahoo/privacy/index.htm')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Mixpanel'), _$sinUmd_43 `p` ('Mixpanel is provided by Mixpanel Inc.'), _$sinUmd_43 `p` ('You can prevent Mixpanel from using your information for analytics purposes by opting-out. To opt-out of Mixpanel service, please visit this page: ', link('https://mixpanel.com/optout/')), _$sinUmd_43 `p` ('For more information on what type of information Mixpanel collects, please visit the Terms of Use page of Mixpanel: ', link('https://mixpanel.com/terms/')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Unity Analytics'), _$sinUmd_43 `p` ('Unity Analytics is provided by Unity Technologies.'), _$sinUmd_43 `p` ('For more information on what type of information Unity Analytics collects, please visit their Privacy Policy page: ', link('https://unity3d.com/legal/privacy-policy')), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Email Marketing'), _$sinUmd_43 `p` ('We may use Your Personal Data to contact You with newsletters, marketing or promotional materials and other information that may be of interest to You. You may opt-out of receiving any, or all, of these communications from Us by following the unsubscribe link or instructions provided in any email We send or by contacting Us.'), _$sinUmd_43 `p` ('We may use Email Marketing Service Providers to manage and send emails to You.'), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Mailchimp'), _$sinUmd_43 `p` ('Mailchimp is an email marketing sending service provided by The Rocket Science Group LLC.'), _$sinUmd_43 `p` ('For more information on the privacy practices of Mailchimp, please visit their Privacy policy: ', link('https://mailchimp.com/legal/privacy/')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('Constant Contact'), _$sinUmd_43 `p` ('Constant Contact is an email marketing sending service provided by Constant Contact, Inc.'), _$sinUmd_43 `p` ('For more information on the privacy practices of Constant Contact, please visit their Privacy policy: ', link('https://www.constantcontact.com/forward/privacy-center')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('AWeber'), _$sinUmd_43 `p` ('AWeber is an email marketing sending service provided by AWeber Communications.'), _$sinUmd_43 `p` ('For more information on the privacy practices of AWeber, please visit their Privacy policy: ', link('https://www.aweber.com/privacy.htm')), _$sinUmd_43 `h3.text-lg.font-bold.text-gray-100.my-10` ('GetResponse'), _$sinUmd_43 `p` ('GetResponse is an email marketing sending service provided by GetResponse.'), _$sinUmd_43 `p` ('For more information on the privacy practices of GetResponse, please visit their Privacy policy: ', link('https://www.getresponse.com/legal/privacy.html')), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.my-30` ('GDPR Privacy'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Legal Basis for Processing Personal Data under GDPR'), _$sinUmd_43 `p` ('We may process Personal Data under the following conditions:'), _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('Consent: You have given Your consent for processing Personal Data for one or more specific purposes.'), _$sinUmd_43 `li` ('Performance of a contract: Provision of Personal Data is necessary for the performance of an agreement with You and/or for any pre-contractual obligations thereof.'), _$sinUmd_43 `li` ('Legal obligations: Processing Personal Data is necessary for compliance with a legal obligation to which the Company is subject.'), _$sinUmd_43 `li` ('Vital interests: Processing Personal Data is necessary in order to protect Your vital interests or of another natural person.'), _$sinUmd_43 `li` ('Public interests: Processing Personal Data is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Company.'), _$sinUmd_43 `li` ('Legitimate interests: Processing Personal Data is necessary for the purposes of the legitimate interests pursued by the Company.')]), _$sinUmd_43 `p` ('In any case, the Company will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.'), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Your Rights under the GDPR'), _$sinUmd_43 `p` ('The Company undertakes to respect the confidentiality of Your Personal Data and to guarantee You can exercise Your rights.'), _$sinUmd_43 `p` ('You have the right under this Privacy Policy, and by law if You are within the EU, to:'), _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('Request access to Your Personal Data. The right to access, update or delete the information We have on You. Whenever made possible, you can access, update or request deletion of Your Personal Data directly within Your account settings section. If you are unable to perform these actions yourself, please contact Us to assist You. This also enables You to receive a copy of the Personal Data We hold about You.'), _$sinUmd_43 `li` ('Request correction of the Personal Data that We hold about You. You have the right to to have any incomplete or inaccurate information We hold about You corrected.'), _$sinUmd_43 `li` ('Object to processing of Your Personal Data. This right exists where We are relying on a legitimate interest as the legal basis for Our processing and there is something about Your particular situation, which makes You want to object to our processing of Your Personal Data on this ground. You also have the right to object where We are processing Your Personal Data for direct marketing purposes.'), _$sinUmd_43 `li` ('Request erasure of Your Personal Data. You have the right to ask Us to delete or remove Personal Data when there is no good reason for Us to continue processing it.'), _$sinUmd_43 `li` ('Request the transfer of Your Personal Data. We will provide to You, or to a third-party You have chosen, Your Personal Data in a structured, commonly used, machine-readable format. Please note that this right only applies to automated information which You initially provided consent for Us to use or where We used the information to perform a contract with You.'), _$sinUmd_43 `li` ('Withdraw Your consent. You have the right to withdraw Your consent on using your Personal Data. If You withdraw Your consent, We may not be able to provide You with access to certain specific functionalities of the Service.')]), _$sinUmd_43 `h2.text-xl.font-extrabold.text-gray-100.my-30` ('Exercising of Your GDPR Data Protection Rights'), _$sinUmd_43 `p` ('You may exercise Your rights of access, rectification, cancellation and opposition by contacting Us. Please note that we may ask You to verify Your identity before responding to such requests. If You make a request, We will try our best to respond to You as soon as possible.'), _$sinUmd_43 `p` ('You have the right to complain to a Data Protection Authority about Our collection and use of Your Personal Data. For more information, if You are in the European Economic Area (EEA), please contact Your local data protection authority in the EEA.'), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.my-30` ('Children\'s Privacy'), _$sinUmd_43 `p` ('Our Service does not address anyone under the age of 18. You must be at least 18 years or older in order to use our services, we do not offer our services to minors. We do not knowingly collect personally identifiable information from anyone under the age of 18. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 18 without verification of parental consent, We take steps to remove that information from Our servers as well as taking active steps to ban this user from our services and website.'), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.my-30` ('Links to Other Websites'), _$sinUmd_43 `p` ('Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party\'s site. We strongly advise You to review the Privacy Policy of every site You visit.'), _$sinUmd_43 `p` ('We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.'), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.my-30` ('Changes to this Privacy Policy'), _$sinUmd_43 `p` ('We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.'), _$sinUmd_43 `p` ('We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.'), _$sinUmd_43 `p` ('You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.'), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.my-30` ('Contact Us'), _$sinUmd_43 `p` ('If you have any questions about this Privacy Policy, You can contact us:'), _$sinUmd_43 `ul.list-disc.pl-20.my-5` ([_$sinUmd_43 `li` ('By email: support@rollbit.com'), _$sinUmd_43 `li` ('By phone (09:00 - 16:00 UTC): +44 1847 557857')])]))

        function link(url) {
            return _$sinUmd_43 `a.underline.hover:text-yellow` ({
                href: url,
                target: '_blank',
                rel: 'noreferrer'
            }, url)
        }
    });
    var _$main_45 = createModuleFactory(function(module, exports) {
        (function(setImmediate, clearImmediate) {
            var nextTick = _$browser_36.nextTick;
            var apply = Function.prototype.apply;
            var slice = Array.prototype.slice;
            var immediateIds = {};
            var nextImmediateId = 0;
            exports.setTimeout = function() {
                return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
            };
            exports.setInterval = function() {
                return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
            };
            exports.clearTimeout = exports.clearInterval = function(timeout) {
                timeout.close();
            };

            function Timeout(id, clearFn) {
                this._id = id;
                this._clearFn = clearFn;
            }
            Timeout.prototype.unref = Timeout.prototype.ref = function() {};
            Timeout.prototype.close = function() {
                this._clearFn.call(window, this._id);
            };
            exports.enroll = function(item, msecs) {
                clearTimeout(item._idleTimeoutId);
                item._idleTimeout = msecs;
            };
            exports.unenroll = function(item) {
                clearTimeout(item._idleTimeoutId);
                item._idleTimeout = -1;
            };
            exports._unrefActive = exports.active = function(item) {
                clearTimeout(item._idleTimeoutId);
                var msecs = item._idleTimeout;
                if (msecs >= 0) {
                    item._idleTimeoutId = setTimeout(function onTimeout() {
                        if (item._onTimeout)
                            item._onTimeout();
                    }, msecs);
                }
            };
            exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
                var id = nextImmediateId++;
                var args = arguments.length < 2 ? false : slice.call(arguments, 1);
                immediateIds[id] = true;
                nextTick(function onNextTick() {
                    if (immediateIds[id]) {
                        if (args) {
                            fn.apply(null, args);
                        } else {
                            fn.call(null);
                        }
                        exports.clearImmediate(id);
                    }
                });
                return id;
            };
            exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
                delete immediateIds[id];
            };
        }).call(this, _$main_45({}).setImmediate, _$main_45({}).clearImmediate)
    });
    var _$browser_36 = {};
    var process = _$browser_36 = {};
    var cachedSetTimeout;
    var cachedClearTimeout;

    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }

    function defaultClearTimeout() {
            throw new Error('clearTimeout has not been defined');
        }
        (function() {
            try {
                if (typeof setTimeout === 'function') {
                    cachedSetTimeout = setTimeout;
                } else {
                    cachedSetTimeout = defaultSetTimout;
                }
            } catch (e) {
                cachedSetTimeout = defaultSetTimout;
            }
            try {
                if (typeof clearTimeout === 'function') {
                    cachedClearTimeout = clearTimeout;
                } else {
                    cachedClearTimeout = defaultClearTimeout;
                }
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout;
            }
        }())

    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }

    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;

    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }

    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };

    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = '';
    process.versions = {};

    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
        return []
    }
    process.binding = function(name) {
        throw new Error('process.binding is not supported');
    };
    process.cwd = function() {
        return '/'
    };
    process.chdir = function(dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function() {
        return 0;
    };
    var _$sinUmd_43 = {
        exports: {}
    };
    (function(global, setImmediate) {
        (function(global, factory) {
            typeof _$sinUmd_43.exports === 'object' && "object" !== 'undefined' ? _$sinUmd_43.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self,
                global.s = factory());
        }(this, (function() {
            'use strict';

            function Vnode(tag, key, attrs0, children0, text, dom) {
                return {
                    tag: tag,
                    key: key,
                    attrs: attrs0,
                    children: children0,
                    text: text,
                    dom: dom,
                    domSize: undefined,
                    state: undefined,
                    events: undefined,
                    instance: undefined
                }
            }
            Vnode.normalize = function(node) {
                if (Array.isArray(node)) {
                    return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
                }
                if (node == null || typeof node === "boolean") {
                    return null
                }
                if (typeof node === "object") {
                    return node
                }
                return Vnode("#", undefined, undefined, String(node), undefined, undefined)
            };
            Vnode.normalizeChildren = function(input) {
                var children0 = [];
                if (input.length) {
                    var isKeyed = input[0] != null && input[0].key != null;
                    for (var i = 1; i < input.length; i++) {
                        if ((input[i] != null && input[i].key != null) !== isKeyed) {
                            throw new TypeError(isKeyed && (input[i] != null || typeof input[i] === "boolean") ? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole." : "In fragments, vnodes must either all have keys or none have keys.")
                        }
                    }
                    for (var i = 0; i < input.length; i++) {
                        children0[i] = Vnode.normalize(input[i]);
                    }
                }
                return children0
            };
            var hyperscriptVnode = function() {
                var arguments$1 = arguments;
                var attrs1 = arguments[this],
                    start = this + 1,
                    children1;
                if (attrs1 == null) {
                    attrs1 = {};
                } else if (typeof attrs1 !== "object" || attrs1.tag != null || Array.isArray(attrs1)) {
                    attrs1 = {};
                    start = this;
                }
                if (arguments.length === start + 1) {
                    children1 = arguments[start];
                    if (!Array.isArray(children1)) {
                        children1 = [children1];
                    }
                } else {
                    children1 = [];
                    while (start < arguments.length) {
                        children1.push(arguments$1[start++]);
                    }
                }
                return Vnode("", attrs1.key, attrs1, children1)
            };
            var hasOwn = {}.hasOwnProperty;
            var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g;
            var selectorCache = {};

            function isEmpty(object) {
                for (var key in object) {
                    if (hasOwn.call(object, key)) {
                        return false
                    }
                }
                return true
            }

            function compileSelector(selector) {
                var match, tag = "div",
                    classes = [],
                    attrs = {};
                while (match = selectorParser.exec(selector)) {
                    var type = match[1],
                        value = match[2];
                    if (type === "" && value !== "") {
                        tag = value;
                    } else if (type === "#") {
                        attrs.id = value;
                    } else if (type === ".") {
                        classes.push(value);
                    } else if (match[3][0] === "[") {
                        var attrValue = match[6];
                        if (attrValue) {
                            attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\");
                        }
                        if (match[4] === "class") {
                            classes.push(attrValue);
                        } else {
                            attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true;
                        }
                    }
                }
                if (classes.length > 0) {
                    attrs.className = classes.join(" ");
                }
                return selectorCache[selector] = {
                    tag: tag,
                    attrs: attrs
                }
            }

            function execSelector(state, vnode) {
                var attrs = vnode.attrs;
                var children = Vnode.normalizeChildren(vnode.children);
                var hasClass = hasOwn.call(attrs, "class");
                var className = hasClass ? attrs.class : attrs.className;
                vnode.tag = state.tag;
                vnode.attrs = null;
                vnode.children = undefined;
                if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
                    var newAttrs = {};
                    for (var key in attrs) {
                        if (hasOwn.call(attrs, key)) {
                            newAttrs[key] = attrs[key];
                        }
                    }
                    attrs = newAttrs;
                }
                for (var key in state.attrs) {
                    if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)) {
                        attrs[key] = state.attrs[key];
                    }
                }
                if (className != null || state.attrs.className != null) {
                    attrs.className = className != null ? state.attrs.className != null ? String(state.attrs.className) + " " + String(className) : className : state.attrs.className != null ? state.attrs.className : null;
                }
                if (hasClass) {
                    attrs.class = null;
                }
                for (var key in attrs) {
                    if (hasOwn.call(attrs, key) && key !== "key") {
                        vnode.attrs = attrs;
                        break
                    }
                }
                if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
                    vnode.text = children[0].children;
                } else {
                    vnode.children = children;
                }
                return vnode
            }

            function hyperscript(selector) {
                if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
                    throw Error("The selector must be either a string or a component.");
                }
                var vnode = hyperscriptVnode.apply(1, arguments);
                if (typeof selector === "string") {
                    vnode.children = Vnode.normalizeChildren(vnode.children);
                    if (selector !== "[") {
                        return execSelector(selectorCache[selector] || compileSelector(selector), vnode)
                    }
                }
                vnode.tag = selector;
                return vnode
            }
            hyperscript.trust = function(html) {
                if (html == null) {
                    html = "";
                }
                return Vnode("<", undefined, undefined, html, undefined, undefined)
            };
            hyperscript.fragment = function() {
                var vnode2 = hyperscriptVnode.apply(0, arguments);
                vnode2.tag = "[";
                vnode2.children = Vnode.normalizeChildren(vnode2.children);
                return vnode2
            };
            var PromisePolyfill = function(executor) {
                if (!(this instanceof PromisePolyfill)) {
                    throw new Error("Promise must be called with 'new'.")
                }
                if (typeof executor !== "function") {
                    throw new TypeError("executor must be a function.")
                }
                var self = this,
                    resolvers = [],
                    rejectors = [],
                    resolveCurrent = handler(resolvers, true),
                    rejectCurrent = handler(rejectors, false);
                var instance = self._instance = {
                    resolvers: resolvers,
                    rejectors: rejectors
                };
                var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout;

                function handler(list, shouldAbsorb) {
                    return function execute(value) {
                        var then;
                        try {
                            if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof(then = value.then) === "function") {
                                if (value === self) {
                                    throw new TypeError("Promise can't be resolved with itself.")
                                }
                                executeOnce(then.bind(value));
                            } else {
                                callAsync(function() {
                                    if (!shouldAbsorb && list.length === 0) {
                                        console.error("Possible unhandled promise rejection:", value);
                                    }
                                    for (var i = 0; i < list.length; i++) {
                                        list[i](value);
                                    }
                                    resolvers.length = 0,
                                        rejectors.length = 0;
                                    instance.state = shouldAbsorb;
                                    instance.retry = function() {
                                        execute(value);
                                    };
                                });
                            }
                        } catch (e) {
                            rejectCurrent(e);
                        }
                    }
                }

                function executeOnce(then) {
                    var runs = 0;

                    function run(fn) {
                        return function(value) {
                            if (runs++ > 0) {
                                return
                            }
                            fn(value);
                        }
                    }
                    var onerror = run(rejectCurrent);
                    try {
                        then(run(resolveCurrent), onerror);
                    } catch (e) {
                        onerror(e);
                    }
                }
                executeOnce(executor);
            };
            PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
                var self = this,
                    instance = self._instance;

                function handle(callback, list, next, state) {
                    list.push(function(value) {
                        if (typeof callback !== "function") {
                            next(value);
                        } else {
                            try {
                                resolveNext(callback(value));
                            } catch (e) {
                                if (rejectNext) {
                                    rejectNext(e);
                                }
                            }
                        }
                    });
                    if (typeof instance.retry === "function" && state === instance.state) {
                        instance.retry();
                    }
                }
                var resolveNext, rejectNext;
                var promise = new PromisePolyfill(function(resolve, reject) {
                    resolveNext = resolve,
                        rejectNext = reject;
                });
                handle(onFulfilled, instance.resolvers, resolveNext, true),
                    handle(onRejection, instance.rejectors, rejectNext, false);
                return promise
            };
            PromisePolyfill.prototype.catch = function(onRejection) {
                return this.then(null, onRejection)
            };
            PromisePolyfill.prototype.finally = function(callback) {
                return this.then(function(value) {
                    return PromisePolyfill.resolve(callback()).then(function() {
                        return value
                    })
                }, function(reason) {
                    return PromisePolyfill.resolve(callback()).then(function() {
                        return PromisePolyfill.reject(reason);
                    })
                })
            };
            PromisePolyfill.resolve = function(value) {
                if (value instanceof PromisePolyfill) {
                    return value
                }
                return new PromisePolyfill(function(resolve) {
                    resolve(value);
                })
            };
            PromisePolyfill.reject = function(value) {
                return new PromisePolyfill(function(resolve, reject) {
                    reject(value);
                })
            };
            PromisePolyfill.all = function(list) {
                return new PromisePolyfill(function(resolve, reject) {
                    var total = list.length,
                        count = 0,
                        values = [];
                    if (list.length === 0) {
                        resolve([]);
                    } else {
                        for (var i = 0; i < list.length; i++) {
                            (function(i) {
                                function consume(value) {
                                    count++;
                                    values[i] = value;
                                    if (count === total) {
                                        resolve(values);
                                    }
                                }
                                if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
                                    list[i].then(consume, reject);
                                } else {
                                    consume(list[i]);
                                }
                            })(i);
                        }
                    }
                })
            };
            PromisePolyfill.race = function(list) {
                return new PromisePolyfill(function(resolve, reject) {
                    for (var i = 0; i < list.length; i++) {
                        list[i].then(resolve, reject);
                    }
                })
            };
            if (typeof window !== "undefined") {
                if (typeof window.Promise === "undefined") {
                    window.Promise = PromisePolyfill;
                } else if (!window.Promise.prototype.finally) {
                    window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
                }
                var PromisePolyfill = window.Promise;
            } else if (typeof global !== "undefined") {
                if (typeof global.Promise === "undefined") {
                    global.Promise = PromisePolyfill;
                } else if (!global.Promise.prototype.finally) {
                    global.Promise.prototype.finally = PromisePolyfill.prototype.finally;
                }
                var PromisePolyfill = global.Promise;
            }
            var _13 = function($window) {
                var $doc = $window && $window.document;
                var currentRedraw;
                var nameSpace = {
                    svg: "http://www.w3.org/2000/svg",
                    math: "http://www.w3.org/1998/Math/MathML"
                };

                function getNameSpace(vnode3) {
                    return vnode3.attrs && vnode3.attrs.xmlns || nameSpace[vnode3.tag]
                }

                function checkState(vnode3, original) {
                    if (vnode3.state !== original) {
                        throw new Error("'vnode.state' must not be modified.")
                    }
                }

                function callHook(vnode3) {
                    var original = vnode3.state;
                    try {
                        return this.apply(original, arguments)
                    } finally {
                        checkState(vnode3, original);
                    }
                }

                function activeElement() {
                    try {
                        return $doc.activeElement
                    } catch (e) {
                        return null
                    }
                }

                function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
                    for (var i = start; i < end; i++) {
                        var vnode3 = vnodes[i];
                        if (vnode3 != null) {
                            createNode(parent, vnode3, hooks, ns, nextSibling);
                        }
                    }
                }

                function createNode(parent, vnode3, hooks, ns, nextSibling) {
                    var tag = vnode3.tag;
                    if (typeof tag === "string") {
                        vnode3.state = {};
                        if (vnode3.attrs != null) {
                            initLifecycle(vnode3.attrs, vnode3, hooks);
                        }
                        switch (tag) {
                            case "#":
                                createText(parent, vnode3, nextSibling);
                                break
                            case "<":
                                createHTML(parent, vnode3, ns, nextSibling);
                                break
                            case "[":
                                createFragment(parent, vnode3, hooks, ns, nextSibling);
                                break
                            default:
                                createElement(parent, vnode3, hooks, ns, nextSibling);
                        }
                    } else {
                        createComponent(parent, vnode3, hooks, ns, nextSibling);
                    }
                }

                function createText(parent, vnode3, nextSibling) {
                    vnode3.dom = $doc.createTextNode(vnode3.children);
                    insertNode(parent, vnode3.dom, nextSibling);
                }
                var possibleParents = {
                    caption: "table",
                    thead: "table",
                    tbody: "table",
                    tfoot: "table",
                    tr: "tbody",
                    th: "tr",
                    td: "tr",
                    colgroup: "table",
                    col: "colgroup"
                };

                function createHTML(parent, vnode3, ns, nextSibling) {
                    var match0 = vnode3.children.match(/^\s*?<(\w+)/im) || [];
                    var temp = $doc.createElement(possibleParents[match0[1]] || "div");
                    if (ns === "http://www.w3.org/2000/svg") {
                        temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode3.children + "</svg>";
                        temp = temp.firstChild;
                    } else {
                        temp.innerHTML = vnode3.children;
                    }
                    vnode3.dom = temp.firstChild;
                    vnode3.domSize = temp.childNodes.length;
                    vnode3.instance = [];
                    var fragment = $doc.createDocumentFragment();
                    var child;
                    while (child = temp.firstChild) {
                        vnode3.instance.push(child);
                        fragment.appendChild(child);
                    }
                    insertNode(parent, fragment, nextSibling);
                }

                function createFragment(parent, vnode3, hooks, ns, nextSibling) {
                    var fragment = $doc.createDocumentFragment();
                    if (vnode3.children != null) {
                        var children3 = vnode3.children;
                        createNodes(fragment, children3, 0, children3.length, hooks, null, ns);
                    }
                    vnode3.dom = fragment.firstChild;
                    vnode3.domSize = fragment.childNodes.length;
                    insertNode(parent, fragment, nextSibling);
                }

                function createElement(parent, vnode3, hooks, ns, nextSibling) {
                    var tag = vnode3.tag;
                    var attrs2 = vnode3.attrs;
                    var is = attrs2 && attrs2.is;
                    ns = getNameSpace(vnode3) || ns;
                    var element = ns ? is ? $doc.createElementNS(ns, tag, {
                        is: is
                    }) : $doc.createElementNS(ns, tag) : is ? $doc.createElement(tag, {
                        is: is
                    }) : $doc.createElement(tag);
                    vnode3.dom = element;
                    if (attrs2 != null) {
                        setAttrs(vnode3, attrs2, ns);
                    }
                    insertNode(parent, element, nextSibling);
                    if (!maybeSetContentEditable(vnode3)) {
                        if (vnode3.text != null) {
                            if (vnode3.text !== "") {
                                element.textContent = vnode3.text;
                            } else {
                                vnode3.children = [Vnode("#", undefined, undefined, vnode3.text, undefined, undefined)];
                            }
                        }
                        if (vnode3.children != null) {
                            var children3 = vnode3.children;
                            createNodes(element, children3, 0, children3.length, hooks, null, ns);
                            if (vnode3.tag === "select" && attrs2 != null) {
                                setLateSelectAttrs(vnode3, attrs2);
                            }
                        }
                    }
                }

                function initComponent(vnode3, hooks) {
                    var sentinel;
                    if (typeof vnode3.tag.view === "function") {
                        vnode3.state = Object.create(vnode3.tag);
                        sentinel = vnode3.state.view;
                        if (sentinel.$$reentrantLock$$ != null) {
                            return
                        }
                        sentinel.$$reentrantLock$$ = true;
                    } else {
                        vnode3.state = void 0;
                        sentinel = vnode3.tag;
                        if (sentinel.$$reentrantLock$$ != null) {
                            return
                        }
                        sentinel.$$reentrantLock$$ = true;
                        vnode3.state = (vnode3.tag.prototype != null && typeof vnode3.tag.prototype.view === "function") ? new vnode3.tag(vnode3) : vnode3.tag(vnode3);
                    }
                    initLifecycle(vnode3.state, vnode3, hooks);
                    if (vnode3.attrs != null) {
                        initLifecycle(vnode3.attrs, vnode3, hooks);
                    }
                    vnode3.instance = Vnode.normalize(callHook.call(vnode3.state.view, vnode3));
                    if (vnode3.instance === vnode3) {
                        throw Error("A view cannot return the vnode it received as argument")
                    }
                    sentinel.$$reentrantLock$$ = null;
                }

                function createComponent(parent, vnode3, hooks, ns, nextSibling) {
                    initComponent(vnode3, hooks);
                    if (vnode3.instance != null) {
                        createNode(parent, vnode3.instance, hooks, ns, nextSibling);
                        vnode3.dom = vnode3.instance.dom;
                        vnode3.domSize = vnode3.dom != null ? vnode3.instance.domSize : 0;
                    } else {
                        vnode3.domSize = 0;
                    }
                }

                function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
                    if (old === vnodes || old == null && vnodes == null) {
                        return
                    } else if (old == null || old.length === 0) {
                        createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns);
                    } else if (vnodes == null || vnodes.length === 0) {
                        removeNodes(parent, old, 0, old.length);
                    } else {
                        var isOldKeyed = old[0] != null && old[0].key != null;
                        var isKeyed0 = vnodes[0] != null && vnodes[0].key != null;
                        var start = 0,
                            oldStart = 0;
                        if (!isOldKeyed) {
                            while (oldStart < old.length && old[oldStart] == null) {
                                oldStart++;
                            }
                        }
                        if (!isKeyed0) {
                            while (start < vnodes.length && vnodes[start] == null) {
                                start++;
                            }
                        }
                        if (isKeyed0 === null && isOldKeyed == null) {
                            return
                        }
                        if (isOldKeyed !== isKeyed0) {
                            removeNodes(parent, old, oldStart, old.length);
                            createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
                        } else if (!isKeyed0) {
                            var commonLength = old.length < vnodes.length ? old.length : vnodes.length;
                            start = start < oldStart ? start : oldStart;
                            for (; start < commonLength; start++) {
                                o = old[start];
                                v = vnodes[start];
                                if (o === v || o == null && v == null) {
                                    continue
                                } else if (o == null) {
                                    createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling));
                                } else if (v == null) {
                                    removeNode(parent, o);
                                } else {
                                    updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns);
                                }
                            }
                            if (old.length > commonLength) {
                                removeNodes(parent, old, start, old.length);
                            }
                            if (vnodes.length > commonLength) {
                                createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns);
                            }
                        } else {
                            var oldEnd = old.length - 1,
                                end = vnodes.length - 1,
                                map, o, v, oe, ve, topSibling;
                            while (oldEnd >= oldStart && end >= start) {
                                oe = old[oldEnd];
                                ve = vnodes[end];
                                if (oe.key !== ve.key) {
                                    break
                                }
                                if (oe !== ve) {
                                    updateNode(parent, oe, ve, hooks, nextSibling, ns);
                                }
                                if (ve.dom != null) {
                                    nextSibling = ve.dom;
                                }
                                oldEnd--,
                                end--;
                            }
                            while (oldEnd >= oldStart && end >= start) {
                                o = old[oldStart];
                                v = vnodes[start];
                                if (o.key !== v.key) {
                                    break
                                }
                                oldStart++,
                                start++;
                                if (o !== v) {
                                    updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns);
                                }
                            }
                            while (oldEnd >= oldStart && end >= start) {
                                if (start === end) {
                                    break
                                }
                                if (o.key !== ve.key || oe.key !== v.key) {
                                    break
                                }
                                topSibling = getNextSibling(old, oldStart, nextSibling);
                                moveNodes(parent, oe, topSibling);
                                if (oe !== v) {
                                    updateNode(parent, oe, v, hooks, topSibling, ns);
                                }
                                if (++start <= --end) {
                                    moveNodes(parent, o, nextSibling);
                                }
                                if (o !== ve) {
                                    updateNode(parent, o, ve, hooks, nextSibling, ns);
                                }
                                if (ve.dom != null) {
                                    nextSibling = ve.dom;
                                }
                                oldStart++;
                                oldEnd--;
                                oe = old[oldEnd];
                                ve = vnodes[end];
                                o = old[oldStart];
                                v = vnodes[start];
                            }
                            while (oldEnd >= oldStart && end >= start) {
                                if (oe.key !== ve.key) {
                                    break
                                }
                                if (oe !== ve) {
                                    updateNode(parent, oe, ve, hooks, nextSibling, ns);
                                }
                                if (ve.dom != null) {
                                    nextSibling = ve.dom;
                                }
                                oldEnd--,
                                end--;
                                oe = old[oldEnd];
                                ve = vnodes[end];
                            }
                            if (start > end) {
                                removeNodes(parent, old, oldStart, oldEnd + 1);
                            } else if (oldStart > oldEnd) {
                                createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                            } else {
                                var originalNextSibling = nextSibling,
                                    vnodesLength = end - start + 1,
                                    oldIndices = new Array(vnodesLength),
                                    li = 0,
                                    i = 0,
                                    pos = 2147483647,
                                    matched = 0,
                                    map, lisIndices;
                                for (i = 0; i < vnodesLength; i++) {
                                    oldIndices[i] = -1;
                                }
                                for (i = end; i >= start; i--) {
                                    if (map == null) {
                                        map = getKeyMap(old, oldStart, oldEnd + 1);
                                    }
                                    ve = vnodes[i];
                                    var oldIndex = map[ve.key];
                                    if (oldIndex != null) {
                                        pos = (oldIndex < pos) ? oldIndex : -1;
                                        oldIndices[i - start] = oldIndex;
                                        oe = old[oldIndex];
                                        old[oldIndex] = null;
                                        if (oe !== ve) {
                                            updateNode(parent, oe, ve, hooks, nextSibling, ns);
                                        }
                                        if (ve.dom != null) {
                                            nextSibling = ve.dom;
                                        }
                                        matched++;
                                    }
                                }
                                nextSibling = originalNextSibling;
                                if (matched !== oldEnd - oldStart + 1) {
                                    removeNodes(parent, old, oldStart, oldEnd + 1);
                                }
                                if (matched === 0) {
                                    createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns);
                                } else {
                                    if (pos === -1) {
                                        lisIndices = makeLisIndices(oldIndices);
                                        li = lisIndices.length - 1;
                                        for (i = end; i >= start; i--) {
                                            v = vnodes[i];
                                            if (oldIndices[i - start] === -1) {
                                                createNode(parent, v, hooks, ns, nextSibling);
                                            } else {
                                                if (lisIndices[li] === i - start) {
                                                    li--;
                                                } else {
                                                    moveNodes(parent, v, nextSibling);
                                                }
                                            }
                                            if (v.dom != null) {
                                                nextSibling = vnodes[i].dom;
                                            }
                                        }
                                    } else {
                                        for (i = end; i >= start; i--) {
                                            v = vnodes[i];
                                            if (oldIndices[i - start] === -1) {
                                                createNode(parent, v, hooks, ns, nextSibling);
                                            }
                                            if (v.dom != null) {
                                                nextSibling = vnodes[i].dom;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                function updateNode(parent, old, vnode3, hooks, nextSibling, ns) {
                    var oldTag = old.tag,
                        tag = vnode3.tag;
                    if (oldTag === tag) {
                        vnode3.state = old.state;
                        vnode3.events = old.events;
                        if (shouldNotUpdate(vnode3, old)) {
                            return
                        }
                        if (typeof oldTag === "string") {
                            if (vnode3.attrs != null) {
                                updateLifecycle(vnode3.attrs, vnode3, hooks);
                            }
                            switch (oldTag) {
                                case "#":
                                    updateText(old, vnode3);
                                    break
                                case "<":
                                    updateHTML(parent, old, vnode3, ns, nextSibling);
                                    break
                                case "[":
                                    updateFragment(parent, old, vnode3, hooks, nextSibling, ns);
                                    break
                                default:
                                    updateElement(old, vnode3, hooks, ns);
                            }
                        } else {
                            updateComponent(parent, old, vnode3, hooks, nextSibling, ns);
                        }
                    } else {
                        removeNode(parent, old);
                        createNode(parent, vnode3, hooks, ns, nextSibling);
                    }
                }

                function updateText(old, vnode3) {
                    if (old.children.toString() !== vnode3.children.toString()) {
                        old.dom.nodeValue = vnode3.children;
                    }
                    vnode3.dom = old.dom;
                }

                function updateHTML(parent, old, vnode3, ns, nextSibling) {
                    if (old.children !== vnode3.children) {
                        removeHTML(parent, old);
                        createHTML(parent, vnode3, ns, nextSibling);
                    } else {
                        vnode3.dom = old.dom;
                        vnode3.domSize = old.domSize;
                        vnode3.instance = old.instance;
                    }
                }

                function updateFragment(parent, old, vnode3, hooks, nextSibling, ns) {
                    updateNodes(parent, old.children, vnode3.children, hooks, nextSibling, ns);
                    var domSize = 0,
                        children3 = vnode3.children;
                    vnode3.dom = null;
                    if (children3 != null) {
                        for (var i = 0; i < children3.length; i++) {
                            var child = children3[i];
                            if (child != null && child.dom != null) {
                                if (vnode3.dom == null) {
                                    vnode3.dom = child.dom;
                                }
                                domSize += child.domSize || 1;
                            }
                        }
                        if (domSize !== 1) {
                            vnode3.domSize = domSize;
                        }
                    }
                }

                function updateElement(old, vnode3, hooks, ns) {
                    var element = vnode3.dom = old.dom;
                    ns = getNameSpace(vnode3) || ns;
                    if (vnode3.tag === "textarea") {
                        if (vnode3.attrs == null) {
                            vnode3.attrs = {};
                        }
                        if (vnode3.text != null) {
                            vnode3.attrs.value = vnode3.text;
                            vnode3.text = undefined;
                        }
                    }
                    updateAttrs(vnode3, old.attrs, vnode3.attrs, ns);
                    if (!maybeSetContentEditable(vnode3)) {
                        if (old.text != null && vnode3.text != null && vnode3.text !== "") {
                            if (old.text.toString() !== vnode3.text.toString()) {
                                old.dom.firstChild.nodeValue = vnode3.text;
                            }
                        } else {
                            if (old.text != null) {
                                old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)];
                            }
                            if (vnode3.text != null) {
                                vnode3.children = [Vnode("#", undefined, undefined, vnode3.text, undefined, undefined)];
                            }
                            updateNodes(element, old.children, vnode3.children, hooks, null, ns);
                        }
                    }
                }

                function updateComponent(parent, old, vnode3, hooks, nextSibling, ns) {
                    vnode3.instance = Vnode.normalize(callHook.call(vnode3.state.view, vnode3));
                    if (vnode3.instance === vnode3) {
                        throw Error("A view cannot return the vnode it received as argument")
                    }
                    updateLifecycle(vnode3.state, vnode3, hooks);
                    if (vnode3.attrs != null) {
                        updateLifecycle(vnode3.attrs, vnode3, hooks);
                    }
                    if (vnode3.instance != null) {
                        if (old.instance == null) {
                            createNode(parent, vnode3.instance, hooks, ns, nextSibling);
                        } else {
                            updateNode(parent, old.instance, vnode3.instance, hooks, nextSibling, ns);
                        }
                        vnode3.dom = vnode3.instance.dom;
                        vnode3.domSize = vnode3.instance.domSize;
                    } else if (old.instance != null) {
                        removeNode(parent, old.instance);
                        vnode3.dom = undefined;
                        vnode3.domSize = 0;
                    } else {
                        vnode3.dom = old.dom;
                        vnode3.domSize = old.domSize;
                    }
                }

                function getKeyMap(vnodes, start, end) {
                    var map = Object.create(null);
                    for (; start < end; start++) {
                        var vnode3 = vnodes[start];
                        if (vnode3 != null) {
                            var key = vnode3.key;
                            if (key != null) {
                                map[key] = start;
                            }
                        }
                    }
                    return map
                }
                var lisTemp = [];

                function makeLisIndices(a) {
                    var result = [0];
                    var u = 0,
                        v = 0,
                        i = 0;
                    var il = lisTemp.length = a.length;
                    for (var i = 0; i < il; i++) {
                        lisTemp[i] = a[i];
                    }
                    for (var i = 0; i < il; ++i) {
                        if (a[i] === -1) {
                            continue
                        }
                        var j = result[result.length - 1];
                        if (a[j] < a[i]) {
                            lisTemp[i] = j;
                            result.push(i);
                            continue
                        }
                        u = 0;
                        v = result.length - 1;
                        while (u < v) {
                            var c = (u >>> 1) + (v >>> 1) + (u & v & 1);
                            if (a[result[c]] < a[i]) {
                                u = c + 1;
                            } else {
                                v = c;
                            }
                        }
                        if (a[i] < a[result[u]]) {
                            if (u > 0) {
                                lisTemp[i] = result[u - 1];
                            }
                            result[u] = i;
                        }
                    }
                    u = result.length;
                    v = result[u - 1];
                    while (u-- > 0) {
                        result[u] = v;
                        v = lisTemp[v];
                    }
                    lisTemp.length = 0;
                    return result
                }

                function getNextSibling(vnodes, i, nextSibling) {
                    for (; i < vnodes.length; i++) {
                        if (vnodes[i] != null && vnodes[i].dom != null) {
                            return vnodes[i].dom
                        }
                    }
                    return nextSibling
                }

                function moveNodes(parent, vnode3, nextSibling) {
                    var frag = $doc.createDocumentFragment();
                    moveChildToFrag(parent, frag, vnode3);
                    insertNode(parent, frag, nextSibling);
                }

                function moveChildToFrag(parent, frag, vnode3) {
                    while (vnode3.dom != null && vnode3.dom.parentNode === parent) {
                        if (typeof vnode3.tag !== "string") {
                            vnode3 = vnode3.instance;
                            if (vnode3 != null) {
                                continue
                            }
                        } else if (vnode3.tag === "<") {
                            for (var i = 0; i < vnode3.instance.length; i++) {
                                frag.appendChild(vnode3.instance[i]);
                            }
                        } else if (vnode3.tag !== "[") {
                            frag.appendChild(vnode3.dom);
                        } else if (vnode3.children.length === 1) {
                            vnode3 = vnode3.children[0];
                            if (vnode3 != null) {
                                continue
                            }
                        } else {
                            for (var i = 0; i < vnode3.children.length; i++) {
                                var child = vnode3.children[i];
                                if (child != null) {
                                    moveChildToFrag(parent, frag, child);
                                }
                            }
                        }
                        break
                    }
                }

                function insertNode(parent, dom, nextSibling) {
                    if (nextSibling != null) {
                        parent.insertBefore(dom, nextSibling);
                    } else {
                        parent.appendChild(dom);
                    }
                }

                function maybeSetContentEditable(vnode3) {
                    if (vnode3.attrs == null || (vnode3.attrs.contenteditable == null && vnode3.attrs.contentEditable == null)) {
                        return false
                    }
                    var children3 = vnode3.children;
                    if (children3 != null && children3.length === 1 && children3[0].tag === "<") {
                        var content = children3[0].children;
                        if (vnode3.dom.innerHTML !== content) {
                            vnode3.dom.innerHTML = content;
                        }
                    } else if (vnode3.text != null || children3 != null && children3.length !== 0) {
                        throw new Error("Child node of a contenteditable must be trusted.")
                    }
                    return true
                }

                function removeNodes(parent, vnodes, start, end) {
                    for (var i = start; i < end; i++) {
                        var vnode3 = vnodes[i];
                        if (vnode3 != null) {
                            removeNode(parent, vnode3);
                        }
                    }
                }

                function removeNode(parent, vnode3) {
                    var mask = 0;
                    var original = vnode3.state;
                    var stateResult, attrsResult;
                    if (typeof vnode3.tag !== "string" && typeof vnode3.state.onbeforeremove === "function") {
                        var result = callHook.call(vnode3.state.onbeforeremove, vnode3);
                        if (result != null && typeof result.then === "function") {
                            mask = 1;
                            stateResult = result;
                        }
                    }
                    if (vnode3.attrs && typeof vnode3.attrs.onbeforeremove === "function") {
                        var result = callHook.call(vnode3.attrs.onbeforeremove, vnode3);
                        if (result != null && typeof result.then === "function") {
                            mask |= 2;
                            attrsResult = result;
                        }
                    }
                    checkState(vnode3, original);
                    if (!mask) {
                        onremove(vnode3);
                        removeChild(parent, vnode3);
                    } else {
                        if (stateResult != null) {
                            var next = function() {
                                if (mask & 1) {
                                    mask &= 2;
                                    if (!mask) {
                                        reallyRemove();
                                    }
                                }
                            };
                            stateResult.then(next, next);
                        }
                        if (attrsResult != null) {
                            var next = function() {
                                if (mask & 2) {
                                    mask &= 1;
                                    if (!mask) {
                                        reallyRemove();
                                    }
                                }
                            };
                            attrsResult.then(next, next);
                        }
                    }

                    function reallyRemove() {
                        checkState(vnode3, original);
                        onremove(vnode3);
                        removeChild(parent, vnode3);
                    }
                }

                function removeHTML(parent, vnode3) {
                    for (var i = 0; i < vnode3.instance.length; i++) {
                        parent.removeChild(vnode3.instance[i]);
                    }
                }

                function removeChild(parent, vnode3) {
                    while (vnode3.dom != null && vnode3.dom.parentNode === parent) {
                        if (typeof vnode3.tag !== "string") {
                            vnode3 = vnode3.instance;
                            if (vnode3 != null) {
                                continue
                            }
                        } else if (vnode3.tag === "<") {
                            removeHTML(parent, vnode3);
                        } else {
                            if (vnode3.tag !== "[") {
                                parent.removeChild(vnode3.dom);
                                if (!Array.isArray(vnode3.children)) {
                                    break
                                }
                            }
                            if (vnode3.children.length === 1) {
                                vnode3 = vnode3.children[0];
                                if (vnode3 != null) {
                                    continue
                                }
                            } else {
                                for (var i = 0; i < vnode3.children.length; i++) {
                                    var child = vnode3.children[i];
                                    if (child != null) {
                                        removeChild(parent, child);
                                    }
                                }
                            }
                        }
                        break
                    }
                }

                function onremove(vnode3) {
                    if (typeof vnode3.tag !== "string" && typeof vnode3.state.onremove === "function") {
                        callHook.call(vnode3.state.onremove, vnode3);
                    }
                    if (vnode3.attrs && typeof vnode3.attrs.onremove === "function") {
                        callHook.call(vnode3.attrs.onremove, vnode3);
                    }
                    if (typeof vnode3.tag !== "string") {
                        if (vnode3.instance != null) {
                            onremove(vnode3.instance);
                        }
                    } else {
                        var children3 = vnode3.children;
                        if (Array.isArray(children3)) {
                            for (var i = 0; i < children3.length; i++) {
                                var child = children3[i];
                                if (child != null) {
                                    onremove(child);
                                }
                            }
                        }
                    }
                }

                function setAttrs(vnode3, attrs2, ns) {
                    for (var key in attrs2) {
                        setAttr(vnode3, key, null, attrs2[key], ns);
                    }
                }

                function setAttr(vnode3, key, old, value, ns) {
                    if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || (old === value && !isFormAttribute(vnode3, key)) && typeof value !== "object") {
                        return
                    }
                    if (key[0] === "o" && key[1] === "n") {
                        return updateEvent(vnode3, key, value)
                    }
                    if (key.slice(0, 6) === "xlink:") {
                        vnode3.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value);
                    } else if (key === "style") {
                        updateStyle(vnode3.dom, old, value);
                    } else if (hasPropertyKey(vnode3, key, ns)) {
                        if (key === "value") {
                            if ((vnode3.tag === "input" || vnode3.tag === "textarea") && vnode3.dom.value === "" + value && vnode3.dom === activeElement()) {
                                return
                            }
                            if (vnode3.tag === "select" && old !== null && vnode3.dom.value === "" + value) {
                                return
                            }
                            if (vnode3.tag === "option" && old !== null && vnode3.dom.value === "" + value) {
                                return
                            }
                        }
                        if (vnode3.tag === "input" && key === "type") {
                            vnode3.dom.setAttribute(key, value);
                        } else {
                            vnode3.dom[key] = value;
                        }
                    } else {
                        if (typeof value === "boolean") {
                            if (value) {
                                vnode3.dom.setAttribute(key, "");
                            } else {
                                vnode3.dom.removeAttribute(key);
                            }
                        } else {
                            vnode3.dom.setAttribute(key === "className" ? "class" : key, value);
                        }
                    }
                }

                function removeAttr(vnode3, key, old, ns) {
                    if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) {
                        return
                    }
                    if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) {
                        updateEvent(vnode3, key, undefined);
                    } else if (key === "style") {
                        updateStyle(vnode3.dom, old, null);
                    } else if (hasPropertyKey(vnode3, key, ns) && key !== "className" && !(key === "value" && (vnode3.tag === "option" || vnode3.tag === "select" && vnode3.dom.selectedIndex === -1 && vnode3.dom === activeElement())) && !(vnode3.tag === "input" && key === "type")) {
                        vnode3.dom[key] = null;
                    } else {
                        var nsLastIndex = key.indexOf(":");
                        if (nsLastIndex !== -1) {
                            key = key.slice(nsLastIndex + 1);
                        }
                        if (old !== false) {
                            vnode3.dom.removeAttribute(key === "className" ? "class" : key);
                        }
                    }
                }

                function setLateSelectAttrs(vnode3, attrs2) {
                    if ("value" in attrs2) {
                        if (attrs2.value === null) {
                            if (vnode3.dom.selectedIndex !== -1) {
                                vnode3.dom.value = null;
                            }
                        } else {
                            var normalized = "" + attrs2.value;
                            if (vnode3.dom.value !== normalized || vnode3.dom.selectedIndex === -1) {
                                vnode3.dom.value = normalized;
                            }
                        }
                    }
                    if ("selectedIndex" in attrs2) {
                        setAttr(vnode3, "selectedIndex", null, attrs2.selectedIndex, undefined);
                    }
                }

                function updateAttrs(vnode3, old, attrs2, ns) {
                    if (attrs2 != null) {
                        for (var key in attrs2) {
                            setAttr(vnode3, key, old && old[key], attrs2[key], ns);
                        }
                    }
                    var val;
                    if (old != null) {
                        for (var key in old) {
                            if (((val = old[key]) != null) && (attrs2 == null || attrs2[key] == null)) {
                                removeAttr(vnode3, key, val, ns);
                            }
                        }
                    }
                }

                function isFormAttribute(vnode3, attr) {
                    return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode3.dom === activeElement() || vnode3.tag === "option" && vnode3.dom.parentNode === $doc.activeElement
                }

                function isLifecycleMethod(attr) {
                    return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
                }

                function hasPropertyKey(vnode3, key, ns) {
                    return ns === undefined && (vnode3.tag.indexOf("-") > -1 || vnode3.attrs != null && vnode3.attrs.is || key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height") && key in vnode3.dom
                }
                var uppercaseRegex = /[A-Z]/g;

                function toLowerCase(capital) {
                    return "-" + capital.toLowerCase()
                }

                function normalizeKey(key) {
                    return key[0] === "-" && key[1] === "-" ? key : key === "cssFloat" ? "float" : key.replace(uppercaseRegex, toLowerCase)
                }

                function updateStyle(element, old, style) {
                    if (old === style)
                    ;
                    else if (style == null) {
                        element.style.cssText = "";
                    } else if (typeof style !== "object") {
                        element.style.cssText = style;
                    } else if (old == null || typeof old !== "object") {
                        element.style.cssText = "";
                        for (var key in style) {
                            var value = style[key];
                            if (value != null) {
                                element.style.setProperty(normalizeKey(key), String(value));
                            }
                        }
                    } else {
                        for (var key in style) {
                            var value = style[key];
                            if (value != null && (value = String(value)) !== String(old[key])) {
                                element.style.setProperty(normalizeKey(key), value);
                            }
                        }
                        for (var key in old) {
                            if (old[key] != null && style[key] == null) {
                                element.style.removeProperty(normalizeKey(key));
                            }
                        }
                    }
                }

                function EventDict() {
                    this._ = currentRedraw;
                }
                EventDict.prototype = Object.create(null);
                EventDict.prototype.handleEvent = function(ev) {
                    var handler0 = this["on" + ev.type];
                    var result;
                    if (typeof handler0 === "function") {
                        result = handler0.call(ev.currentTarget, ev);
                    } else if (typeof handler0.handleEvent === "function") {
                        handler0.handleEvent(ev);
                    }
                    if (this._ && ev.redraw !== false) {
                        (0,
                            this._)();
                    }
                    if (result === false) {
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                };

                function updateEvent(vnode3, key, value) {
                    if (vnode3.events != null) {
                        if (vnode3.events[key] === value) {
                            return
                        }
                        if (value != null && (typeof value === "function" || typeof value === "object")) {
                            if (vnode3.events[key] == null) {
                                vnode3.dom.addEventListener(key.slice(2), vnode3.events, false);
                            }
                            vnode3.events[key] = value;
                        } else {
                            if (vnode3.events[key] != null) {
                                vnode3.dom.removeEventListener(key.slice(2), vnode3.events, false);
                            }
                            vnode3.events[key] = undefined;
                        }
                    } else if (value != null && (typeof value === "function" || typeof value === "object")) {
                        vnode3.events = new EventDict();
                        vnode3.dom.addEventListener(key.slice(2), vnode3.events, false);
                        vnode3.events[key] = value;
                    }
                }

                function initLifecycle(source, vnode3, hooks) {
                    if (typeof source.oninit === "function") {
                        callHook.call(source.oninit, vnode3);
                    }
                    if (typeof source.oncreate === "function") {
                        hooks.push(callHook.bind(source.oncreate, vnode3));
                    }
                }

                function updateLifecycle(source, vnode3, hooks) {
                    if (typeof source.onupdate === "function") {
                        hooks.push(callHook.bind(source.onupdate, vnode3));
                    }
                }

                function shouldNotUpdate(vnode3, old) {
                    do {
                        if (vnode3.attrs != null && typeof vnode3.attrs.onbeforeupdate === "function") {
                            var force = callHook.call(vnode3.attrs.onbeforeupdate, vnode3, old);
                            if (force !== undefined && !force) {
                                break
                            }
                        }
                        if (typeof vnode3.tag !== "string" && typeof vnode3.state.onbeforeupdate === "function") {
                            var force = callHook.call(vnode3.state.onbeforeupdate, vnode3, old);
                            if (force !== undefined && !force) {
                                break
                            }
                        }
                        return false
                    } while (false);
                    vnode3.dom = old.dom;
                    vnode3.domSize = old.domSize;
                    vnode3.instance = old.instance;
                    vnode3.attrs = old.attrs;
                    vnode3.children = old.children;
                    vnode3.text = old.text;
                    return true
                }
                var currentDOM;
                return function(dom, vnodes, redraw) {
                    if (!dom) {
                        throw new TypeError("DOM element being rendered to does not exist.")
                    }
                    if (currentDOM != null && dom.contains(currentDOM)) {
                        throw new TypeError("Node is currently being rendered to and thus is locked.")
                    }
                    var prevRedraw = currentRedraw;
                    var prevDOM = currentDOM;
                    var hooks = [];
                    var active = activeElement();
                    var namespace = dom.namespaceURI;
                    currentDOM = dom;
                    currentRedraw = typeof redraw === "function" ? redraw : undefined;
                    try {
                        if (dom.vnodes == null) {
                            dom.textContent = "";
                        }
                        vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes]);
                        updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace);
                        dom.vnodes = vnodes;
                        if (active != null && activeElement() !== active && typeof active.focus === "function") {
                            active.focus();
                        }
                        for (var i = 0; i < hooks.length; i++) {
                            hooks[i]();
                        }
                    } finally {
                        currentRedraw = prevRedraw;
                        currentDOM = prevDOM;
                    }
                }
            };
            var render = _13(window);
            var _16 = function(render0, schedule, console) {
                var subscriptions = [];
                var pending = false;
                var offset = -1;

                function sync() {
                    for (offset = 0; offset < subscriptions.length; offset += 2) {
                        try {
                            render0(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw);
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    offset = -1;
                }

                function redraw() {
                    if (!pending) {
                        pending = true;
                        schedule(function() {
                            pending = false;
                            sync();
                        });
                    }
                }
                redraw.sync = sync;

                function mount(root, component) {
                    if (component != null && component.view == null && typeof component !== "function") {
                        throw new TypeError("m.mount expects a component, not a vnode.")
                    }
                    var index = subscriptions.indexOf(root);
                    if (index >= 0) {
                        subscriptions.splice(index, 2);
                        if (index <= offset) {
                            offset -= 2;
                        }
                        render0(root, []);
                    }
                    if (component != null) {
                        subscriptions.push(root, component);
                        render0(root, Vnode(component), redraw);
                    }
                }
                return {
                    mount: mount,
                    redraw: redraw
                }
            };
            var mountRedraw0 = _16(render, window.requestAnimationFrame, console);
            var buildQueryString = function(object) {
                if (Object.prototype.toString.call(object) !== "[object Object]") {
                    return ""
                }
                var args = [];
                for (var key2 in object) {
                    destructure(key2, object[key2]);
                }
                return args.join("&")

                function destructure(key2, value1) {
                    if (Array.isArray(value1)) {
                        for (var i = 0; i < value1.length; i++) {
                            destructure(key2 + "[" + i + "]", value1[i]);
                        }
                    } else if (Object.prototype.toString.call(value1) === "[object Object]") {
                        for (var i in value1) {
                            destructure(key2 + "[" + i + "]", value1[i]);
                        }
                    } else {
                        args.push(encodeURIComponent(key2) + (value1 != null && value1 !== "" ? "=" + encodeURIComponent(value1) : ""));
                    }
                }
            };
            var assign = Object.assign || function(target, source) {
                for (var key3 in source) {
                    if (hasOwn.call(source, key3)) {
                        target[key3] = source[key3];
                    }
                }
            };
            var buildPathname = function(template, params) {
                if ((/:([^\/\.-]+)(\.{3})?:/).test(template)) {
                    throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.")
                }
                if (params == null) {
                    return template
                }
                var queryIndex = template.indexOf("?");
                var hashIndex = template.indexOf("#");
                var queryEnd = hashIndex < 0 ? template.length : hashIndex;
                var pathEnd = queryIndex < 0 ? queryEnd : queryIndex;
                var path = template.slice(0, pathEnd);
                var query = {};
                assign(query, params);
                var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m4, key1, variadic) {
                    delete query[key1];
                    if (params[key1] == null) {
                        return m4
                    }
                    return variadic ? params[key1] : encodeURIComponent(String(params[key1]))
                });
                var newQueryIndex = resolved.indexOf("?");
                var newHashIndex = resolved.indexOf("#");
                var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex;
                var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex;
                var result0 = resolved.slice(0, newPathEnd);
                if (queryIndex >= 0) {
                    result0 += template.slice(queryIndex, queryEnd);
                }
                if (newQueryIndex >= 0) {
                    result0 += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd);
                }
                var querystring = buildQueryString(query);
                if (querystring) {
                    result0 += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring;
                }
                if (hashIndex >= 0) {
                    result0 += template.slice(hashIndex);
                }
                if (newHashIndex >= 0) {
                    result0 += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex);
                }
                return result0
            };
            var _19 = function($window, Promise, oncompletion) {
                var callbackCount = 0;

                function PromiseProxy(executor) {
                    return new Promise(executor)
                }
                PromiseProxy.prototype = Promise.prototype;
                PromiseProxy.__proto__ = Promise;

                function makeRequest(factory) {
                    return function(url, args) {
                        if (typeof url !== "string") {
                            args = url;
                            url = url.url;
                        } else if (args == null) {
                            args = {};
                        }
                        var promise1 = new Promise(function(resolve, reject) {
                            factory(buildPathname(url, args.params), args, function(data) {
                                if (typeof args.type === "function") {
                                    if (Array.isArray(data)) {
                                        for (var i = 0; i < data.length; i++) {
                                            data[i] = new args.type(data[i]);
                                        }
                                    } else {
                                        data = new args.type(data);
                                    }
                                }
                                resolve(data);
                            }, reject);
                        });
                        if (args.background === true) {
                            return promise1
                        }
                        var count = 0;

                        function complete() {
                            if (--count === 0 && typeof oncompletion === "function") {
                                oncompletion();
                            }
                        }
                        return wrap(promise1)

                        function wrap(promise1) {
                            var then1 = promise1.then;
                            promise1.constructor = PromiseProxy;
                            promise1.then = function() {
                                count++;
                                var next0 = then1.apply(promise1, arguments);
                                next0.then(complete, function(e) {
                                    complete();
                                    if (count === 0) {
                                        throw e
                                    }
                                });
                                return wrap(next0)
                            };
                            return promise1
                        }
                    }
                }

                function hasHeader(args, name) {
                    for (var key0 in args.headers) {
                        if (hasOwn.call(args.headers, key0) && name.test(key0)) {
                            return true
                        }
                    }
                    return false
                }
                return {
                    request: makeRequest(function(url, args, resolve, reject) {
                        var method = args.method != null ? args.method.toUpperCase() : "GET";
                        var body = args.body;
                        var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData);
                        var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json");
                        var xhr = new $window.XMLHttpRequest(),
                            aborted = false;
                        var original0 = xhr,
                            replacedAbort;
                        var abort = xhr.abort;
                        xhr.abort = function() {
                            aborted = true;
                            abort.call(this);
                        };
                        xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined);
                        if (assumeJSON && body != null && !hasHeader(args, /^content0-type1$/i)) {
                            xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                        }
                        if (typeof args.deserialize !== "function" && !hasHeader(args, /^accept$/i)) {
                            xhr.setRequestHeader("Accept", "application/json, text/*");
                        }
                        if (args.withCredentials) {
                            xhr.withCredentials = args.withCredentials;
                        }
                        if (args.timeout) {
                            xhr.timeout = args.timeout;
                        }
                        xhr.responseType = responseType;
                        for (var key0 in args.headers) {
                            if (hasOwn.call(args.headers, key0)) {
                                xhr.setRequestHeader(key0, args.headers[key0]);
                            }
                        }
                        xhr.onreadystatechange = function(ev) {
                            if (aborted) {
                                return
                            }
                            if (ev.target.readyState === 4) {
                                try {
                                    var success = (ev.target.status >= 200 && ev.target.status < 300) || ev.target.status === 304 || (/^file:\/\//i).test(url);
                                    var response = ev.target.response,
                                        message;
                                    if (responseType === "json") {
                                        if (!ev.target.responseType && typeof args.extract !== "function") {
                                            response = JSON.parse(ev.target.responseText);
                                        }
                                    } else if (!responseType || responseType === "text") {
                                        if (response == null) {
                                            response = ev.target.responseText;
                                        }
                                    }
                                    if (typeof args.extract === "function") {
                                        response = args.extract(ev.target, args);
                                        success = true;
                                    } else if (typeof args.deserialize === "function") {
                                        response = args.deserialize(response);
                                    }
                                    if (success) {
                                        resolve(response);
                                    } else {
                                        try {
                                            message = ev.target.responseText;
                                        } catch (e) {
                                            message = response;
                                        }
                                        var error = new Error(message);
                                        error.code = ev.target.status;
                                        error.response = response;
                                        reject(error);
                                    }
                                } catch (e) {
                                    reject(e);
                                }
                            }
                        };
                        if (typeof args.config === "function") {
                            xhr = args.config(xhr, args, url) || xhr;
                            if (xhr !== original0) {
                                replacedAbort = xhr.abort;
                                xhr.abort = function() {
                                    aborted = true;
                                    replacedAbort.call(this);
                                };
                            }
                        }
                        if (body == null) {
                            xhr.send();
                        } else if (typeof args.serialize === "function") {
                            xhr.send(args.serialize(body));
                        } else if (body instanceof $window.FormData) {
                            xhr.send(body);
                        } else {
                            xhr.send(JSON.stringify(body));
                        }
                    }),
                    jsonp: makeRequest(function(url, args, resolve, reject) {
                        var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++;
                        var script = $window.document.createElement("script");
                        $window[callbackName] = function(data) {
                            delete $window[callbackName];
                            script.parentNode.removeChild(script);
                            resolve(data);
                        };
                        script.onerror = function() {
                            delete $window[callbackName];
                            script.parentNode.removeChild(script);
                            reject(new Error("JSONP request failed"));
                        };
                        script.src = url + (url.indexOf("?") < 0 ? "?" : "&") + encodeURIComponent(args.callbackKey || "callback") + "=" + encodeURIComponent(callbackName);
                        $window.document.documentElement.appendChild(script);
                    }),
                }
            };
            var request = _19(window, PromisePolyfill, mountRedraw0.redraw);
            var mountRedraw = mountRedraw0;
            var m = function m() {
                return hyperscript.apply(this, arguments)
            };
            m.m = hyperscript;
            m.trust = hyperscript.trust;
            m.fragment = hyperscript.fragment;
            m.mount = mountRedraw.mount;
            var m6 = hyperscript;
            var Promise$1 = PromisePolyfill;
            var parseQueryString = function(string) {
                if (string === "" || string == null) {
                    return {}
                }
                if (string.charAt(0) === "?") {
                    string = string.slice(1);
                }
                var entries = string.split("&"),
                    counters = {},
                    data0 = {};
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i].split("=");
                    var key5 = decodeURIComponent(entry[0]);
                    var value2 = entry.length === 2 ? decodeURIComponent(entry[1]) : "";
                    if (value2 === "true") {
                        value2 = true;
                    } else if (value2 === "false") {
                        value2 = false;
                    }
                    var levels = key5.split(/\]\[?|\[/);
                    var cursor = data0;
                    if (key5.indexOf("[") > -1) {
                        levels.pop();
                    }
                    for (var j0 = 0; j0 < levels.length; j0++) {
                        var level = levels[j0],
                            nextLevel = levels[j0 + 1];
                        var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10));
                        if (level === "") {
                            var key5 = levels.slice(0, j0).join();
                            if (counters[key5] == null) {
                                counters[key5] = Array.isArray(cursor) ? cursor.length : 0;
                            }
                            level = counters[key5] ++;
                        } else if (level === "__proto__") {
                            break
                        }
                        if (j0 === levels.length - 1) {
                            cursor[level] = value2;
                        } else {
                            var desc = Object.getOwnPropertyDescriptor(cursor, level);
                            if (desc != null) {
                                desc = desc.value;
                            }
                            if (desc == null) {
                                cursor[level] = desc = isNumber ? [] : {};
                            }
                            cursor = desc;
                        }
                    }
                }
                return data0
            };
            var parsePathname = function(url) {
                var queryIndex0 = url.indexOf("?");
                var hashIndex0 = url.indexOf("#");
                var queryEnd0 = hashIndex0 < 0 ? url.length : hashIndex0;
                var pathEnd0 = queryIndex0 < 0 ? queryEnd0 : queryIndex0;
                var path1 = url.slice(0, pathEnd0).replace(/\/{2,}/g, "/");
                if (!path1) {
                    path1 = "/";
                } else {
                    if (path1[0] !== "/") {
                        path1 = "/" + path1;
                    }
                    if (path1.length > 1 && path1[path1.length - 1] === "/") {
                        path1 = path1.slice(0, -1);
                    }
                }
                return {
                    path: path1,
                    params: queryIndex0 < 0 ? {} : parseQueryString(url.slice(queryIndex0 + 1, queryEnd0)),
                }
            };
            var compileTemplate = function(template) {
                var templateData = parsePathname(template);
                var templateKeys = Object.keys(templateData.params);
                var keys = [];
                var regexp = new RegExp("^" + templateData.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g, function(m7, key6, extra) {
                    if (key6 == null) {
                        return "\\" + m7
                    }
                    keys.push({
                        k: key6,
                        r: extra === "..."
                    });
                    if (extra === "...") {
                        return "(.*)"
                    }
                    if (extra === ".") {
                        return "([^/]+)\\."
                    }
                    return "([^/]+)" + (extra || "")
                }) + "$");
                return function(data1) {
                    for (var i = 0; i < templateKeys.length; i++) {
                        if (templateData.params[templateKeys[i]] !== data1.params[templateKeys[i]]) {
                            return false
                        }
                    }
                    if (!keys.length) {
                        return regexp.test(data1.path)
                    }
                    var values = regexp.exec(data1.path);
                    if (values == null) {
                        return false
                    }
                    for (var i = 0; i < keys.length; i++) {
                        data1.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1]);
                    }
                    return true
                }
            };
            var magic = /^(?:key7|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove1)$/;
            var censor = function(attrs4, extras) {
                var result2 = {};
                if (extras != null) {
                    for (var key7 in attrs4) {
                        if (hasOwn.call(attrs4, key7) && !magic.test(key7) && extras.indexOf(key7) < 0) {
                            result2[key7] = attrs4[key7];
                        }
                    }
                } else {
                    for (var key7 in attrs4) {
                        if (hasOwn.call(attrs4, key7) && !magic.test(key7)) {
                            result2[key7] = attrs4[key7];
                        }
                    }
                }
                return result2
            };
            var sentinel0 = {};
            var _28 = function($window, mountRedraw00) {
                var fireAsync;

                function setPath(path0, data, options) {
                    path0 = buildPathname(path0, data);
                    if (fireAsync != null) {
                        fireAsync();
                        var state = options ? options.state : null;
                        var title = options ? options.title : null;
                        if (options && options.replace) {
                            $window.history.replaceState(state, title, route.prefix + path0);
                        } else {
                            $window.history.pushState(state, title, route.prefix + path0);
                        }
                    } else {
                        $window.location.href = route.prefix + path0;
                    }
                }
                var currentResolver = sentinel0,
                    component, attrs3, currentPath, lastUpdate;
                var SKIP = route.SKIP = {};

                function route(root, defaultRoute, routes) {
                    if (!root) {
                        throw new TypeError("DOM element being rendered to does not exist.")
                    }
                    var state = 0;
                    var compiled = Object.keys(routes).map(function(route) {
                        if (route[0] !== "/") {
                            throw new SyntaxError("Routes must start with a '/'.")
                        }
                        if ((/:([^\/\.-]+)(\.{3})?:/).test(route)) {
                            throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.")
                        }
                        return {
                            route: route,
                            component: routes[route],
                            check: compileTemplate(route),
                        }
                    });
                    var callAsync0 = typeof setImmediate === "function" ? setImmediate : setTimeout;
                    var p = Promise$1.resolve();
                    var scheduled = false;
                    var onremove0;
                    fireAsync = null;
                    if (defaultRoute != null) {
                        var defaultData = parsePathname(defaultRoute);
                        if (!compiled.some(function(i) {
                                return i.check(defaultData)
                            })) {
                            throw new ReferenceError("Default route doesn't match any known routes.")
                        }
                    }

                    function resolveRoute() {
                        scheduled = false;
                        var prefix = $window.location.hash;
                        if (route.prefix[0] !== "#") {
                            prefix = $window.location.search + prefix;
                            if (route.prefix[0] !== "?") {
                                prefix = $window.location.pathname + prefix;
                                if (prefix[0] !== "/") {
                                    prefix = "/" + prefix;
                                }
                            }
                        }
                        var path0 = prefix.concat().replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent).slice(route.prefix.length);
                        var data = parsePathname(path0);
                        assign(data.params, $window.history.state);

                        function reject(e) {
                            console.error(e);
                            setPath(defaultRoute, null, {
                                replace: true
                            });
                        }
                        loop(0);

                        function loop(i) {
                            for (; i < compiled.length; i++) {
                                if (compiled[i].check(data)) {
                                    var payload = compiled[i].component;
                                    var matchedRoute = compiled[i].route;
                                    var localComp = payload;
                                    var update = lastUpdate = function(comp) {
                                        if (update !== lastUpdate) {
                                            return
                                        }
                                        if (comp === SKIP) {
                                            return loop(i + 1)
                                        }
                                        component = comp != null && (typeof comp.view === "function" || typeof comp === "function") ? comp : "div";
                                        attrs3 = data.params,
                                            currentPath = path0,
                                            lastUpdate = null;
                                        currentResolver = payload.render ? payload : null;
                                        if (state === 2) {
                                            mountRedraw00.redraw();
                                        } else {
                                            state = 2;
                                            mountRedraw00.redraw.sync();
                                        }
                                    };
                                    if (payload.view || typeof payload === "function") {
                                        payload = {};
                                        update(localComp);
                                    } else if (payload.onmatch) {
                                        p.then(function() {
                                            return payload.onmatch(data.params, path0, matchedRoute)
                                        }).then(update, path0 === defaultRoute ? null : reject);
                                    } else {
                                        update("div");
                                    }
                                    return
                                }
                            }
                            if (path0 === defaultRoute) {
                                throw new Error("Could not resolve default route " + defaultRoute + ".")
                            }
                            setPath(defaultRoute, null, {
                                replace: true
                            });
                        }
                    }
                    fireAsync = function() {
                        if (!scheduled) {
                            scheduled = true;
                            callAsync0(resolveRoute);
                        }
                    };
                    if (typeof $window.history.pushState === "function") {
                        onremove0 = function() {
                            $window.removeEventListener("popstate", fireAsync, false);
                        };
                        $window.addEventListener("popstate", fireAsync, false);
                    } else if (route.prefix[0] === "#") {
                        fireAsync = null;
                        onremove0 = function() {
                            $window.removeEventListener("hashchange", resolveRoute, false);
                        };
                        $window.addEventListener("hashchange", resolveRoute, false);
                    }
                    mountRedraw00.mount(root, {
                        onbeforeupdate: function() {
                            state = state ? 2 : 1;
                            return !(!state || sentinel0 === currentResolver)
                        },
                        onremove: onremove0,
                        view: function() {
                            if (!state || sentinel0 === currentResolver) {
                                return
                            }
                            var vnode5 = [Vnode(component, attrs3.key, attrs3)];
                            if (currentResolver) {
                                vnode5 = currentResolver.render(vnode5[0]);
                            }
                            return vnode5
                        },
                    });
                    resolveRoute();
                }
                route.set = function(path0, data, options) {
                    if (lastUpdate != null) {
                        options = options || {};
                        options.replace = true;
                    }
                    lastUpdate = null;
                    setPath(path0, data, options);
                };
                route.get = function() {
                    return currentPath
                };
                route.prefix = "#!";
                route.Link = {
                    view: function(vnode5) {
                        var child0 = m6(vnode5.attrs.selector || "a", censor(vnode5.attrs, ["options", "params", "selector", "onclick"]), vnode5.children);
                        var options, onclick, href;
                        if (child0.attrs.disabled = Boolean(child0.attrs.disabled)) {
                            child0.attrs.href = null;
                            child0.attrs["aria-disabled"] = "true";
                        } else {
                            options = vnode5.attrs.options;
                            onclick = vnode5.attrs.onclick;
                            href = buildPathname(child0.attrs.href, vnode5.attrs.params);
                            child0.attrs.href = route.prefix + href;
                            child0.attrs.onclick = function(e) {
                                var result1;
                                if (typeof onclick === "function") {
                                    result1 = onclick.call(e.currentTarget, e);
                                } else if (onclick == null || typeof onclick !== "object")
                                ;
                                else if (typeof onclick.handleEvent === "function") {
                                    onclick.handleEvent(e);
                                }
                                if (result1 !== false && !e.defaultPrevented && (e.button === 0 || e.which === 0 || e.which === 1) && (!e.currentTarget.target || e.currentTarget.target === "_self") && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                                    e.preventDefault();
                                    e.redraw = false;
                                    route.set(href, null, options);
                                }
                            };
                        }
                        return child0
                    },
                };
                route.param = function(key4) {
                    return attrs3 && key4 != null ? attrs3[key4] : attrs3
                };
                return route
            };
            m.route = _28(window, mountRedraw);
            m.render = render;
            m.redraw = mountRedraw.redraw;
            m.request = request.request;
            m.jsonp = request.jsonp;
            m.parseQueryString = parseQueryString;
            m.buildQueryString = buildQueryString;
            m.parsePathname = parsePathname;
            m.buildPathname = buildPathname;
            m.vnode = Vnode;
            m.PromisePolyfill = PromisePolyfill;
            m.censor = censor;
            Stream.SKIP = {};
            Stream.lift = lift;
            Stream.scan = scan;
            Stream.merge = merge;
            Stream.combine = combine;
            Stream.scanMerge = scanMerge;
            Stream['fantasy-land/of'] = Stream;

            function Stream(value) {
                var dependentStreams = [];
                var dependentFns = [];

                function stream(v) {
                    if (arguments.length && v !== Stream.SKIP) {
                        value = v;
                        if (open(stream)) {
                            stream._changing();
                            stream._state = 'active';
                            dependentStreams.forEach(function(s, i) {
                                return s(dependentFns[i](value));
                            });
                        }
                    }
                    return value
                }
                stream.constructor = Stream;
                stream._state = arguments.length && value !== Stream.SKIP ? 'active' : 'pending';
                stream._parents = [];
                stream._changing = function() {
                    if (open(stream)) {
                        stream._state = 'changing';
                    }
                    dependentStreams.forEach(function(s) {
                        return s._changing();
                    });
                };
                stream._map = function(fn, ignoreInitial) {
                    var target = ignoreInitial ? Stream() : Stream(fn(value));
                    target._parents.push(stream);
                    dependentStreams.push(target);
                    dependentFns.push(fn);
                    return target
                };
                stream.map = function(fn) {
                    return stream._map(fn, stream._state !== 'active');
                };
                var end;

                function createEnd() {
                    end = Stream();
                    end.map(function(value) {
                        if (value === true) {
                            stream._parents.forEach(function(p) {
                                return p._unregisterChild(stream);
                            });
                            stream._state = 'ended';
                            stream._parents.length = dependentStreams.length = dependentFns.length = 0;
                        }
                        return value
                    });
                    return end
                }
                stream.toJSON = function() {
                    return value != null && typeof value.toJSON === 'function' ? value.toJSON() : value;
                };
                stream.toString = stream;
                stream.valueOf = stream;
                stream['fantasy-land/map'] = stream.map;
                stream['fantasy-land/ap'] = function(x) {
                    return combine(function(s1, s2) {
                        return s1()(s2());
                    }, [x, stream]);
                };
                stream._unregisterChild = function(child) {
                    var childIndex = dependentStreams.indexOf(child);
                    if (childIndex !== -1) {
                        dependentStreams.splice(childIndex, 1);
                        dependentFns.splice(childIndex, 1);
                    }
                };
                Object.defineProperty(stream, 'end', {
                    get: function() {
                        return end || createEnd();
                    }
                });
                return stream
            }

            function combine(fn, streams) {
                var ready = streams.every(function(s) {
                    if (s.constructor !== Stream) {
                        throw new Error('Ensure that each item passed to stream.combine/stream.merge/lift is a stream')
                    }
                    return s._state === 'active'
                });
                var stream = ready ? Stream(fn.apply(null, streams.concat([streams]))) : Stream();
                var changed = [];
                var mappers = streams.map(function(s) {
                    return s._map(function(value) {
                        changed.push(s);
                        if (ready || streams.every(function(s) {
                                return s._state !== 'pending';
                            })) {
                            ready = true;
                            stream(fn.apply(null, streams.concat([changed])));
                            changed = [];
                        }
                        return value
                    }, true);
                });
                var endStream = stream.end.map(function(value) {
                    if (value === true) {
                        mappers.forEach(function(mapper) {
                            return mapper.end(true);
                        });
                        endStream.end(true);
                    }
                    return undefined
                });
                return stream
            }

            function merge(streams) {
                return combine(function() {
                    return streams.map(function(s) {
                        return s();
                    });
                }, streams)
            }

            function scan(fn, acc, origin) {
                var stream = origin.map(function(v) {
                    var next = fn(acc, v);
                    if (next !== Stream.SKIP) {
                        acc = next;
                    }
                    return next
                });
                stream(acc);
                return stream
            }

            function scanMerge(tuples, seed) {
                var arguments$1 = arguments;
                var streams = tuples.map(function(tuple) {
                    return tuple[0];
                });
                var stream = combine(function() {
                    var changed = arguments$1[arguments$1.length - 1];
                    streams.forEach(function(stream, i) {
                        if (changed.indexOf(stream) > -1) {
                            seed = tuples[i][1](seed, stream());
                        }
                    });
                    return seed
                }, streams);
                stream(seed);
                return stream
            }

            function lift() {
                var fn = arguments[0];
                var streams = Array.prototype.slice.call(arguments, 1);
                return merge(streams).map(function(streams) {
                    return fn.apply(undefined, streams);
                })
            }

            function open(s) {
                return s._state === 'pending' || s._state === 'active' || s._state === 'changing'
            }
            var el = typeof document !== 'undefined' && document.createElement('div');
            var cache = {
                flex: 0,
                border: 1,
                transform: 1,
                'line-height': 0,
                'box-shadow': 1,
                'border-top': 1,
                'border-left': 1,
                'border-right': 1,
                'border-bottom': 1
            };

            function px(x) {
                if ((x[0] === '-' && x[1] === '-') || x in cache) {
                    return cache[x]
                }
                try {
                    el.style[x] = '1px';
                    el.style.setProperty(x, '1px');
                    return cache[x] = el.style[x].slice(-3) === '1px'
                } catch (err) {
                    return cache[x] = false
                }
            }
            var vendorRegex = /^(o|O|ms|MS|Ms|moz|Moz|webkit|Webkit|WebKit)([A-Z])/;
            var snake = function(x) {
                return x.replace(/(\B[A-Z])/g, '-$1').toLowerCase();
            };
            var findWidth = function(x) {
                return x ? x.hasOwnProperty('width') ? x : findWidth(Object.getPrototypeOf(x)) : {};
            };
            var properties = ['float'].concat(Object.keys(typeof document === 'undefined' ? {} : findWidth(document.documentElement.style))).filter(function(x, i, xs) {
                return x.indexOf('-') === -1 && x !== 'length' && xs.indexOf(x) === i;
            }).map(function(x) {
                return x.match(vendorRegex) ? '-' + snake(x) : snake(x);
            }).sort();
            var initials = function(acc, x) {
                var obj;
                return Object.assign(acc, (obj = {},
                    obj[x.split('-').map(function(x) {
                        return x[0];
                    }).join('')] = x,
                    obj));
            };
            var popular = ['align-items', 'bottom', 'background-color', 'border-radius', 'box-shadow', 'background-image', 'color', 'display', 'float', 'flex-direction', 'font-family', 'font-size', 'height', 'justify-content', 'left', 'line-height', 'letter-spacing', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'opacity', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'right', 'top', 'text-align', 'text-decoration', 'text-transform', 'width'];
            var shorts = Object.assign(properties.reduce(initials, {}), popular.reduce(initials, {}));

            function shorts$1(x) {
                return shorts[x] || x;
            }
            var doc = typeof document !== 'undefined' && window.document,
                validChar = function(c, ci) {
                    return ci ? function(x) {
                        return c.indexOf(x.toLowerCase()) > -1;
                    } : function(x) {
                        return c.indexOf(x) > -1;
                    };
                },
                isProp = validChar('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-'),
                isClass = validChar('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_', true),
                isQuote = validChar('\'"'),
                isValueSep = validChar(' ,)'),
                isNumber = function(x) {
                    return typeof x === 'number';
                },
                vendorMap = Object.create(null, {}),
                vendorValuePrefix = Object.create(null, {}),
                randomId = function() {
                    return 'bss' + ('000000' + (Math.random() * Math.pow(36, 6) | 0).toString(36)).slice(-6);
                };
            properties.forEach(function(x) {
                var vendor = x.match(/-(ms|o|webkit|moz)-/g);
                if (vendor) {
                    var unprefixed = x.replace(/-(ms|o|webkit|moz)-/, '');
                    if (properties.indexOf(unprefixed) === -1) {
                        if (unprefixed === 'flexDirection') {
                            vendorValuePrefix.flex = '-' + vendor[1].toLowerCase() + '-flex';
                        }
                        vendorMap[unprefixed] = x;
                        return
                    }
                }
            });

            function bss(ref) {
                if (ref === void 0) {
                    ref = {};
                }
                var style = ref.style;
                if (style === void 0) {
                    style = doc && doc.querySelector && (doc.querySelector('.bss_style') || doc.createElement('style'));
                }
                var prefix = ref.prefix;
                if (prefix === void 0) {
                    prefix = style && style.getAttribute('id') || randomId();
                }
                var append = ref.append;
                if (append === void 0) {
                    append = true;
                }
                var cache = {},
                    anims = {},
                    props = [],
                    ats = [];
                var b = bss();
                b.count = 0;
                b.rules = style && style.textContent && style.textContent.split(b.prefix + '{}') || [];
                b.debug = false;
                b.prefix = prefix;
                b.properties = properties;
                b.at = function(x) {
                    return ats.unshift(typeof x === 'function' ? x : (function(v) {
                        return x[v.slice(1)] || v;
                    }));
                };
                b.prop = function(fn) {
                    return props.unshift(fn);
                };
                b.create = bss;
                b.ssr = ssr;
                b.global = global;
                b.prop(vendor);
                b.prop(shorts$1);
                style && (style.id = b.prefix);
                return b

                function global() {
                    var style = b.apply(b, arguments);
                    parse(style.content.replace(/@import[^;]*;/g, insert).trim(), '__global').forEach(function(x) {
                        return insert(x.replace(/\.__global/g, '').trim());
                    });
                }

                function ValueOf() {
                    if (this.className) {
                        return this.className
                    }
                    this.className = b.prefix + ++b.count;
                    var x = parse(this.content.trim(), this.className);
                    x.forEach(insert);
                    return x.name
                }

                function bss(pre) {
                    return function(xs) {
                        var arguments$1 = arguments;
                        var args = [],
                            len = arguments.length - 1;
                        while (len-- > 0) {
                            args[len] = arguments$1[len + 1];
                        }
                        var s = (pre || '') + xs[0];
                        for (var i = 1; i < xs.length; i++) {
                            var value = args[i - 1];
                            s += (value && value.toString === ValueOf ? value.content : Array.isArray(value) ? value.map(function(x) {
                                return x.content || x;
                            }).join('\n') : value) + xs[i];
                        }
                        if (s in cache) {
                            return cache[s]
                        }
                        var x = bss('\n' + s + '\n');
                        x.toString = x.valueOf = ValueOf;
                        x.content = s;
                        cache[s] = x;
                        return x
                    }
                }

                function ssr() {
                    return '<style class="bss_style" id="' + b.prefix + '">' + b.rules.join(b.prefix + '{}') + '</style>'
                }

                function vendor(x) {
                    if (properties.indexOf(x) === -1) {
                        if (vendorMap[x]) {
                            b.debug && console.log(x, 'prefixed to', vendorMap[x]);
                            return vendorMap[x]
                        }
                        b.debug && x.indexOf('--') !== 0 && console.log(x, 'not found');
                    }
                    return x
                }

                function insert(rule) {
                    if (append) {
                        style && doc.head && doc.head.appendChild(style);
                        append = false;
                    }
                    var isImport = rule.indexOf('@import') === 0,
                        index = isImport ? 0 : b.rules.length;
                    if (b.debug && style) {
                        index === 0 ? b.rules.unshift(rule) : b.rules.push(rule);
                        style.textContent = b.rules.map(pretty).join('\n');
                    } else if (style && style.sheet) {
                        try {
                            style.sheet.insertRule(rule, index);
                            index === 0 ? b.rules.unshift(rule) : b.rules.push(rule);
                        } catch (e) {
                            b.debug && console.log('Ignored error:', e);
                        }
                    } else {
                        index === 0 ? b.rules.unshift(rule) : b.rules.push(rule);
                    }
                }

                function pretty(str) {
                    return str.replace(/{/g, ' {\n').replace(/([;{])\n*/g, '$1\n  ').replace(/(.*):(.*);/g, '$1: $2;').replace(/[\s]*}/g, '\n}\n').replace(/,\s*/g, ', ').replace(/@.*{[\s\S]*?}[\s]*}/g, function(m) {
                        return m.split('\n').reduce(function(acc, x, i, xs) {
                            return acc + (i < xs.length - 1 ? '\n' : '') + (i > 1 && i < xs.length - 2 ? '  ' : '') + x;
                        }, '');
                    }).trim().replace('}\n\n}', '}\n}')
                }

                function parse(s, x) {
                    var rules = [],
                        props = propsState(),
                        level = [];
                    var ani = false,
                        at = false,
                        supports = false,
                        name = false;
                    for (var i = 0; i < s.length; i++) {
                        if (i > 0 && name && !isClass(s[i])) {
                            x = s.slice(1, i) + '-' + x;
                            name = false;
                        }
                        if (name || (i === 0 && s[i] === '.')) {
                            name = true;
                            continue
                        }
                        propsParseLoop(s, i, s[i], props);
                        if (s[i] === '}' || i === s.length - 1) {
                            parseAddProps(ani || at || supports || rules, i, x, props, level);
                            if (ani && !level.length) {
                                var selector = ani.selector;
                                var c = at || supports || rules;
                                ani = ani.join('');
                                anims[ani] ? (c[c.length - 1] = c[c.length - 1].slice(0, -13) + anims[ani].slice(10) + ';}') : c.unshift((anims[ani] = selector) + '{' + ani + '}');
                                ani = false;
                            }
                            if (at && !level.length) {
                                (supports || rules).push(at.selector === '@font-face' ? at.selector + at.join('') : at.selector + '{' + at.join('') + '}');
                                at = false;
                            }
                            if (supports && !level.length) {
                                rules.push(supports.selector + '{' + supports.join('') + '}');
                                supports = false;
                            }
                            level.pop();
                        } else if (s[i] === '{') {
                            var selector$1 = s.slice(props.end, i).trim().replace(/,[\s]*/, ',& ');
                            if (selector$1.indexOf('animation') === 0) {
                                props.out.push(['animation', selector$1.slice(10) + ' ' + x]);
                            }
                            parseAddProps(ani || at || supports || rules, i, x, props, level);
                            props.prop = props.value = props.propEnd = props.strict = null;
                            selector$1.indexOf('@supports') === 0 ? supports = Object.assign([], {
                                selector: selector$1
                            }) : selector$1[0] === '@' ? at = Object.assign([], {
                                selector: ats.reduce(function(acc, fn) {
                                    return fn(acc);
                                }, selector$1.trim())
                            }) : selector$1.indexOf('animation') === 0 ? ani = Object.assign([], {
                                selector: '@keyframes ' + x
                            }) : ani ? level.splice(0, level.length, selector$1) : level.push(selector$1);
                        }
                    }
                    rules.name = x;
                    return rules
                }

                function parseAddProps(xs, i, name, props, level) {
                    var content = props.out.length && props.out.map(function(x) {
                        return x.join(':');
                    }).join(';');
                    var base = level.length && level[0][0] !== ':';
                    var ani = !xs.selector || xs.selector.indexOf('@keyframes ') !== 0;
                    content && xs.push(((!level.length || level[0][0] !== '&') && ani ? (base ? '' : '.' + name) + '.' + name + (base ? ' ' : '') : '') + (ani ? level.join(' ').replace(/&/g, '.' + name).replace(/ :/g, ':') : level.join(' ').replace(/&/g, '')) + '{' + content + ';}');
                    props.end = i + 1;
                    props.out = [];
                }

                function propsState() {
                    return {
                        prop: null,
                        propEnd: null,
                        value: null,
                        out: [],
                        strict: null,
                        comma: 0,
                        end: 0,
                        quote: false
                    }
                }

                function propsParseLoop(s, i, v, x) {
                    if (!x.value && x.prop !== null && !x.strict && v === ':') {
                        x.strict = true;
                    }
                    if (!x.value && x.prop !== null && x.out.length && v === ',') {
                        x.value = x.comma;
                        x.prop = x.out[x.out.length - 1][0];
                    } else if (!x.value && x.prop === null && isProp(v)) {
                        x.prop = i;
                    } else if (isNumber(x.prop) && !x.propEnd && !isProp(v)) {
                        x.propEnd = i;
                    } else if (isNumber(x.propEnd) && !isNumber(x.value) && v !== ' ' && v !== '\n' && v !== ':') {
                        x.value = i;
                    }
                    propAdd(s, i, v, x);
                }

                function propAdd(s, i, v, x) {
                    if (x.value && isQuote(v)) {
                        x.quote = !x.quote;
                    }
                    if (!x.quote && x.prop !== null && (i === s.length - 1 || s[i + 1] === ';' || s[i + 1] === '}' || (!x.strict && s[i - 1] !== ',' && v === '\n'))) {
                        x.out.push(propParse(s.slice(x.prop, x.propEnd), s.slice(x.value, i + 1).trim(), x));
                        x.end = i + (s[i + 1] === ';' ? 2 : 1);
                        x.comma = x.value;
                        x.value = x.prop = x.propEnd = x.strict = null;
                    }
                }

                function propParse(key, value, x) {
                    if (x.strict) {
                        return [key, value]
                    }
                    key = props.reduce(function(acc, fn) {
                        return fn(acc);
                    }, key.trim());
                    var result = '';
                    var end = 0;
                    var unit = 'px';
                    for (var i = 0; i < value.length; i++) {
                        if (isValueSep(value[i]) || i === value.length - 1) {
                            var last = value.slice(end, i + 1).trim();
                            result += ((unit && px(key)) ? last.replace(/(^|[( ,])([-0-9.]+)([ ,)]|$)/g, '$1$2' + unit + '$3').trim() : last) + (value[i] === ',' ? '' : ' ');
                            end = i + 1;
                        }
                        if (value[i] === '(' || value[i - 1] === ')') {
                            unit = value.slice(end, i).indexOf('translate') === 0 ? 'px' : value.slice(end, i).indexOf('rotate') === 0 ? 'deg' : '';
                        }
                    }
                    return [key, result.trim().replace(/[\n ]+/g, ' ')]
                }
            }
            var bss$1 = bss();
            bss$1.create = bss;
            var cache$1 = new Map(),
                routeState = {},
                S = {};
            var routing = false;

            function s(a) {
                var rest = [],
                    len = arguments.length - 1;
                while (len-- > 0)
                    rest[len] = arguments[len + 1];
                if (typeof a === 'string') {
                    throw new Error('Are you trying to do hyperscript? Here we sin! Try writing s`' + a + '`(...) instead')
                }
                var isTagged = Array.isArray(a) && Array.isArray(a.raw),
                    comp = !isTagged && {
                        fn: a,
                        waiting: rest[0]
                    },
                    x = tagged(function(ref) {
                        var tag = ref.tag;
                        var selector = ref.selector;
                        var styles = ref.styles;
                        var args = ref.args;
                        return call({
                            S: S,
                            comp: comp,
                            tag: tag,
                            selector: selector,
                            styles: styles,
                            args: args
                        });
                    });
                if (isTagged) {
                    var ref = parse(a);
                    var s = ref.s;
                    var fn = x.apply(void 0, arguments);
                    fn.S = S;
                    fn.styles = s;
                    fn.args = rest;
                    return fn
                }
                return typeof a === 'object' && typeof a.then === 'function' ? m(promiser, {
                    waiting: rest[0]
                }, a) : x
            }
            s.bss = bss$1;
            s.stream = Stream;
            s.redraw = m.redraw;
            s.trust = m.trust;
            s.request = m.request;
            s.fragment = m.fragment;
            s.pathmode = '';
            s.mount = mount;
            Object.defineProperty(s, '_init', {
                value: init,
                iterable: false
            });
            Object.defineProperty(s, 'debug', {
                get: function get() {
                    return bss$1.debug
                },
                set: function set(value) {
                    bss$1.debug = value;
                }
            });

            function mount(dom, app, attrs) {
                if (attrs === void 0)
                    attrs = {};
                if (typeof dom === 'function') {
                    app = dom;
                    dom = document.body;
                    attrs = typeof app === 'function' ? {} : (app || {});
                }
                if (s.pathmode[0] === '#' && window.location.hash.indexOf(s.pathmode + '/') !== 0) {
                    window.location.hash = s.pathmode + '/';
                }
                if (s.pathmode[0] === '?' && window.location.search.indexOf(s.pathmode + '/') !== 0) {
                    window.location.search = s.pathmode + '/';
                }
                m.mount(dom, app && {
                    view: init(window.location, app, attrs).view
                });
            }

            function init(url, fn, attrs) {
                if (attrs === void 0)
                    attrs = {};
                attrs.route = s.route = router('', {
                    url: url,
                    notFound: s.stream(),
                    title: s.stream(window.document.title || ''),
                    head: s.stream()
                });
                attrs.route.title.map(function(x) {
                    return window.document.title = x;
                });
                return {
                    view: function() {
                        return call(fn(attrs), {});
                    },
                    route: attrs.route
                }
            }

            function call(a, args) {
                return !a ? a : Array.isArray(a) ? a.map(function(x) {
                    return call(x, args);
                }) : a && typeof a.then === 'function' ? m(promiser, args, a) : typeof a === 'function' ? call(a.constructor === Stream ? a() : a(args), args) : a.S === S ? a.comp ? component(a) : vnode(a) : a
            }

            function vnode(ref) {
                var tag = ref.tag;
                var selector = ref.selector;
                var styles = ref.styles;
                var args = ref.args;
                var ref$1 = normalize(args);
                var attrs = ref$1.attrs;
                var children = ref$1.children;
                addClasses(attrs, {
                    styles: styles
                });
                return m((tag || 'div') + selector, attrs, children.map(function(x) {
                    return call(x);
                }))
            }

            function component(x) {
                var ref = normalize(x.args);
                var attrs = ref.attrs;
                var children = ref.children;
                return m(cheater, attrs, x, children)
            }

            function cheater(ref) {
                var attrs = ref.attrs;
                var ref_children = ref.children;
                var x = ref_children[0];
                var rest = ref_children.slice(1);
                var life;
                var view = x.comp.fn(Object.assign({}, attrs, {
                    life: function(fn) {
                        return life = fn;
                    }
                }), rest[0]);
                if (view !== 'function' && typeof view.then === 'function') {
                    view.then(function(x) {
                        view = x;
                        s.redraw();
                    });
                }
                var component = {
                    oninit: function(_, wait) {
                        return wait && wait(view);
                    },
                    view: function(ref) {
                        var attrs = ref.attrs;
                        var children = ref.children;
                        life && (attrs.life = function() {});
                        var isFunction = typeof view === 'function';
                        return !isFunction && typeof view.then === 'function' ? call(x.comp.waiting) : view.tag || typeof view !== 'function' ? cheaterView(x.comp.fn(attrs, children[1]), [], x) : cheaterView(call(isFunction ? view(attrs, children[1]) : view), children, x)
                    }
                };
                life && giveLife(component, [].concat(life));
                return component
            }

            function cheaterView(vnode, children, x) {
                if (typeof vnode !== 'object' && x.tag) {
                    vnode = m(x.tag + x.selector, children[1]);
                } else {
                    vnode.tag && x.tag && (vnode.tag = x.tag);
                }
                if (x.selector) {
                    var ref = m('div' + x.selector);
                    var attrs = ref.attrs;
                    if (attrs === void 0)
                        attrs = {};
                    vnode.attrs = vnode.attrs || {};
                    for (var key in attrs) {
                        if ({}.hasOwnProperty.call(attrs, key) && key !== 'className') {
                            vnode.attrs[key] = attrs[key];
                        }
                    }
                    attrs.className && (vnode.attrs.className = (vnode.attrs.className || '') + ' ' + attrs.className);
                }
                if (x.styles.length) {
                    vnode.attrs = vnode.attrs || {};
                    addClasses(vnode.attrs, x);
                }
                return vnode
            }

            function addClasses(attrs, ref) {
                var styles = ref.styles;
                if (!styles.length) {
                    return
                }
                attrs.className = [].concat((attrs.class || []), (attrs.className || []), styles.map(function(ref) {
                    var xs = ref.xs;
                    var args = ref.args;
                    return bss$1.apply(void 0, [xs].concat(args.map(function(x) {
                        return [].concat(x).map(function(x) {
                            return x && x.S === S ? bss$1.apply(void 0, [x.styles].concat(x.args)) : (!x && x !== 0 ? '' : x);
                        });
                    })));
                })).join(' ');
                delete attrs.class;
            }

            function cleanSlash(x) {
                return String(x).replace(/\/+/g, '/').replace(/(.)\/$/, '$1')
            }

            function normalize(children) {
                var attrs = children[0] && typeof children[0] === 'object' && !Array.isArray(children[0]) && 'tag' in children[0] === false && children[0].S !== S ? children.shift() : {};
                var life = [].concat(attrs.life || []);
                if (attrs.href && !String(attrs.href).match(/^([a-z0-9+-.]+:|\/\/)/)) {
                    attrs.href = s.pathmode + cleanSlash(attrs.href);
                    life.push(link);
                }
                life.length && giveLife(attrs, life);
                delete attrs.life;
                return {
                    attrs: attrs,
                    children: children
                }
            }

            function giveLife(attrs, life) {
                return Object.assign(attrs, {
                    oncreate: function(v) {
                        return v.state && (v.state.attrs = s.stream(attrs),
                            v.state.rm = life.filter(function(x) {
                                return typeof x === 'function';
                            }).map(function(x) {
                                return x(v.dom, v.state.attrs);
                            }).filter(function(x) {
                                return typeof x === 'function';
                            }));
                    },
                    onupdate: function(v) {
                        return v.state && (v.state.attrs(attrs));
                    },
                    onremove: function(v) {
                        return v.state.rm && v.state.rm.map(function(x) {
                            return x(false);
                        });
                    },
                    onbeforeremove: function(v) {
                        return v.state && v.state.rm.length && Promise.all(v.state.rm.map(function(x) {
                            return x(true);
                        })).then(function() {
                            return v.state.rm = null;
                        });
                    }
                })
            }

            function promiser(ref) {
                var attrs = ref.attrs;
                var children = ref.children;
                var view;
                var settled = false;
                children[0].then(function(x) {
                    view = x && x.default || x;
                    settled = true;
                    m.redraw();
                });
                return {
                    oninit: function(_, wait) {
                        return wait && wait(children[0]);
                    },
                    view: function() {
                        return settled ? call(view, attrs) : call(attrs.waiting);
                    }
                }
            }

            function tagged(fn, ref) {
                if (ref === void 0)
                    ref = {};
                var tag = ref.tag;
                var selector = ref.selector;
                if (selector === void 0)
                    selector = '';
                var styles = ref.styles;
                if (styles === void 0)
                    styles = [];
                return function(xs) {
                    var args = [],
                        len = arguments.length - 1;
                    while (len-- > 0)
                        args[len] = arguments[len + 1];
                    if (Array.isArray(xs) && Array.isArray(xs.raw)) {
                        var ref = parse(xs);
                        var t = ref.t;
                        var a = ref.a;
                        var s = ref.s;
                        return tagged(fn, {
                            tag: t || tag,
                            selector: selector + a.trim(),
                            styles: s ? styles.concat({
                                xs: s,
                                args: args
                            }) : styles
                        })
                    }
                    return fn({
                        S: S,
                        tag: tag,
                        selector: selector,
                        styles: styles,
                        args: Array.from(arguments)
                    })
                }
            }

            function parse(xs) {
                if (cache$1.has(xs)) {
                    return cache$1.get(xs)
                }
                var ref = xs[0].match(/^([a-z]+)?([^\n\t ;]+)?([\s\S]*)/) || [];
                var t = ref[1];
                if (t === void 0)
                    t = '';
                var a = ref[2];
                if (a === void 0)
                    a = '';
                var rest = ref[3];
                if (rest === void 0)
                    rest = '';
                var result = {
                    t: t,
                    a: a,
                    s: (rest.trim() || xs.length > 1) && [rest].concat(xs.slice(1))
                };
                cache$1.set(xs, result);
                return result
            }

            function tokenizePath(x) {
                return x.split(/(?=\/)/)
            }

            function getScore(match, current) {
                return match.reduce(function(acc, x, i) {
                    return acc + (x === '404' ? 1 : x === current[i] ? 6 : x && current[i] && x.toLowerCase() === current[i].toLowerCase() ? 5 : x[1] === ':' && current[i] && current[i].length > 1 ? 4 : x === '/' && !current[i] ? 3 : x === '*' || x === '/*' ? 2 : -Infinity);
                }, 0)
            }

            function params(path, current) {
                return path.reduce(function(acc, x, i) {
                    x[1] === ':' && (acc[x.slice(2)] = current[i].slice(1));
                    return acc
                }, {})
            }

            function link(dom, attrs) {
                dom.addEventListener('click', function(e) {
                    if (!e.defaultPrevented && (e.button === 0 || e.which === 0 || e.which === 1) && (!e.currentTarget.target || e.currentTarget.target === '_self') && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                        e.preventDefault();
                        var state = attrs().state;
                        window.history.pushState(state, null, String(attrs().href));
                        routeState[String(attrs().href).slice(s.pathmode.length)] = state;
                        s.redraw();
                    }
                });
            }

            function reroute(path, options) {
                if (options === void 0)
                    options = {};
                s.pathmode[0] === '#' ? window.location.hash = s.pathmode + path : s.pathmode[0] === '?' ? window.location.search = s.pathmode + path : window.history[options.replace ? 'replaceState' : 'pushState'](options.state, null, s.pathmode + path);
                routeState[path] = options.state;
                s.redraw();
            }

            function getPath(location, x) {
                if (x === void 0)
                    x = 0;
                return (s.pathmode[0] === '#' ? location.hash.slice(s.pathmode.length + x) : s.pathmode[0] === '?' ? location.search.slice(s.pathmode.length + x) : location.pathname.slice(s.pathmode + x)).replace(/(.)\/$/, '$1')
            }

            function router(root, attrs) {
                Object.assign(route, attrs);
                route.toString = route;
                route.has = function(x) {
                    return x === '/' ? (getPath(route.url) === root || (getPath(route.url) === '/' && root === '')) : getPath(route.url).indexOf(cleanSlash(root + '/' + x)) === 0;
                };
                Object.defineProperty(route, 'current', {
                    get: function get() {
                        var path = getPath(route.url),
                            idx = path.indexOf('/', root.length + 1);
                        return idx === -1 ? path : path.slice(0, idx)
                    }
                });
                return route

                function route(routes, options) {
                    if (options === void 0)
                        options = {};
                    if (typeof routes === 'undefined') {
                        return root + '/'
                    }
                    if (typeof routes === 'string') {
                        return reroute(cleanSlash(routes[0] === '/' ? routes : '/' + routes), options)
                    }
                    if (!routing) {
                        routing = true;
                        s.pathmode[0] === '#' ? window.addEventListener('hashchange', function() {
                            return s.redraw();
                        }) : typeof window.history.pushState === 'function' && window.addEventListener('popstate', function() {
                            return s.redraw();
                        });
                    }
                    var path = getPath(route.url, root.length);
                    var pathTokens = tokenizePath(path);
                    var ref = Object.entries(routes).reduce(function(acc, ref) {
                        var match = ref[0];
                        var view = ref[1];
                        match = tokenizePath(cleanSlash(match));
                        var score = getScore(match, pathTokens);
                        return score > acc[0] ? [score, match, view] : acc
                    }, [0]);
                    var match = ref[1];
                    var view = ref[2];
                    if (view === void 0)
                        view = options.notFound;
                    var current = root + (match && match[0] !== '*' ? match.map(function(x, i) {
                        return pathTokens[i];
                    }).join('') : '');
                    if (view === undefined || options.notFound) {
                        route.notFound(true);
                    }
                    var subRoute = router(current.replace(/\/$/, ''), attrs);
                    subRoute.parent = route;
                    return m.fragment(m.fragment({
                        key: current
                    }, view && call(view, Object.assign({}, (root + path === current && routeState[root + path] || {}), params(match || [], pathTokens), {
                        route: subRoute
                    }))))
                }
            }
            return s;
        })));
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, _$main_45({}).setImmediate)
    _$sinUmd_43 = _$sinUmd_43.exports;
    var _$header_7 = _$sinUmd_43 `header.h-60.bg-gray-600.pl-30.pr-20.flex.flex-row.justify-end.items-center`;
    var _$vr_14 = _$sinUmd_43 `div.h-20.bg-gray-400.w-px`;

    function icon(svg) {
        return _$sinUmd_43((attrs) => _$sinUmd_43 `div.icon.fill-current` (attrs, _$sinUmd_43.trust(svg)))
    }
    var _$icons_8 = {
        arrowDown: icon("<svg width=\"6\" height=\"6\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 .5l-3 5-3-5z\" fill=\"#8D8EA0\" fill-rule=\"evenodd\"/></svg>"),
        arrowBack: icon("<svg width=\"14\" height=\"6\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.984 0L0 3l4.984 3 .001-2H14V2H4.985V0z\" fill=\"currentColor\" fill-rule=\"evenodd\"/></svg>"),
        attention: icon("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\"><path fill-rule=\"evenodd\" d=\"M10 0a10 10 0 110 20 10 10 0 010-20zm0 13.67c-.17 0-.34.04-.5.1a1.21 1.21 0 00-.66.68 1.36 1.36 0 00.27 1.43 1.24 1.24 0 00.9.37 1.23 1.23 0 001.14-.77 1.31 1.31 0 00-.66-1.7c-.15-.07-.32-.1-.49-.1zm1-9.92H9.06v4.9c0 .52.03 1.03.08 1.53s.11 1.02.2 1.58h1.37c.09-.56.15-1.09.2-1.58.05-.5.08-1.01.08-1.53v-4.9z\"/></svg>"),
        battle: icon("<svg width=\"18\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.43 3.226c1.75.791 3.505 1.571 5.262 2.346.197.086.272.183.222.398a20.63 20.63 0 00-.22 1.165c-.018.101-.218.546-.602 1.336L9 8.66l-2.379-.297-1.403-.518-1.078.815.295.135 4.072.62c1.61 1.174 2.584 1.8 2.924 1.878.22.051.327-.151.495 0 .61.552 1.196 1.129 1.819 1.722l2.73-2.391.05.028-.29 1.41c-.138.661-.41 1.493-.814 2.495l-.14.34-1.536.983L14.78 20H4.486l1-4.12C3.06 13.235 1.261 11.087.088 9.437c-.128-.18-.109-.28.009-.45a779.234 779.234 0 003.865-5.63c.138-.205.244-.232.468-.13zm11.694 3.376L18 8.849c-1.416 1.251-2.826 2.118-4.255 3.38-.561-.49-.898-.643-1.47-1.143a455.704 455.704 0 013.849-4.484zM13.15 4.377c1.1.749 1.958 1.33 2.572 1.743-.062.083-.11.153-.164.218-1.176 1.423-2.355 2.844-3.525 4.272-.13.158-.23.19-.42.097-.733-.358-1.342-1.114-2.11-1.476.814-1.203 2.03-2.82 3.647-4.854zm-2.975-2.642c1.29.766 2.282 1.36 2.975 1.784-.066.102-1.226 1.72-1.72 2.472-.219.335-.637.86-1.255 1.577l.303-1.696-.303-.553c-.77-.334-1.325-.596-1.668-.785-.056-.03-.137-.03-.244 0l1.912-2.799zM7.157 0a84.43 84.43 0 012.346 1.417L7.9 4.311 4.853 3.02 7.157 0z\"/></svg>"),
        bets: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11.11 8.805a1.344 1.344 0 00-1.2-.3c-.537-3.488-.047-5.99 1.471-7.51 2.56-2.559 5.534.416 5.412 2.212 1.796-.122 4.77 2.852 2.211 5.412a4.993 4.993 0 01-1.139.85c-1.593-.756-3.765-.869-6.503-.36a1.315 1.315 0 00-.146-.198l-.106-.106zm.064 1.952a1.4 1.4 0 00.354-1.217c3.491-.632 5.973-.213 7.445 1.26 2.486 2.486-.575 5.547-2.368 5.477.07 1.793-2.992 4.855-5.478 2.368a4.653 4.653 0 01-.915-1.31c.616-1.59.707-3.65.29-6.17.206-.056.403-.16.573-.31l.1-.098zm-2.007-1.81c-.297.334-.41.773-.335 1.18-3.508.64-6 .222-7.477-1.254-2.487-2.486.575-5.548 2.368-5.478-.07-1.793 2.991-4.854 5.478-2.368a4.6 4.6 0 01.817 1.115c-.804 1.622-.978 3.807-.543 6.544a1.43 1.43 0 00-.21.161l-.098.1zm.074 1.919c.227.207.51.321.802.342.61 3.638.135 6.237-1.424 7.796-2.56 2.56-5.534-.415-5.412-2.211-1.796.122-4.77-2.852-2.211-5.412a5.138 5.138 0 011.647-1.095c1.581.683 3.7.768 6.35.273.046.078.1.153.163.222l.085.085z\"/></svg>"),
        btc: icon("<svg viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"#FF9407\" cx=\"10\" cy=\"10\" r=\"10\"/><path d=\"M6.343 6.628c.291.001.576-.022.867-.02.291 0 .576-.023.867-.022.08.005.098-.026.103-.108-.013-.449-.02-.873-.034-1.321.005-.082.023-.113.103-.108.267.008.502-.002.762-.02.08.006.087.03.076.087.007.424.02.873.027 1.297.007.024.014.05.002.106.21-.004.446-.014.657-.018.024-.006.036-.063.054-.094a13.59 13.59 0 01-.005-1.01l-.005-.319c-.013-.05.005-.08.06-.07.267.009.527-.008.818-.007.025-.007.031.018.056.012.012.343.017.66.023.979.008.13.016.261 0 .399-.005.08.027.1.107.104l.913.153c.287.082.561.221.8.423.321.313.452.703.459 1.127-.001.294-.034.569-.178.82-.109.19-.28.342-.457.47-.025.006-.043.038-.092.051.118.048.23.071.349.12.355.143.625.363.816.684.122.26.177.564.176.858-.006.374-.05.705-.2 1.038a1.59 1.59 0 01-.866.82c-.498.214-1.004.297-1.517.356-.081-.005-.124.033-.129.114.007.424.021.873.028 1.297.002.106.009.131-.128.115-.235.01-.502.002-.737.012-.08-.005-.087-.03-.076-.086a18.894 18.894 0 01-.01-1.328c-.013-.05.005-.081-.05-.093-.211.004-.422.007-.657.018.01.236-.004.48.006.717s-.004.48.006.717c-.012.056-.005.081-.086.076-.266-.008-.526.01-.786.026-.08-.005-.087-.03-.076-.086a18.894 18.894 0 01-.01-1.328c-.006-.025.012-.057-.001-.106-.607.004-1.214.008-1.846.018.023-.112.028-.193.05-.306.04-.25.08-.5.1-.72.005-.08.03-.087.104-.107.186.003.396 0 .576-.022.21-.004.332-.143.31-.324a180.898 180.898 0 00-.08-4.077c-.004-.212-.187-.403-.429-.417-.241-.015-.477-.005-.687-.001-.05.013-.08-.005-.07-.061.002-.293-.003-.611-.002-.905-.079.101-.079.101-.06.07zm2.89 5.795c.025-.006.056.012.056.012.422-.007.874.004 1.3-.084.302-.055.574-.129.819-.301.429-.276.46-.95.084-1.274-.177-.165-.407-.236-.637-.307-.51-.129-1.055-.089-1.575-.055-.08-.005-.074.02-.078.101.016.262.002.506.019.767-.007.375.012.742.012 1.141zm1.398-3.092a1.56 1.56 0 00.258-.123.752.752 0 00.185-1.194c-.183-.19-.445-.28-.693-.32-.385-.055-.75-.036-1.147-.036-.08-.005-.098.027-.103.108.015.555.024 1.085.015 1.646-.011.057.02.075.076.086.105-.001.186.003.29.002.384-.05.725-.063 1.12-.169z\" fill=\"#FFF\"/></svg>"),
        chat: icon("<svg width=\"18\" height=\"17\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 0h12a3 3 0 013 3v8a3 3 0 01-3 3H8l-4 3v-3H3a3 3 0 01-3-3V3a3 3 0 013-3z\"/></svg>"),
        close: icon("<svg width=\"10\" height=\"10\" xmlns=\"http://www.w3.org/2000/svg\"><rect transform=\"rotate(45 5 5)\" x=\"4\" y=\"-1\" width=\"2\" height=\"12\" rx=\".5\"/><rect transform=\"rotate(-45 5 5)\" x=\"4\" y=\"-1\" width=\"2\" height=\"12\" rx=\".5\"/></svg>"),
        coins: icon("<svg width=\"20\" height=\"19\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"10\" cy=\"5.5\" rx=\"10\" ry=\"5.5\"/><path opacity=\".6\" d=\"M.165 8.5C1.02 11.06 5.098 13 10 13c4.902 0 8.98-1.94 9.835-4.5.108.324.165.659.165 1 0 3.038-4.477 5.5-10 5.5S0 12.538 0 9.5c0-.341.057-.676.165-1z\"/><path opacity=\".6\" d=\"M.165 12.5C1.02 15.06 5.098 17 10 17c4.902 0 8.98-1.94 9.835-4.5.108.324.165.659.165 1 0 3.038-4.477 5.5-10 5.5S0 16.538 0 13.5c0-.341.057-.676.165-1z\"/></svg>"),
        copy: icon("<svg width=\"19\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.667 5c.92 0 1.666.746 1.666 1.667v11.666c0 .92-.746 1.667-1.666 1.667h-10C5.747 20 5 19.254 5 18.333V6.667C5 5.747 5.746 5 6.667 5h10zm0 1.667h-10v11.666h10V6.667zM12.5 0a.833.833 0 110 1.667h-10a.833.833 0 00-.833.833v11.667a.833.833 0 01-1.667 0V.833C0 .373.373 0 .833 0H12.5z\"/></svg>"),
        crown: icon("<svg width=\"20\" height=\"14\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 1.687l-3.017 1.24c.234.422.367.907.367 1.423a2.964 2.964 0 01-2.97 2.957 2.964 2.964 0 01-2.97-2.957c0-.562.157-1.087.43-1.534L9.993 0v.005l-1.85 2.822c.27.445.425.966.425 1.523a2.964 2.964 0 01-2.97 2.957 2.964 2.964 0 01-2.97-2.957c0-.492.12-.956.334-1.364L0 1.692 3.498 14c2.165-1.741 4.33-2.612 6.495-2.612s4.33.871 6.496 2.612L20 1.687z\"/></svg>"),
        csgo: icon("<svg viewBox=\"0 0 15 20\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#1A1D29\" d=\"M-1011-358H429v780h-1440z\"/><path d=\"M5.817 0h.521a4.87 4.87 0 011.027.578c.102.439.279.906.126 1.355-.13.124-.308.175-.465.25.018.174.046.346.072.518.297-.026.586-.106.878-.164.04-.179.05-.373.16-.524.024.12.043.243.058.365.157.094.308.226.502.205 1.224.001 2.45-.003 3.673 0 .134-.01.198.137.291.212.003-.267.002-.534.014-.801l.144.003c.008.235-.017.475.047.704.068.016.138.021.208.03l.012.276c.376.011.756.037 1.13-.03.25-.038.504-.012.757-.011.004.091.012.183.028.274-.312.023-.628.044-.94-.009-.497-.062-.994.046-1.491.018l-.049.208c-.478.005-.956-.003-1.433 0-.159-.005-.333.03-.433.168-.14.18-.311.334-.446.518-.044.338.085.667.159.991-.113.042-.226.082-.336.125-.114.366-.07.834-.395 1.09-.18.139-.34.312-.545.41-.15.07-.31-.002-.461-.025-.562-.087-1.027-.442-1.528-.686-.033.14-.07.277-.106.415.152.102.348.188.399.387.076.29.012.596.001.893-.024.271-.031.545-.056.817-.025.264-.173.49-.326.696-.143-.036-.283-.078-.424-.116-.152.335-.026.752.225 1.001.652.728 1.005 1.666 1.336 2.579.057.193.25.307.282.51.055.216.133.432.115.658-.025.397-.053.794-.093 1.19-.026.29-.131.58-.07.873.047.24.075.492-.01.726-.115.294-.114.616-.115.928.005.205.016.43.155.594.164.208.324.423.52.6.244.164.578.165.778.402.063.129.018.28.017.418-.632.098-1.292.106-1.905-.097-.347-.115-.728.083-1.06-.112.019-.407.114-.804.254-1.184.058-.283-.005-.576-.01-.863-.005-.248-.13-.467-.177-.706-.137-.51-.176-1.043-.2-1.571-.03-.26.184-.455.193-.709a.805.805 0 00-.124-.64c-.234-.008-.551.056-.683-.203-.275-.418-.542-.842-.817-1.26-.096-.18-.325-.138-.483-.217-.14-.133-.21-.321-.298-.49-.05.193-.12.388-.26.535-.221.227-.3.544-.415.832a2.82 2.82 0 00-.181.645c-.031.168-.038.365-.185.475-.216.168-.293.45-.49.635-.147.144-.237.34-.285.54-.016.18.035.362-.01.54-.08.326-.254.613-.382.919-.091.215-.138.447-.238.658-.067.148-.237.196-.33.32a2.408 2.408 0 00-.26 1.596c.077.215.134.44.086.67-.166.024-.33.052-.498.068H.457c-.134-.029-.272-.05-.395-.115a1.624 1.624 0 01.006-.91c.121-.444.23-.89.34-1.335.073-.219-.101-.415-.086-.633-.017-.323.177-.588.318-.857.131-.24.085-.527.176-.78.207-.547.598-.992.831-1.526.072-.218-.005-.449.009-.673.017-.424.099-.843.17-1.261.024-.161.074-.332.014-.49-.065-.19-.11-.39-.085-.592.027-.186-.08-.37-.013-.552.035-.154.173-.24.283-.336.02-.633-.204-1.254-.11-1.885.107-.136.28-.186.43-.254a47.66 47.66 0 01-.658-.144 3.178 3.178 0 01.076-.757c.08-.389.037-.79.097-1.181.009-.1.114-.133.198-.137.2-.015.4-.025.596-.073-.058-.494-.107-.998.002-1.49.105-.58.358-1.168.832-1.527.326-.227.798-.36 1.139-.09l.112-.078c-.198-.55-.155-1.184.16-1.678.203-.338.56-.53.918-.646zm3.201 3.778c-.017.144-.06.286-.196.355.179-.012.36-.011.535-.051l-.011-.316c-.11.003-.22.006-.328.012zm-.37.406l-.06.08c.027.195.169.354.263.523.138-.199.277-.398.408-.601-.203-.01-.408-.024-.61-.002z\" fill=\"#E3E6EC\" fill-rule=\"nonzero\"/></g></svg>"),
        dollar: icon("<svg width=\"14\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5.759 19.883v-2.04c-2.113-.194-3.935-1.142-5.076-2.72l2.453-2.234c.825 1.092 2.137 1.894 3.667 1.894 1.141 0 2.234-.34 2.234-1.312 0-.922-.874-1.165-1.627-1.384l-2.696-.704C2.626 10.824 1.29 9.513 1.29 7.23c0-2.477 1.773-4.323 4.469-4.784V.333h2.817v2.113c1.773.243 3.254.947 4.055 2.258l-2.428 2.21C9.474 5.92 8.21 5.457 7.07 5.457c-1.069 0-1.919.437-1.919 1.336 0 .753.705.996 1.53 1.214l2.55.704c2.283.608 3.813 1.846 3.813 4.226 0 2.72-1.991 4.323-4.468 4.784v2.162H5.759z\"/></svg>"),
        edit: icon("<svg width=\"17\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.596.49l1.414 1.414a1 1 0 010 1.414l-1.9 1.9-2.828-2.829 1.9-1.9a1 1 0 011.414 0zM10.39 3.282l2.828 2.829-8.882 8.882a1 1 0 01-.538.278l-2.404.413a.5.5 0 01-.578-.578l.413-2.404a1 1 0 01.278-.538l8.882-8.882z\"/></svg>"),
        eth: icon("<svg viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><circle fill=\"#FFF\" cx=\"10\" cy=\"10\" r=\"10\"/><path d=\"M6 9.98l3.864 2.353a.355.355 0 00.176.042.355.355 0 00.176-.042L14 10.023c-.016.042-.016.084-.048.113l-3.704 5.07c-.048.085-.16.127-.256.127a.365.365 0 01-.255-.126l-3.69-5.071A.26.26 0 016 9.98zm3.737-5.197c.111-.155.399-.155.51 0l3.466 4.747-3.689 2.254-3.737-2.282z\"/></svg>"),
        lightning: icon("<svg width=\"14\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14 7.87H8.474L10.667 0 0 12.13h5.526L3.333 20z\" fill=\"#8D8EA0\" fill-rule=\"evenodd\"/></svg>"),
        lock: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M16.857 9.583h.072c.591 0 1.071.48 1.071 1.072v8.274C18 19.52 17.52 20 16.929 20H3.07C2.48 20 2 19.52 2 18.929v-8.274c0-.592.48-1.072 1.071-1.072h.071V6.25C3.143 2.798 6.213 0 10 0c3.787 0 6.857 2.798 6.857 6.25v3.333zM10 2.083c-2.525 0-4.571 1.866-4.571 4.167l-.001 3.333h9.143V6.25c0-2.301-2.046-4.167-4.571-4.167z\" fill-rule=\"evenodd\"/></svg>"),
        logout: icon("<svg width=\"20\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(0 -2)\"><rect y=\"2\" width=\"2\" height=\"16\" rx=\"1\"/><path d=\"M13 3a1 1 0 01-1 1H1V2h11a1 1 0 011 1zm2.278 3.278a1 1 0 011.414 0l3.015 3.015A1.006 1.006 0 0120 10v.033l-.004.052L20 10a1.008 1.008 0 01-.19.587.997.997 0 01-.103.12l.08-.09a1.006 1.006 0 01-.007.008l-.073.082-3.015 3.015a1 1 0 01-1.414-1.414l1.308-1.309L9 11a1 1 0 010-2h7.585l-1.307-1.308a1 1 0 01-.083-1.32zM13 17a1 1 0 01-1 1H1v-2h11a1 1 0 011 1z\"/></g></svg>"),
        mastercard: icon("<svg viewBox=\"0 0 61 38\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#FF5F00\" d=\"M21.918 4.692h17.855v28.76H21.918z\"/><path d=\"M23.757 19.075c-.005-5.612 2.607-10.914 7.083-14.378C23.237-1.196 12.317-.338 5.756 6.669a18.105 18.105 0 000 24.816c6.561 7.007 17.48 7.866 25.084 1.972-4.477-3.465-7.09-8.77-7.083-14.382z\" fill=\"#EB001B\"/><path d=\"M59.111 31.14v-1.195h.284v-.247h-.675v.247h.267v1.195h.124zm1.31 0v-1.442h-.205l-.238 1.03-.238-1.03h-.204v1.442h.148v-1.092l.22.938h.154l.22-.938v1.092h.142z\" fill=\"#F79E1B\" fill-rule=\"nonzero\"/><path d=\"M60.848 19.075c0 7.002-4.055 13.39-10.441 16.45-6.387 3.06-13.985 2.255-19.567-2.073 4.474-3.467 7.086-8.768 7.086-14.38S35.314 8.16 30.84 4.692C36.422.364 44.02-.441 50.407 2.619c6.386 3.06 10.44 9.448 10.44 16.45v.006z\" fill=\"#F79E1B\"/></g></svg>"),
        menu: icon("<svg width=\"18\" height=\"12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h18v2H0zm0 5h18v2H0zm0 4h18v2H0z\"/></svg>"),
        name: icon("<svg width=\"18\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4.43 3.226c1.75.791 3.505 1.571 5.262 2.346.197.086.272.183.222.398a20.63 20.63 0 00-.22 1.165c-.018.101-.218.546-.602 1.336L9 8.66l-2.379-.297-1.403-.518-1.078.815.295.135 4.072.62c1.61 1.174 2.584 1.8 2.924 1.878.22.051.327-.151.495 0 .61.552 1.196 1.129 1.819 1.722l2.73-2.391.05.028-.29 1.41c-.138.661-.41 1.493-.814 2.495l-.14.34-1.536.983L14.78 20H4.486l1-4.12C3.06 13.235 1.261 11.087.088 9.437c-.128-.18-.109-.28.009-.45a779.234 779.234 0 003.865-5.63c.138-.205.244-.232.468-.13zm11.694 3.376L18 8.849c-1.416 1.251-2.826 2.118-4.255 3.38-.561-.49-.898-.643-1.47-1.143a455.704 455.704 0 013.849-4.484zM13.15 4.377c1.1.749 1.958 1.33 2.572 1.743-.062.083-.11.153-.164.218-1.176 1.423-2.355 2.844-3.525 4.272-.13.158-.23.19-.42.097-.733-.358-1.342-1.114-2.11-1.476.814-1.203 2.03-2.82 3.647-4.854zm-2.975-2.642c1.29.766 2.282 1.36 2.975 1.784-.066.102-1.226 1.72-1.72 2.472-.219.335-.637.86-1.255 1.577l.303-1.696-.303-.553c-.77-.334-1.325-.596-1.668-.785-.056-.03-.137-.03-.244 0l1.912-2.799zM7.157 0a84.43 84.43 0 012.346 1.417L7.9 4.311 4.853 3.02 7.157 0z\"/></svg>"),
        player: icon("<svg width=\"18\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"9\" cy=\"5.4\" r=\"5.4\"/><path d=\"M14 10.582c2.412.727 4 1.964 4 3.368C18 16.187 13.97 20 9 20s-9-3.813-9-6.05c0-1.404 1.588-2.641 4-3.368A7.182 7.182 0 009 12.6c1.866 0 3.567-.71 4.846-1.875z\"/></svg>"),
        referrals: icon("<svg width=\"18\" height=\"16\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7.608 11.123l1.106 2.56.007.019a1.656 1.656 0 01-.89 2.166 1.696 1.696 0 01-2.21-.893l-1.664-3.852h3.651zM17.1-.001a.9.9 0 01.9.9v10.958a.9.9 0 01-1.216.843L8.97 9.768V2.99L16.784.057a.9.9 0 01.316-.058zM7.59 2.99v6.779H3.45C1.545 9.768 0 8.25 0 6.379c0-1.872 1.545-3.39 3.45-3.39h4.14z\"/></svg>"),
        roulette: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.007 20h-.021.021zm-4.42-4.993a6.641 6.641 0 003.998 1.683v3.3a9.961 9.961 0 01-6.35-2.633zm8.859.03l2.32 2.317a9.946 9.946 0 01-6.35 2.633v-3.295a6.647 6.647 0 004.03-1.655zm-11.071-4.62A6.634 6.634 0 005 14.412l-2.354 2.355a9.937 9.937 0 01-2.633-6.35h3.362zm16.614.002a9.96 9.96 0 01-2.634 6.348l-2.319-2.32a6.641 6.641 0 001.657-4.028zM7.533 6.283c.688 0 1.25.563 1.25 1.25 0 .213-.058.404-.15.58l.525.524c.25-.15.542-.237.846-.237.28 0 .55.08.796.213l.55-.555a1.254 1.254 0 011.15-1.742 1.25 1.25 0 010 2.5 1.25 1.25 0 01-.58-.15l-.512.517c.163.259.263.567.263.884 0 .3-.088.591-.242.841l.525.525c.175-.091.371-.15.58-.15.687 0 1.25.563 1.25 1.25a1.251 1.251 0 11-2.4-.491l-.542-.546a1.612 1.612 0 01-1.725-.025l-.484.483c.092.175.15.371.15.58a1.251 1.251 0 01-2.5 0 1.254 1.254 0 011.742-1.15l.52-.522a1.619 1.619 0 01.026-1.633l-.546-.546a1.251 1.251 0 11-.492-2.4zM.002 9.936v.128L0 10v-.032l.002-.032zm19.997.024L20 10v.02l-.001.02zM2.645 3.235L5.03 5.62a6.641 6.641 0 00-1.653 3.965H.011a9.96 9.96 0 012.634-6.35zm14.713.003a9.962 9.962 0 012.63 6.345h-3.3a6.63 6.63 0 00-1.68-3.995l2.35-2.35zM9.583.012V3.38a6.627 6.627 0 00-3.962 1.65L3.233 2.646A9.956 9.956 0 019.583.012zm.835-.001a9.96 9.96 0 016.35 2.636L14.413 5a6.641 6.641 0 00-3.996-1.626zM10.041 0l.041.001h-.164L10 0l.041.001z\"/></svg>"),
        search: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19.567 17.334l-.027-.027-3.865-3.861a8.475 8.475 0 001.514-4.86C17.189 3.86 13.324 0 8.594 0S0 3.86 0 8.586c0 4.725 3.865 8.586 8.594 8.586a8.7 8.7 0 004.865-1.512l3.865 3.86a1.551 1.551 0 002.216.028 1.597 1.597 0 00.027-2.214zM8.594 14.85c-3.459 0-6.27-2.808-6.27-6.264a6.271 6.271 0 0112.54 0 6.271 6.271 0 01-6.27 6.264z\"/></svg>"),
        settings: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 13.334a3.333 3.333 0 110-6.667 3.333 3.333 0 010 6.667m9-5.01l-1.545-.316a.408.408 0 01-.307-.283 7.117 7.117 0 00-.488-1.168.411.411 0 01.017-.42l.87-1.315a1.25 1.25 0 00-.158-1.574l-.637-.637a1.249 1.249 0 00-1.572-.159l-1.317.873a.415.415 0 01-.42.015 7.055 7.055 0 00-1.168-.486.41.41 0 01-.281-.31l-.317-1.542A1.249 1.249 0 0010.452 0h-.904c-.596 0-1.106.418-1.225 1.002l-.317 1.543a.41.41 0 01-.281.309c-.405.128-.794.29-1.168.486a.415.415 0 01-.42-.015L4.82 2.452a1.249 1.249 0 00-1.572.159l-.637.637a1.25 1.25 0 00-.159 1.574l.871 1.315a.411.411 0 01.017.42 7.15 7.15 0 00-.488 1.168.408.408 0 01-.307.283L1 8.323c-.582.119-1 .63-1 1.225v.904a1.25 1.25 0 001 1.226l1.545.316c.147.03.263.138.307.281.128.405.291.796.488 1.168a.411.411 0 01-.017.42l-.87 1.317a1.249 1.249 0 00.158 1.572l.637.637a1.25 1.25 0 001.572.159l1.317-.871a.415.415 0 01.42-.017c.374.198.763.36 1.168.488.143.044.252.16.281.307L8.323 19c.119.583.63 1 1.225 1h.904c.596 0 1.106-.417 1.225-1l.317-1.545a.406.406 0 01.281-.307c.405-.128.794-.29 1.168-.488a.415.415 0 01.42.017l1.317.87a1.249 1.249 0 001.572-.158l.637-.637a1.25 1.25 0 00.159-1.572l-.871-1.317a.411.411 0 01-.017-.42c.197-.372.36-.763.488-1.168a.406.406 0 01.307-.281L19 11.678c.582-.118 1-.63 1-1.226v-.904a1.25 1.25 0 00-1-1.225\"/></svg>"),
        skull: icon("<svg width=\"16\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.96 10.886c0-1.266-.516-1.266-.774-2.025-.206-.605.12-1.17.473-1.805 1.28-1.65.82 4.336.82 4.336 1.523-4.81-.777-8.101-.777-8.101C12.902.517 9.055.004 8.006 0h-.012c-1.05.004-4.897.517-6.696 3.291 0 0-2.3 3.291-.777 8.102 0 0-.46-5.988.82-4.337.353.636.678 1.2.473 1.805-.258.76-.774.76-.774 2.025 0 1.266-.258 1.52-.516 1.772-.258.254-.258.507 0 1.266.258.76.516 1.266 1.29 1.772.774.507.774.76 1.806.253 1.032-.506 1.29-.253 1.29-.253-.258.253-.305 2.532-.305 3.038 0 .505 2.08 1.26 3.295 1.266 1.418-.005 3.395-.761 3.395-1.266 0-.506.027-2.785-.232-3.038 0 0 .272-.253 1.304.253 1.032.507 1.039.253 1.812-.253.774-.506 1.035-1.013 1.294-1.772.257-.76.259-1.013.001-1.266-.258-.253-.514-.506-.514-1.772zm-9.018 2.532c-.774.506-1.806 1.013-2.838.76-1.032-.254-.516-.507-1.032-1.773s-.258-1.772.258-2.278c.516-.507 1.548-.253 2.838.506 2.58 1.519 1.548 2.278.774 2.785zm2.773 3.29c-.58.19-.612-.33-.815-.92v-.598c0 .15.006.31 0 .467-.006-.158 0-.317 0-.467v.597c0 .592-.135 1.111-.715.922-.774-.253-.492-1.266-.234-2.025.257-.757.525-1.701 1.038-1.708.511.007.748.951 1.005 1.708.258.759.495 1.772-.28 2.025zm5.213-4.303c-.516 1.266 0 1.519-1.032 1.772-1.032.253-2.064-.253-2.838-.76-.774-.506-1.806-1.265.774-2.784 1.29-.76 2.322-1.013 2.838-.507.516.507.774 1.013.258 2.28z\"/></svg>"),
        steam: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.875 0C4.669 0 .405 4.05 0 9.197l5.311 2.216a2.768 2.768 0 011.735-.487L9.408 7.47v-.049c0-2.079 1.676-3.77 3.737-3.77 2.06 0 3.736 1.691 3.736 3.77 0 2.08-1.676 3.772-3.736 3.772-.029 0-.057 0-.085-.002l-3.37 2.425a2.8 2.8 0 01.004.134c0 1.562-1.258 2.832-2.804 2.832a2.815 2.815 0 01-2.75-2.273l-3.8-1.585c1.177 4.197 4.999 7.274 9.535 7.274 5.473 0 9.909-4.477 9.909-10 0-5.52-4.436-9.998-9.91-9.998zM6.21 15.173l-1.217-.508a2.1 2.1 0 001.084 1.041 2.1 2.1 0 002.752-1.144 2.13 2.13 0 00.004-1.625 2.102 2.102 0 00-1.137-1.152 2.082 2.082 0 00-1.552-.024l1.258.525a1.569 1.569 0 01.834 2.045 1.544 1.544 0 01-2.026.842zm9.425-7.75c0-1.386-1.118-2.514-2.49-2.514-1.373 0-2.49 1.128-2.49 2.513 0 1.386 1.117 2.513 2.49 2.513 1.372 0 2.49-1.127 2.49-2.513zm-4.357-.005a1.88 1.88 0 011.87-1.887 1.88 1.88 0 011.871 1.887 1.88 1.88 0 01-1.87 1.887 1.88 1.88 0 01-1.87-1.887z\"/></svg>"),
        time: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zM9 11h6a1 1 0 000-2l-4-.001V6a1 1 0 00-.883-.993L10 5a1 1 0 00-1 1v5z\"/></svg>"),
        transactions: icon("<svg width=\"20\" height=\"19\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"10\" cy=\"5.5\" rx=\"10\" ry=\"5.5\"/><path d=\"M.165 8.5C1.02 11.06 5.098 13 10 13c4.902 0 8.98-1.94 9.835-4.5.108.324.165.659.165 1 0 3.038-4.477 5.5-10 5.5S0 12.538 0 9.5c0-.341.057-.676.165-1z\"/><path d=\"M.165 12.5C1.02 15.06 5.098 17 10 17c4.902 0 8.98-1.94 9.835-4.5.108.324.165.659.165 1 0 3.038-4.477 5.5-10 5.5S0 16.538 0 13.5c0-.341.057-.676.165-1z\"/></svg>"),
        trophy: icon("<svg width=\"20\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M14.222 16.131V18H5.778v-1.869h8.444zM16.011 0c.01.363.012.742.006 1.13.702-.27 1.446-.364 2.091-.218.954.215 1.601.886 1.824 1.888.29 1.309-.349 2.809-1.798 4.225-1.142 1.116-2.674 2.044-4.291 2.617-.67.968-1.528 1.747-2.617 2.221.159.594.715 2.314 2.062 3.366H6.712c1.346-1.052 1.903-2.772 2.062-3.366-1.089-.474-1.947-1.253-2.617-2.22-1.618-.574-3.15-1.502-4.291-2.618C.416 5.61-.222 4.11.068 2.8.29 1.798.938 1.127 1.892.912c.645-.146 1.39-.052 2.09.218A25 25 0 013.99 0zM4.061 2.75c-.595-.377-1.316-.567-1.868-.442-.419.095-.661.352-.762.809-.172.775.352 1.849 1.4 2.874.638.624 1.42 1.178 2.273 1.632-.593-1.52-.909-3.233-1.044-4.874zm13.746-.441c-.553-.125-1.274.065-1.867.44-.135 1.64-.451 3.354-1.044 4.874A9.982 9.982 0 0017.17 5.99c1.048-1.025 1.572-2.099 1.4-2.874-.101-.457-.343-.714-.762-.808z\"/></svg>"),
        verified: icon("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 509.6 509.6\"><path d=\"M34.3 333.3c8 6.7 14.8 15.2 14.1 21A93.6 93.6 0 00140 459.7c6.3 0 12.5-.7 18.4-2 10-2 21.8 2 29 9.8a90.6 90.6 0 00137.7-3.1 27 27 0 0128.3-8.5 89.6 89.6 0 0025.7 3.7c51 0 92.3-42.4 92.3-94.8 0-5.9-.6-11.6-1.6-17.2a34 34 0 0110.5-28.3 95.6 95.6 0 0029.3-69.3 95.5 95.5 0 00-34.3-73.7c-8-6.7-14.8-15.2-14.1-21A93.6 93.6 0 00369.6 50c-6.3 0-12.5.7-18.4 2a32 32 0 01-29-9.8 90.6 90.6 0 00-67.4-30.4 90.6 90.6 0 00-67.5 30.4 32 32 0 01-28.9 9.8c-6-1.3-12-2-18.3-2A93.6 93.6 0 0049 159.8c1.2 8-4.5 18.1-12.8 24.6A95.5 95.5 0 000 259.6a95.6 95.6 0 0034.3 73.7zm97.2-70.3c2-3.6 7.2-3.7 12 .5l48.1 34c2.7 1.5 5.1 2.3 7.5 2.3 5 0 9-3.6 12.7-7l154-154.1c9.7-10.5 19-14.2 25.1-10.2 2.8 1.9 4.7 4.7 5.2 7.9.5 3.8-.8 8-3.8 11.6L207 372.9c-2.6 3.2-6 5-9.6 5-4.2 0-8-2.5-10.4-6.8l-54.3-98c-2.3-3.7-2.8-7.5-1.3-10z\"/></svg>"),
        visa: icon("<svg viewBox=\"0 0 79 26\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><path fill=\"#1767EE\" d=\"M34.24 24.74H27.87L31.854.74h6.371zM57.337 1.328C56.081.842 54.087.306 51.623.306c-6.292 0-10.723 3.268-10.75 7.94-.053 3.446 3.172 5.36 5.584 6.51 2.465 1.175 3.303 1.941 3.303 2.988-.025 1.608-1.992 2.349-3.827 2.349-2.543 0-3.906-.382-5.978-1.277l-.839-.383-.891 5.387c1.494.663 4.247 1.251 7.106 1.277 6.685 0 11.037-3.217 11.089-8.196.025-2.732-1.677-4.825-5.348-6.535-2.229-1.098-3.593-1.839-3.593-2.962.026-1.021 1.154-2.068 3.67-2.068 2.07-.05 3.593.434 4.746.92l.576.254.866-5.182z\"/><path d=\"M65.806 16.238c.524-1.379 2.543-6.715 2.543-6.715-.026.051.524-1.404.839-2.297l.445 2.068s1.206 5.744 1.468 6.944h-5.295zM73.67.74h-4.928c-1.52 0-2.674.434-3.33 1.991L55.948 24.74h6.685l1.337-3.6h8.18c.184.843.761 3.6.761 3.6h5.9L73.67.74z\" fill=\"#1767EE\" fill-rule=\"nonzero\"/><path d=\"M22.547.741l-6.24 16.365-.682-3.32c-1.153-3.829-4.771-7.99-8.808-10.058l5.715 20.986h6.738L29.284.74h-6.737z\" fill=\"#1767EE\"/><path d=\"M10.513.741H.263l-.106.485C8.154 3.218 13.45 8.018 15.625 13.788l-2.228-11.03C13.03 1.227 11.903.793 10.513.742z\" fill=\"#EC982D\"/></g></svg>"),
        wing: icon("<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5.916 19.277C3.822 20.5.796 19.922 0 19.352c1.21-1.113 5.88-5.92 5.462-13.405C9.079 5.303 16.359 3.76 19.84 0c.106.476.16.962.16 1.45 0 5.094-6.178 8.2-10.065 7.63a16.354 16.354 0 005.422 1.068c1.509.002 3.007-.24 4.438-.717-.654 3.511-3.338 5.831-6.701 5.831-1.888 0-4.674-.841-5.774-2.342.844 2.195 4.16 3.63 6.757 3.9-.979 1.419-2.817 1.931-4.578 1.931-1.613 0-3.338-1.313-4.324-2.505-.112 1.082.434 2.414.74 3.03z\"/></svg>")
    };
    const {
        coins
    } = _$icons_8
    var _$balance_3 = (attrs) => _$sinUmd_43 `div.relative` ([coins `.absolute.inset-y-auto.text-yellow.top-0.bottom-0.m-auto.h-20` ({
        style: 'transform: scale(0.7); left: 15px'
    }), _$sinUmd_43 `input.bg-gray-700.border.border-gray-400.h-40.p-16.text-gray-100.font-body.focus:outline-none.pl-40.w-140.text-sm.rounded.font-numeric
    box-sizing border-box
  ` (attrs)]);
    const large = (btn) => btn `.h-50`
    const medium = (btn) => btn `.h-40`
    const small = (btn) => btn `.h-30.px-10`
    const buttonGreen = _$sinUmd_43 `button.bg-green.text-gray-800.fill-current.font-body.font-bold.text-sm.flex.items-center.text-center.justify-center.rounded
  transition: box-shadow 125ms, background 125ms;
  box-shadow:
    0 4px 10px 0 rgba(0,0,0,0.30),
    inset 0 -3px 0 0 #2D9400,
    inset 0 1px 0 0 #64DD2F;

  :enabled:hover, :enabled:focus {
    background: #57DE1B;
    outline: none;
  }

  :enabled:active {
    background: #44B312;
    box-shadow: none;
  }

  :disabled {
    opacity: 0.5;
  }
`
    buttonGreen.large = large(buttonGreen)
    buttonGreen.medium = medium(buttonGreen)
    buttonGreen.small = small(buttonGreen)
    const buttonGray = _$sinUmd_43 `button.bg-gray-200.text-gray-800.fill-current.font-body.font-bold.text-sm.flex.items-center.text-center.justify-center.rounded
  transition: box-shadow 125ms, background 125ms;
  box-shadow:
    0 4px 10px 0 rgba(0,0,0,0.30),
    inset 0 -3px 0 0 #616278,
    inset 0 1px 0 0 #A2A3B6;

  :enabled:hover, :enabled:focus {
    background: #ABACC2;
    outline: none;
  }

  :enabled:active {
    background: #7E7F8F;
    box-shadow: none;
  }

  :disabled {
    opacity: 0.5;
  }
`
    buttonGray.large = large(buttonGray)
    buttonGray.medium = medium(buttonGray)
    buttonGray.small = small(buttonGray)
    const buttonYellow = _$sinUmd_43 `button.bg-yellow.text-gray-800.fill-current.font-body.font-bold.text-sm.flex.items-center.text-center.justify-center.rounded
  transition: box-shadow 125ms, background 125ms;
  box-shadow: 0 4px 10px 0 rgba(0,0,0,0.30),
    inset 0 -3px 0 0 #C78508,
    inset 0 1px 0 0 #FFCA42;

  :enabled:hover, :enabled:focus {
    background: #FFBE19;
    outline: none;
  }

  :enabled:active {
    background: #ED9C00;
    box-shadow: none;
  }

  :disabled {
    opacity: 0.5;
  }
`
    buttonYellow.large = large(buttonYellow)
    buttonYellow.medium = medium(buttonYellow)
    buttonYellow.small = small(buttonYellow)
    const buttonFlat = _$sinUmd_43 `button.bg-gray-400.text-gray-100.fill-current.font-body.font-bold.text-sm.flex.items-center.text-center.justify-center.rounded
  transition: box-shadow 125ms, background 125ms;
  :enabled:hover, :enabled:focus {
    background: #43495C;
    outline: none;
  }

  &.active:focus, :enabled:active {
    background: #141722;
  }

  :disabled {
    opacity: 0.5;
  }
`
    buttonFlat.large = large(buttonFlat)
    buttonFlat.medium = medium(buttonFlat)
    buttonFlat.small = small(buttonFlat)
    const buttonLink = _$sinUmd_43 `button.text-gray-200.fill-current.font-body.font-bold.text-sm.flex.items-center.text-center.justify-center.rounded
  transition: color 125ms, background 125ms;
  :enabled:hover, :enabled:focus {
    color: var(--color-yellow);
    outline: none;
  }

  :enabled:active {
    background: var(--color-gray-800);
  }

  :disabled {
    opacity: 0.5;
  }
`
    buttonLink.large = large(buttonLink)
    buttonLink.medium = medium(buttonLink)
    buttonLink.small = small(buttonLink)
    var _$button_4 = {
        buttonGreen,
        buttonGray,
        buttonYellow,
        buttonFlat,
        buttonLink
    }
    var _$dist_38 = {
        exports: {}
    };
    (function(global, factory) {
        typeof _$dist_38.exports === 'object' && "object" !== 'undefined' ? _$dist_38.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self,
            global.PersistentWebSocket = factory());
    }(this, (function() {
        'use strict';

        function index(url, protocols, WebSocket, options) {
            if (typeof protocols === 'function') {
                if (typeof WebSocket === 'object') {
                    options = WebSocket;
                }
                WebSocket = protocols;
                protocols = undefined;
            }
            if (!Array.isArray(protocols) && typeof protocols === 'object') {
                options = protocols;
                protocols = undefined;
            }
            if (typeof WebSocket === 'object') {
                options = WebSocket;
                WebSocket = undefined;
            }
            var browser = typeof window !== 'undefined' && window.WebSocket;
            if (browser) {
                WebSocket = WebSocket || window.WebSocket;
                typeof window !== 'undefined' && typeof window.addEventListener === 'function' && window.addEventListener('online', connect);
            }
            if (!WebSocket) {
                throw new Error('Please supply a websocket library to use')
            }
            if (!options) {
                options = {};
            }
            var connection = null,
                reconnecting = false,
                reconnectTimer = null,
                heartbeatTimer = null,
                binaryType = null,
                closed = false,
                lastOpen = null,
                reconnectDelay;
            var listeners = {};
            var listenerHandlers = {};
            var ons = {};
            var onHandlers = {};
            var pws = {
                CONNECTING: 'CONNECTING' in WebSocket ? WebSocket.CONNECTING : 0,
                OPEN: 'OPEN' in WebSocket ? WebSocket.OPEN : 1,
                CLOSING: 'CLOSING' in WebSocket ? WebSocket.CLOSING : 2,
                CLOSED: 'CLOSED' in WebSocket ? WebSocket.CLOSED : 3,
                get readyState() {
                    return connection.readyState
                },
                get protocol() {
                    return connection.protocol
                },
                get extensions() {
                    return connection.extensions
                },
                get bufferedAmount() {
                    return connection.bufferedAmount
                },
                get binaryType() {
                    return connection.binaryType
                },
                set binaryType(type) {
                    binaryType = type;
                    connection.binaryType = type;
                },
                connect: connect,
                url: url,
                retries: 0,
                pingTimeout: 'pingTimeout' in options ? options.pingTimeout : false,
                maxTimeout: options.maxTimeout || 5 * 60 * 1000,
                maxRetries: options.maxRetries || 0,
                nextReconnectDelay: options.nextReconnectDelay || function reconnectTimeout(retries) {
                    return Math.min((1 + Math.random()) * Math.pow(1.5, retries) * 1000, pws.maxTimeout)
                },
                send: function() {
                    connection.send.apply(connection, arguments);
                },
                close: function() {
                    clearTimeout(reconnectTimer);
                    closed = true;
                    connection.close.apply(connection, arguments);
                },
                onopen: options.onopen,
                onmessage: options.onmessage,
                onclose: options.onclose,
                onerror: options.onerror
            };
            var on = function(method, events, handlers) {
                return function(event, fn, options) {
                    function handler(e) {
                        options && options.once && connection[method === 'on' ? 'off' : 'removeEventListener'](event, handler);
                        e && typeof e === 'object' && reconnectDelay && (e.reconnectDelay = reconnectDelay);
                        fn.apply(pws, arguments);
                    }
                    event in events ? events[event].push(fn) : (events[event] = [fn]);
                    event in handlers ? handlers[event].push(handler) : (handlers[event] = [handler]);
                    connection && connection[method](event, handler);
                };
            };
            var off = function(method, events, handlers) {
                return function(event, fn) {
                    var index = events[event].indexOf(fn);
                    if (index === -1) {
                        return
                    }
                    connection && connection[method](event, handlers[event][index]);
                    events[event].splice(index, 1);
                    handlers[event].splice(index, 1);
                };
            };
            pws.addEventListener = on('addEventListener', listeners, listenerHandlers);
            pws.removeEventListener = off('removeEventListener', listeners, listenerHandlers);
            pws.on = on('on', ons, onHandlers);
            pws.off = off('off', ons, onHandlers);
            pws.once = function(event, fn) {
                return pws.on(event, fn, {
                    once: true
                });
            };
            if (url) {
                connect();
            }
            return pws

            function connect(url) {
                closed = false;
                clearTimeout(reconnectTimer);
                if (typeof url === 'string') {
                    pws.url = url;
                }
                if (connection && connection.readyState !== 3) {
                    return close(4665, 'Manual connect initiated')
                }
                reconnecting = false;
                url = typeof pws.url === 'function' ? pws.url(pws) : pws.url;
                connection = browser ? protocols ? new WebSocket(url, protocols) : new WebSocket(url) : new WebSocket(url, protocols, options);
                connection.onclose = onclose;
                connection.onerror = onerror;
                connection.onopen = onopen;
                connection.onmessage = onmessage;
                Object.keys(listenerHandlers).forEach(function(event) {
                    listenerHandlers[event].forEach(function(handler) {
                        return connection.addEventListener(event, handler);
                    });
                });
                Object.keys(onHandlers).forEach(function(event) {
                    onHandlers[event].forEach(function(handler) {
                        return connection.on(event, handler);
                    });
                });
                if (binaryType) {
                    connection.binaryType = binaryType;
                }
            }

            function onclose(event, emit) {
                clearTimeout(heartbeatTimer);
                event.reconnectDelay = Math.ceil(reconnect());
                lastOpen = null;
                pws.onclose && pws.onclose.apply(pws, arguments);
            }

            function onerror(event) {
                if (!event) {
                    event = new Error('UnknownError');
                }
                event.reconnectDelay = Math.ceil(reconnect());
                pws.onerror && pws.onerror.apply(pws, arguments);
            }

            function onopen(event) {
                pws.onopen && pws.onopen.apply(pws, arguments);
                heartbeat();
                lastOpen = Date.now();
            }

            function onmessage(event) {
                pws.onmessage && pws.onmessage.apply(pws, arguments);
                heartbeat();
            }

            function heartbeat() {
                if (!pws.pingTimeout) {
                    return
                }
                clearTimeout(heartbeatTimer);
                heartbeatTimer = setTimeout(timedOut, pws.pingTimeout);
            }

            function timedOut() {
                close(4663, 'No heartbeat received within ' + pws.pingTimeout + 'ms');
            }

            function reconnect() {
                if (closed) {
                    return
                }
                if (reconnecting) {
                    return reconnectDelay - (Date.now() - reconnecting)
                }
                reconnecting = Date.now();
                pws.retries = lastOpen && Date.now() - lastOpen > reconnectDelay ? 1 : pws.retries + 1;
                if (pws.maxRetries && pws.retries >= pws.maxRetries) {
                    return
                }
                reconnectDelay = pws.nextReconnectDelay(pws.retries);
                reconnectTimer = setTimeout(connect, reconnectDelay);
                return reconnectDelay
            }

            function close(code, reason) {
                setTimeout(clean, 0, connection);
                var event = closeEvent(code, reason);
                onclose(event);
                listenerHandlers.close && listenerHandlers.close.forEach(function(handler) {
                    return handler(event);
                });
                onHandlers.close && onHandlers.close.forEach(function(handler) {
                    return handler(code, reason, reconnectDelay);
                });
            }

            function clean(connection) {
                connection.onclose = connection.onopen = connection.onerror = connection.onmessage = null;
                Object.keys(listenerHandlers).forEach(function(event) {
                    listenerHandlers[event].forEach(function(handler) {
                        return connection.removeEventListener(event, handler);
                    });
                });
                Object.keys(onHandlers).forEach(function(event) {
                    onHandlers[event].forEach(function(handler) {
                        return connection.off(event, handler);
                    });
                });
                connection.close();
            }

            function closeEvent(code, reason) {
                var event;
                if (typeof window !== 'undefined' && window.CloseEvent) {
                    event = new window.CloseEvent('HeartbeatTimeout', {
                        wasClean: true,
                        code: code,
                        reason: reason
                    });
                } else {
                    event = new Error('HeartbeatTimeout');
                    event.code = code;
                    event.reason = reason;
                }
                return event
            }
        }
        return index;
    })));
    _$dist_38 = _$dist_38.exports
    var _$websocket_28 = {};;;
    const encoder = new TextEncoder('utf8')
    const decoder = new TextDecoder('utf8')
    const WS = _$websocket_28 = {
        channels: new Map(),
        socket: null,
        connected: false,
        queue: [],
        inflight: new Map(),
        listen(ch, listener) {
            var chs = WS.channels.get(ch)
            if (chs == null) {
                chs = []
                WS.channels.set(ch, chs)
            }
            chs.push(listener)
            return function() {
                var idx = chs.indexOf(listener)
                if (idx < 0)
                    return
                chs.splice(idx, 1)
            }
        },
        connect() {
            if (WS.socket)
                return
            WS.socket = new _$dist_38(`${"wss://ws.rollbit.com"}/`, {
                maxTimeout: 1000 * 5
            })
            WS.socket.binaryType = 'arraybuffer'
            WS.socket.onmessage = WS.onmessage
            WS.socket.onopen = WS.onopen
            WS.socket.onclose = WS.onclose
        },
        onopen() {
            WS.connected = true
            while (WS.queue.length)
                WS.socket.send(encoder.encode(WS.queue.shift()))
            _$sinUmd_43.redraw()
        },
        onclose() {
            WS.connected = false
            _$sinUmd_43.redraw()
        },
        onmessage(ev) {
            const [ch, message, id] = JSON.parse(typeof ev.data === 'string' ? ev.data : decoder.decode(ev.data))
            if (id) {
                var cb = WS.inflight.get(id)
                if (cb)
                    cb(ch, message)
            }
            var listeners = WS.channels.get(ch)
            if (listeners && listeners.length)
                listeners.forEach(l => l(message))
        },
        send(ch, message, cb, immediate = false) {
            if (WS.socket == null)
                WS.connect()
            var id = Math.random().toString(36)
            const payload = JSON.stringify([ch, message, id])
            const isConnected = WS.socket.readyState === 1
            if (immediate && !isConnected)
                return
            if (cb != null)
                WS.inflight.set(id, cb)
            if (!isConnected)
                return WS.queue.push(payload)
            WS.socket.send(encoder.encode(payload))
        }
    }
    var _$auth_21 = {};;;
    const User = _$auth_21 = {
        profile: window.__session.user,
        missingTermsOfService: window.__session.missingTermsOfService,
        country: window.__session.country,
        listeners: [],
        listen(listener) {
            User.listeners.push(listener)
            return function() {
                var idx = User.listeners.indexOf(listener)
                if (idx < 0)
                    return
                User.listeners.splice(idx, 1)
            }
        },
        setSocket(socket) {
            socket.listen('user', (profile) => {
                User.profile = profile
                _$sinUmd_43.redraw()
            })
        },
        login: function() {
            const win = window.open("https://api.rollbit.com" + '/auth', 'Rollbit - Steam Login', 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes')

            function recv(event) {
                if (event.origin !== "https://api.rollbit.com")
                    return
                const {
                    user, missingTermsOfService, incentive, country
                } = JSON.parse(atob(event.data))
                User.profile = user
                User.missingTermsOfService = missingTermsOfService
                User.country = country
                if (User.profile)
                    User.profile.info = Object.assign(User.profile.info || {}, {
                        incentive
                    })
                for (var i = 0; i < User.listeners.length; i++)
                    User.listeners[i]()
                win.close()
                _$websocket_28.socket.connect()
                _$sinUmd_43.redraw()
            }
            window.addEventListener('message', recv, false)
            const timer = setInterval(function() {
                if (win.closed) {
                    clearInterval(timer)
                    window.removeEventListener('message', recv)
                }
            }, 1000)
        }
    }
    var _$balance_22 = {};;;
    const Balance = _$balance_22 = {
        balance: 0,
        deposited: 0,
        async tip(to, amount, token) {
            const {
                error, success, balance
            } = await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/tip',
                withCredentials: true,
                body: {
                    to, amount, token
                }
            })
            if (success)
                Balance.balance = balance
            if (error) {
                return error
            }
        },
        async tipSteam(to, amount, token) {
            const {
                error, success, balance
            } = await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/tip-steamid',
                withCredentials: true,
                body: {
                    to, amount, token
                }
            })
            if (success)
                Balance.balance = balance
            if (error) {
                return error
            }
        },
        async refresh() {
            const {
                balance, deposited
            } = await _$sinUmd_43.request({
                method: 'GET',
                url: "https://api.rollbit.com" + '/balance',
                withCredentials: true
            })
            Balance.balance = balance
            Balance.deposited = deposited
        },
        connect(socket) {
            socket.listen('balance', ({
                balance, deposited
            }) => {
                Balance.balance = balance
                Balance.deposited = deposited
            })
        }
    };;
    var _$modal_10 = _$sinUmd_43(({
        onclose, darkMode = false, ...attrs
    }, children) => _$sinUmd_43 `.modal.fixed.inset-0.z-50.overflow-auto.flex
  bc rgba(20, 23, 34, 0.6)

  animation 125ms ease-in {
    from {
      o 0
    }

    to {
      o 1
    }
  }
` ({
        onclicks: onclose
    }, _$sinUmd_43 `.relative.m-auto.flex.flex-col.items-center
    bc ${darkMode ? 'var(--color-gray-600)' : 'var(--color-gray-400)'}
    max-height calc(100vh - 60px)
    transform: translateZ(0);
    br 16
    o 1
    top 3%
    box-shadow:
      0 3px 0 0 #212637,
      0 20px 40px 0 rgba(0,0,0,0.40),
      inset 0 1px 0 0 #383E51;

    animation 250ms ease-in {
      from {
        o 0
        top -3%
      }

      50% {
        o 0
        top -3%
      }
    }
  ` (attrs, [_$icons_8.close `.text-gray-200.fixed.cursor-pointer
    top 25
    right 25
  ` ({
        onclick: onclose
    }), ...children])))
    var _$recaptchaV2_25 = {};
    const ready = new Promise(resolve => {
        window.captcha_loaded = resolve
    })
    const ReCAPTCHA = _$recaptchaV2_25 = {
        async render(container, cb) {
                await ready
                return grecaptcha.render(container, {
                    sitekey: "6LcWkd8UAAAAAJUuAwksN3wR-xS-oWVrWpYARKe1",
                    badge: 'inline',
                    size: 'invisible',
                    theme: 'dark',
                    callback: function(token) {
                        cb(null, token)
                    },
                    'expired-callback': function() {
                        return cb(new Error('Expired'), null)
                    },
                    'error-callback': function(err) {
                        return cb(err)
                    }
                }, false)
            },
            execute(id) {
                return grecaptcha.execute(id)
            },
            reset(id) {
                return grecaptcha.reset(id)
            }
    }
    var _$freeCoins_54 = {};;;
    const {
        buttonGreen: __buttonGreen_54,
        buttonGray: __buttonGray_54
    } = _$button_4;;;
    const FreeCoins = _$freeCoins_54 = {
        sending: false,
        showModal: false,
        code: '',
        error: false,
        claimed: window.__session.incentive,
        captchaId: null,
        captchaToken: null,
        async send() {
            _$recaptchaV2_25.execute(FreeCoins.captchaId)
            try {
                var token = await FreeCoins.captchaToken
            } catch (err) {
                FreeCoins.sending = false
                FreeCoins.code = err
                FreeCoins.error = true
                _$recaptchaV2_25.reset(FreeCoins.captchaId)
                return
            }
            FreeCoins.sending = true
            const {
                error, success, user
            } = await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/incentive',
                withCredentials: true,
                body: {
                    code: FreeCoins.code,
                    token
                }
            })
            FreeCoins.sending = false
            if (success) {
                FreeCoins.claimed = user.incentive
                FreeCoins.showModal = false
                return
            }
            if (error === 'Already referred')
                FreeCoins.claimed = true
            FreeCoins.code = error
            FreeCoins.error = true
            _$recaptchaV2_25.reset(FreeCoins.captchaId)
        },
        view: () => FreeCoins.showModal !== true ? '' : _$modal_10({
            className: 'p-40 pt-50 w-420',
            onclose() {
                FreeCoins.showModal = false;
                _$recaptchaV2_25.reset(FreeCoins.captchaId)
            }
        }, FreeCoins.claimed === true ? hasReferrer : noReferrer)
    }
    const noReferrer = () => [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-50.text-center` (['Get', _$icons_8.coins `.text-yellow.mx-5.inline-block
      transform scale(0.8)
    `, '0.50 Free']), _$sinUmd_43 `img.mb-60` ({
        src: 'images/free-coins.svg'
    }), _$sinUmd_43 `p.font-body.leading-normal.text-base.text-gray-100` ('Don’t have a promo code? Use “', _$sinUmd_43 `a.text-yellow.cursor-pointer` ({
        onclick(e) {
            FreeCoins.code = 'Rollbit';
            e.preventDefault()
        }
    }, 'Rollbit'), '”'), _$sinUmd_43 `form.flex.flex-row.items-center.w-1.my-30` ({
        onsubmit(e) {
            e.preventDefault();
            FreeCoins.send()
        }
    }, _$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm.mr-20` ('Promo code'), _$sinUmd_43 `input.bg-gray-700.border.h-50.p-16.text-gray-100.font-body.font-medium.text-base.focus:outline-none.rounded.flex-1.font-numeric
    ` ({
        className: FreeCoins.error ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
        value: FreeCoins.code,
        oninput: (e) => {
            FreeCoins.code = e.target.value
        },
        onchange: () => {
            FreeCoins.error = false
        }
    })), _$sinUmd_43 `div
  position absolute
  bottom 0
  right 50%
  transform: translate(50%, calc(100% + 30px));
  ` ({
        life(node) {
            FreeCoins.captchaToken = new Promise(async(resolve, reject) => {
                FreeCoins.captchaId = await _$recaptchaV2_25.render(node, (err, token) => {
                    if (err) return reject(err) return resolve(token)
                })
            })
        }
    }, []), _$sinUmd_43 `div.flex.flew-row` (__buttonGray_54.large `.w-160.uppercase.mr-20` ({
        disabled: FreeCoins.sending,
        onclick() {
            FreeCoins.showModal = false
        }
    }, 'Maybe later'), __buttonGreen_54.large `.w-160.uppercase` ({
        disabled: FreeCoins.sending,
        onclick() {
            FreeCoins.send()
        }
    }, 'Claim coins'))]
    const hasReferrer = () => [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-50.text-center` (['You\'ve already', _$sinUmd_43 `br`, 'claimed your ', _$icons_8.coins `.text-yellow.mx-5.inline-block
      transform scale(0.8)
    `, '0.50 Free']), _$sinUmd_43 `img.mb-60` ({
        src: 'images/free-coins.svg'
    }), __buttonGreen_54.large `.w-160.uppercase` ({
        onclick() {
            FreeCoins.showModal = false
        }
    }, 'OK')]
    const potentialCode = document.cookie.match(/RollbitReferrer=([^; ]*)/)
    if (potentialCode != null)
        FreeCoins.code = decodeURIComponent(potentialCode[1])
    _$auth_21.listen(function() {
        FreeCoins.claimed = _$auth_21 && _$auth_21.profile && _$auth_21.profile.info && _$auth_21.profile.info.incentive
    });;;;;
    const {
        buttonGreen: __buttonGreen_53,
        buttonFlat: __buttonFlat_53,
        buttonLink: __buttonLink_53
    } = _$button_4;;;
    var _$header_53 = _$sinUmd_43(({
        route
    }) => () => _$header_7 `.z-40.top-0.flex.sticky
  grid-area: header;
` ([_$sinUmd_43 `a` ({
        href: route()
    }, _$sinUmd_43 `img.m-0.flex-none
  ` ({
        src: 'images/rollbit-logo.svg',
        alt: 'Rollbit'
    })), _$vr_14 `.mx-30`, _$sinUmd_43 `div.m-0.mr-auto.flex.items-center` ([_$icons_8.roulette({
        class: 'text-yellow mr-10'
    }), _$sinUmd_43 `a.uppercase.text-yellow.font-body.text-sm.font-bold` ({
        href: route()
    }, 'X-Roulette')]), _$auth_21.profile == null ? __buttonGreen_53.medium `.px-20.uppercase` ({
        onclick: _$auth_21.login
    }, [_$icons_8.steam `.mr-10`, 'Sign in with steam']) : [__buttonFlat_53.medium `.mr-20.text-green.px-15` ({
        onclick() {
            _$freeCoins_54.showModal = true
        }
    }, _$sinUmd_43 `div.text-green.flex.font-medium` ('Get', _$icons_8.coins `.text-yellow.mx-5
        transform scale(0.7)
      `, '0.50 Free')), _$balance_3({
        value: (_$balance_22.balance / 100).toFixed(2),
        readonly: true,
        style: 'margin-right: 10px'
    }), __buttonGreen_53.medium `.mr-20.w-100.uppercase` ({
        onclick() {
            route('/deposit')
        }
    }, 'Deposit'), __buttonLink_53.medium `.px-15.uppercase` ({
        onclick() {
            route('/withdraw/steam')
        }
    }, 'Withdraw'), _$vr_14 `.mx-20`, __buttonFlat_53.medium `.px-15.uppercase.relative.active
      &:focus .menu,
      &:active .menu,
      &:focus-within .menu {
        display block !important
      }
    ` ([_$sinUmd_43 `img.w-20.h-20.mr-10.rounded-sm
        ml -5px
      ` ({
        src: _$auth_21.profile.avatar,
        alt: 'Avatar'
    }), 'Account', _$icons_8.arrowDown `.ml-20.text-gray-200`, _$sinUmd_43 `div.menu.absolute.rounded.bg-gray-400.w-170.p-10.flex.flex-col
        top calc(100% + 10px)
        right 0
        display none !important
      ` ([_$sinUmd_43 `a.h-40.font-body.text-sm.font-bold.text-gray-100.px-15.block.hover:bg-gray-600.rounded-sm.text-left.focus:outline-none.uppercase
          line-height 40px
        ` ({
        href: route() + 'account/'
    }, 'Account'), _$sinUmd_43 `a.h-40.font-body.text-sm.font-bold.text-gray-100.px-15.block.hover:bg-gray-600.rounded-sm.text-left.focus:outline-none.uppercase
          line-height 40px
        ` ({
        href: route() + 'account/referrals'
    }, 'Referrals'), _$sinUmd_43 `a.h-40.font-body.text-sm.font-bold.text-gray-100.px-15.block.hover:bg-gray-600.rounded-sm.text-left.focus:outline-none.uppercase
          line-height 40px
        ` ({
        href: "https://api.rollbit.com" + '/auth/logout'
    }, 'Log out')])])], _$freeCoins_54.view]));
    var _$footer_52 = _$sinUmd_43(({
        route
    }) => () => _$sinUmd_43 `footer.p-50.bg-gray-800.flex.flex-rows.justify-between
  grid-area footer
` ([_$sinUmd_43 `div.w-290` ([_$sinUmd_43 `a` ({
        href: route() + '/'
    }, _$sinUmd_43 `img` ({
        src: '/images/rollbit-logo.svg',
        alt: 'Rollbit Logo'
    })), _$sinUmd_43 `p.font-body.text-xs.text-gray-200.leading-loose.my-20` ('Copyright © 2020 rollbit.com. All rights reserved. Rollbit is a brand name of PENGWINS N.V. (Registration Number 152488). Company Address: Abraham de Veerstraat 9, Willemstad, Curacao'), _$sinUmd_43 `p.font-body.text-xs.text-gray-200.leading-loose.my-20` ('PENGWINS N.V. payments can be processed by WINGAMING SUPPORT LIMITED (Registration Number HE406701). Company Address: Avlonos, 1, MARIA HOUSE, 1075, Nicosia, Cyprus')]), _$sinUmd_43 `div` ([_$sinUmd_43 `h3.font-body.font-bold.text-sm.text-gray-100.uppercase` ('Platform'), _$sinUmd_43 `ul.font-body.text-gray-200.text-base.mt-15.leading-relaxed` ([_$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: '/provably-fair'
    }, 'Fairness')), ])]), _$sinUmd_43 `div` ([_$sinUmd_43 `h3.font-body.font-bold.text-sm.text-gray-100.uppercase` ('About us'), _$sinUmd_43 `ul.font-body.text-gray-200.text-base.mt-15.leading-relaxed` ([_$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: '/support'
    }, 'Support')), _$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: '/faq/api-key'
    }, 'API Key FAQ')), _$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: '/privacy-policy'
    }, 'Privacy Policy')), _$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: '/terms-and-conditions'
    }, 'Terms and Conditions'))])]), _$sinUmd_43 `div.mr-90` ([_$sinUmd_43 `h3.font-body.font-bold.text-sm.text-gray-100.uppercase` ('Community'), _$sinUmd_43 `ul.font-body.text-gray-200.text-base.mt-15.leading-relaxed` ([_$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: 'https://facebook.com/Rollbit',
        target: '_blank',
        rel: 'noreferrer'
    }, 'Facebook')), _$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: 'https://twitter.com/rollbitcom',
        target: '_blank',
        rel: 'noreferrer'
    }, 'Twitter')), _$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: 'https://instagram.com/rollbitcom',
        target: '_blank',
        rel: 'noreferrer'
    }, 'Instagram')), _$sinUmd_43 `li` (_$sinUmd_43 `a` ({
        href: 'https://discord.gg/Mwx3zqH',
        target: '_blank',
        rel: 'noreferrer'
    }, 'Discord'))])])]))
    var _$CappedArray_16 = class CappedArray extends Array {
        constructor(size) {
            super()
            this.size = size
        }
        push(...elms) {
            super.push(...elms)
            return super.splice(0, Math.max(0, this.length - this.size)).length
        }
        unshift(...elms) {
            super.unshift(...elms)
            return super.splice(this.size - this.length, Math.max(0, this.length - this.size)).length
        }
    };;
    var i = 0
    var _$Chat_23 = function Chat(socket) {
        const res = {
            online: 0,
            messages: new _$CappedArray_16(100),
            didRefresh: false,
            _error: '',
            _timer: null,
            get error() {
                return res._error
            },
            set error(err) {
                this._error = err
                clearTimeout(res._timer)
                res._timer = setTimeout(() => {
                    this._error = ''
                }, 1000)
            },
            send(message) {
                socket.send('chat', message)
            }
        }
        socket.listen('ping', ({
            online
        }) => {
            res.online = online
            _$sinUmd_43.redraw()
        })
        socket.listen('chat-history', (messages) => {
            res.messages = new _$CappedArray_16(100)
            res.messages.push(...messages.map(m => {
                m.lid = i++
                    return m
            }))
            res.didRefresh = true
            _$sinUmd_43.redraw()
        })
        socket.listen('chat', (messages) => {
            res.messages.push(...messages.map(m => {
                m.lid = i++
                    return m
            }))
            _$sinUmd_43.redraw()
        })
        return res
    };
    var _$avatar_2 = _$sinUmd_43 `img.w-20.h-20.rounded-sm`
    var _$tip_57 = {};;;
    const {
        buttonGreen: __buttonGreen_57
    } = _$button_4;;;
    const Tip = _$tip_57 = {
        showModal: false,
        ref: null,
        amount: 1,
        error: false,
        errorMessage: null,
        captchaId: null,
        captchaToken: null,
        async send() {
            _$recaptchaV2_25.execute(Tip.captchaId)
            try {
                var token = await Tip.captchaToken
            } catch (err) {
                Tip.sending = false
                Tip.errorMsg = err
                _$recaptchaV2_25.reset(Tip.captchaId)
                return
            }
            Tip.fixupValue()
            try {
                var err = await _$balance_22.tip(Tip.ref, Math.round(Tip.amount * 100), token)
                _$recaptchaV2_25.reset(Tip.captchaId)
                if (err) {
                    Tip.errorMessage = err
                    Tip.error = true
                    return
                }
                Tip.fixupValue()
                Tip.amount = 1
                Tip.ref = null
                Tip.showModal = false
            } catch (ex) {
                Tip.errorMessage = ex
                Tip.error = true
            }
        },
        fixupValue() {
            if (typeof Tip.amount === 'string')
                Tip.amount = parseFloat(Tip.amount)
            if (Number.isNaN(Tip.amount))
                Tip.amount = 0
            Tip.amount = clamp(0, _$balance_22.balance, Math.round(Tip.amount * 100) / 100)
        },
        view: () => Tip.showModal !== true ? '' : _$modal_10({
            className: 'p-40 w-420',
            onclose() {
                Tip.showModal = false;
                _$recaptchaV2_25.reset(Tip.captchaId)
            }
        }, [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-40.flex.self-start` ('Send tip to player'), _$sinUmd_43 `form.flex.flex-row.items-center.w-1` ({
            onsubmit(ev) {
                ev.preventDefault();
                Tip.send()
            }
        }, [_$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Amount'), _$sinUmd_43 `div.relative.mx-20` ([_$sinUmd_43 `input.bg-gray-700.h-50.p-16.pl-40.text-gray-100.font-body.text-sm.font-medium.focus:outline-none.rounded.w-140
          font-variant-numeric: tabular-nums;
        ` ({
            className: Tip.error ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
            inputmode: 'decimal',
            value: typeof Tip.amount === 'number' ? Tip.amount.toFixed(2) : Tip.amount,
            oninput: (e) => {
                Tip.amount = e.target.value
            },
            onblur: (e) => {
                Tip.fixupValue()
            }
        }), _$icons_8.coins({
            className: 'absolute inset-y-auto text-yellow top-0 bottom-0 m-auto',
            style: 'height: 20px; transform: scale(0.7); left: 16px'
        })]), _$sinUmd_43 `div
      position absolute
      bottom 0
      right 50%
      transform: translate(50%, calc(100% + 30px));
      ` ({
            life(node) {
                Tip.captchaToken = new Promise(async(resolve, reject) => {
                    Tip.captchaId = await _$recaptchaV2_25.render(node, (err, token) => {
                        if (err) return reject(err) return resolve(token)
                    })
                })
            }
        }, []), __buttonGreen_57.large `.w-110.uppercase` ({
            type: 'submit'
        }, 'Send')]), Tip.errorMessage == null ? '' : _$sinUmd_43 `p.text-red.font-medium.text-base.mt-30` (Tip.errorMessage)])
    }

    function clamp(min, max, v) {
        if (v > max)
            return max
        if (v < min)
            return min
        return v
    }
    var _$tipSteam_56 = {};;;
    const {
        buttonGreen: __buttonGreen_56
    } = _$button_4;;;
    const __Tip_56 = _$tipSteam_56 = {
        showModal: false,
        steamId: null,
        amount: 1,
        error: false,
        errorMessage: null,
        captchaId: null,
        captchaToken: null,
        async send() {
            _$recaptchaV2_25.execute(__Tip_56.captchaId)
            try {
                var token = await __Tip_56.captchaToken
            } catch (err) {
                __Tip_56.sending = false
                __Tip_56.errorMsg = err
                _$recaptchaV2_25.reset(__Tip_56.captchaId)
                return
            }
            __Tip_56.fixupValue()
            try {
                var err = await _$balance_22.tipSteam(__Tip_56.steamId, Math.round(__Tip_56.amount * 100), token)
                _$recaptchaV2_25.reset(__Tip_56.captchaId)
                if (err) {
                    __Tip_56.errorMessage = err
                    __Tip_56.error = true
                    return
                }
                __Tip_56.fixupValue()
                __Tip_56.amount = 1
                __Tip_56.steamId = null
                __Tip_56.showModal = false
            } catch (ex) {
                __Tip_56.errorMessage = ex
                __Tip_56.error = true
            }
        },
        fixupValue() {
            if (typeof __Tip_56.amount === 'string')
                __Tip_56.amount = parseFloat(__Tip_56.amount)
            if (Number.isNaN(__Tip_56.amount))
                __Tip_56.amount = 0
            __Tip_56.amount = __clamp_56(0, _$balance_22.balance, Math.round(__Tip_56.amount * 100) / 100)
        },
        view: () => __Tip_56.showModal !== true ? '' : _$modal_10({
            className: 'p-40 w-420',
            onclose() {
                __Tip_56.showModal = false;
                _$recaptchaV2_25.reset(__Tip_56.captchaId)
            }
        }, [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-40.flex.self-start` ('Send tip to player ', __Tip_56.steamId), _$sinUmd_43 `form.flex.flex-row.items-center.w-1` ({
            onsubmit(ev) {
                ev.preventDefault();
                __Tip_56.send()
            }
        }, [_$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Amount'), _$sinUmd_43 `div.relative.mx-20` ([_$sinUmd_43 `input.bg-gray-700.h-50.p-16.pl-40.text-gray-100.font-body.text-sm.font-medium.focus:outline-none.rounded.w-140
          font-variant-numeric: tabular-nums;
        ` ({
            className: __Tip_56.error ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
            inputmode: 'decimal',
            value: typeof __Tip_56.amount === 'number' ? __Tip_56.amount.toFixed(2) : __Tip_56.amount,
            oninput: (e) => {
                __Tip_56.amount = e.target.value
            },
            onblur: (e) => {
                __Tip_56.fixupValue()
            }
        }), _$icons_8.coins({
            className: 'absolute inset-y-auto text-yellow top-0 bottom-0 m-auto',
            style: 'height: 20px; transform: scale(0.7); left: 16px'
        })]), _$sinUmd_43 `div
      position absolute
      bottom 0
      right 50%
      transform: translate(50%, calc(100% + 30px));
      ` ({
            life(node) {
                __Tip_56.captchaToken = new Promise(async(resolve, reject) => {
                    __Tip_56.captchaId = await _$recaptchaV2_25.render(node, (err, token) => {
                        if (err) return reject(err) return resolve(token)
                    })
                })
            }
        }, []), __buttonGreen_56.large `.w-110.uppercase` ({
            type: 'submit'
        }, 'Send')]), __Tip_56.errorMessage == null ? '' : _$sinUmd_43 `p.text-red.font-medium.text-base.mt-30` (__Tip_56.errorMessage)])
    }

    function __clamp_56(min, max, v) {
        if (v > max)
            return max
        if (v < min)
            return min
        return v
    }
    var _$mute_55 = {};;;
    const {
        buttonGreen: __buttonGreen_55
    } = _$button_4;;
    const Mute = _$mute_55 = {
        showModal: false,
        ref: null,
        timeout: 30,
        error: false,
        errorMessage: null,
        send() {
            _$websocket_28.send('mute', {
                ref: Mute.ref,
                timeout: Mute.timeout
            }, function(ch, result) {
                if (result.error) {
                    Mute.error = true
                    Mute.errorMessage = result.error
                    return
                }
                Mute.error = false
                Mute.errorMessage = null
                Mute.timeout = 30
                Mute.ref = null
                Mute.showModal = false
            })
        },
        fixupValue() {
            if (typeof Mute.timeout === 'string')
                Mute.timeout = parseFloat(Mute.timeout)
            if (Number.isNaN(Mute.timeout))
                Mute.timeout = 30
            Mute.timeout = __clamp_55(0, 525600, Mute.timeout)
        },
        view: () => Mute.showModal !== true ? '' : _$modal_10({
            className: 'p-40 w-420',
            onclose() {
                Mute.showModal = false
            }
        }, [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-40.flex.self-start` ('Mute player'), _$sinUmd_43 `form.flex.flex-row.items-center.w-1` ({
            onsubmit(ev) {
                ev.preventDefault();
                Mute.send()
            }
        }, [_$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Mute (min)'), _$sinUmd_43 `div.relative.mx-20` ([_$sinUmd_43 `input.bg-gray-700.h-50.p-16.pl-40.text-gray-100.font-body.text-sm.font-medium.focus:outline-none.rounded.w-140
          font-variant-numeric: tabular-nums;
        ` ({
            className: Mute.error ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
            inputmode: 'decimal',
            value: typeof Mute.timeout === 'number' ? Mute.timeout.toFixed(2) : Mute.timeout,
            oninput: (e) => {
                Mute.timeout = e.target.value
            },
            onblur: (e) => {
                Mute.fixupValue()
            }
        })]), __buttonGreen_55.large `.w-110.uppercase` ({
            type: 'submit'
        }, 'Mute')]), Mute.errorMessage == null ? '' : _$sinUmd_43 `p.text-red.font-medium.text-base.mt-30` (Mute.errorMessage)])
    }

    function __clamp_55(min, max, v) {
        if (v > max)
            return max
        if (v < min)
            return min
        return v
    }
    var _$tooltip_13 = {};;
    _$tooltip_13 = _$sinUmd_43((attrs, children) => _$sinUmd_43 `.absolute.bg-gray-800.border.border-gray-400.flex-none.rounded-sm.text-sm.text-gray-200.px-20.py-10.leading-none
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  ::after, ::before {
    b 100%
    l 50%
    content ""
    border solid transparent
    h 0
    w 0
    position absolute
    pointer-events none
  }

  ::after {
    border-color: rgba(20, 23, 34, 0);
    border-bottom-color: var(--color-gray-800);
    border-width: 7px;
    margin-left: -7px;
  }

  ::before {
    border-color: rgba(47, 52, 69, 0);
    border-bottom-color: var(--color-gray-400);
    border-width: 8px;
    margin-left: -8px;
  }
` (attrs, children))
    _$tooltip_13.down = _$sinUmd_43((attrs, children) => _$sinUmd_43 `.absolute.bg-gray-800.border.border-gray-400.flex-none.rounded-sm.text-sm.text-gray-200.px-20.py-10.leading-none
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  ::after, ::before {
    top 100%
    l 50%
    content ""
    border solid transparent
    h 0
    w 0
    position absolute
    pointer-events none
  }

  ::after {
    border-color: rgba(20, 23, 34, 0);
    border-top-color: var(--color-gray-800);
    border-width: 7px;
    margin-left: -7px;
  }

  ::before {
    border-color: rgba(47, 52, 69, 0);
    border-top-color: var(--color-gray-400);
    border-width: 8px;
    margin-left: -8px;
  }
` (attrs, children));;
    const Chat = _$Chat_23(_$websocket_28);;;
    const {
        buttonGreen: __buttonGreen_51
    } = _$button_4;;;;;
    var selectedMessage = null
    var scrollLock = false

    function send(elm) {
        var msg = elm.value
        console.log(msg)
        if (msg.trim().startsWith('/tip')) {
            const m = msg.match(/(76561[0-9]{12})\s*([0-9]+(?:\.[0-9]{1,2})?)?/)
            if (m == null) {
                Chat.error = 'Invalid SteamID64'
                elm.value = ''
                return
            }
            _$tipSteam_56.steamId = m[1]
            if (m[2])
                _$tipSteam_56.amount = parseFloat(m[2])
            _$tipSteam_56.showModal = true
        } else
            Chat.send(msg)
        elm.value = ''
    }
    var _$chat_51 = () => _$sinUmd_43 `section.chat.bg-gray-600.fixed.w-280
  height calc(100vh - 60px)
  bottom 0
  grid-area: chat;
  display: flex;
  fd column
` ({}, [_$sinUmd_43 `header.h-50.px-20.font-body.text-sm.text-gray-100.bg-gray-500.items-center.flex` ({}, [_$sinUmd_43 `.rounded-full.mr-10
      w 8px
      h 8px
      bc var(--color-${_$websocket_28.connected ? 'green' : 'yellow'})
    `, `${Chat.online} online`]), _$sinUmd_43 `section.messages.px-20.overflow-y-scroll
    flex: 1;
  ` ({
        onupdate({
                dom
            }) {
                if (scrollLock === false) {
                    dom.scrollTop = dom.scrollHeight
                }
            },
            onscroll() {
                scrollLock = this.scrollHeight - this.scrollTop - this.offsetHeight > 1
            }
    }, [Chat.messages.map(m => chatMessage(m))]), _$sinUmd_43 `form.bg-gray-500.px-15.py-10.flex.flex-row.items-center.relative
  ` ({
        onsubmit(e) {
            e.preventDefault()
            var i = e.target.querySelector('textarea')
            send(i)
        }
    }, _$auth_21.profile == null ? [_$sinUmd_43 `p.font-body.text-base.text-gray-200.font-medium` ('Sign in to chat'), __buttonGreen_51.medium `.px-20.uppercase.ml-auto` ({
        onclick: _$auth_21.login
    }, [_$icons_8.steam `.mr-10
        ml -5px
      `, 'Sign in'])] : [Chat.error && _$tooltip_13.down `.z-10.whitespace-no-wrap.text-red; left: 50%; top: 0; transform: translateX(-50%) translateY(-100%);` (Chat.error), _$sinUmd_43 `textarea.resize-none.h-50.font-body.border.border-gray-400.rounded-sm.bg-gray-700.w-full.px-20.py-10.text-base.leading-normal
      box-sizing border-box
      c #9293A7
      transition: border-color .125s;

      ::placeholder {
        color: var(--color-gray-100);
        opacity: 0.3;
      }

      :focus {
        outline: none;
        border-color var(--color-yellow)
      }
    ` ({
        onkeydown(e) {
                setTimeout(() => {
                    this.style.height = '0px'
                    var height = this.scrollHeight
                    this.style.height = Math.min(Math.max(height + 2, 50), 100) + 'px'
                }, 0)
                if (!e.shiftKey && e.key === 'Enter') {
                    e.preventDefault()
                    send(this)
                }
            },
            maxlength: 255,
            placeholder: _$balance_22.deposited < 5000 ? 'Min. 50.00 deposit required' : 'Type Message...',
            disabled: _$balance_22.deposited < 5000
    })])])
    window.addEventListener('click', (e) => {
        selectedMessage = null
        _$sinUmd_43.redraw()
    })
    const chatMessage = (message) => _$sinUmd_43 `.my-20` ({
        key: [message.ref, message.ts, message.lid].join('-')
    }, [_$sinUmd_43 `header.message-header.inline-flex.items-center.cursor-pointer
  max-width: 100%;
  ` ({
        onclick(e) {
            selectedMessage = message;
            e.stopPropagation()
        }
    }, msgHeader(message)), _$auth_21.profile == null || selectedMessage !== message || message.ref === _$auth_21.profile.ref ? '' : _$sinUmd_43 `.relative.w-0.h-0` (_$sinUmd_43 `div.absolute.rounded.bg-gray-500.w-120.p-5.flex.flex-col
    top 5px
  ` ([_$sinUmd_43 `button.h-30.font-body.text-sm.font-medium.text-gray-100.px-10.block.hover:bg-gray-600.rounded-sm.text-left.focus:outline-none
      line-height 30px
    ` ({
        onclick: () => {
            _$tip_57.ref = message.ref;
            _$tip_57.showModal = true
        }
    }, 'Send Tip'), _$auth_21.profile && /M|A/.test(_$auth_21.profile.flags) === false ? '' : _$sinUmd_43 `button.h-30.font-body.text-sm.font-medium.text-gray-100.px-10.block.hover:bg-gray-600.rounded-sm.text-left.focus:outline-none
      line-height 30px
    ` ({
        onclick: () => {
            _$mute_55.ref = message.ref;
            _$mute_55.showModal = true
        }
    }, 'Mute')])), _$sinUmd_43 `p.font-body.text-base.leading-normal.font-light.break-words.mt-5
    color: #9293A6;
  ` (message.message)])

    function msgHeader(message) {
        switch (message.flags) {
            case 'A':
                return [_$avatar_2({
                    style: 'margin-right: 6px',
                    src: message.avatar || 'images/default-avatar.svg'
                }), _$sinUmd_43 `.bg-yellow.rounded-sm.font-body.text-gray-800.text-xs.font-bold
        p 2px 3px
        line-height 1
        margin-right 6px
      ` ('ADMIN'), _$sinUmd_43 `h1.text-yellow.font-body.text-base.font-medium.truncate` (message.name)]
            case 'M':
                return [_$avatar_2({
                    style: 'margin-right: 6px',
                    src: message.avatar || 'images/default-avatar.svg'
                }), _$sinUmd_43 `.bg-blue.rounded-sm.font-body.text-gray-800.text-xs.font-bold
        p 2px 3px
        line-height 1
        margin-right 6px
      ` ('MOD'), _$sinUmd_43 `h1.text-blue.font-body.text-base.font-medium.truncate` (message.name)]
            default:
                return [_$avatar_2({
                    style: 'margin-right: 6px',
                    src: message.avatar || 'images/default-avatar.svg'
                }), _$sinUmd_43 `h1.text-gray-100.font-body.text-base.font-medium.truncate` ([message.name, message.flags.includes('V') && _$icons_8.verified `.text-blue.inline-block;w 12;h 12;ml 4`])]
        }
    };
    var _$Notifications_24 = function Notifications(socket) {
        const res = {
            notifications: []
        }
        socket.listen('notification', (messages) => {
            res.notifications.push(messages)
            setTimeout(function() {
                var idx = res.notifications.indexOf(messages)
                if (idx < 0)
                    return
                res.notifications.splice(idx, 1)
                _$sinUmd_43.redraw()
            }, 7500)
            _$sinUmd_43.redraw()
        })
        return res
    };
    var _$checkbox_5 = _$sinUmd_43((attrs, children) => _$sinUmd_43 `input.appearance-none.w-15.h-15.border.border-gray-200.outline-none.flex-none
mt 4
br 2px
box-sizing border-box
:enabled:hover, :enabled:focus {
  border: 1px solid #FFBE19;
  outline: none;
}

:enabled:active {
  background-color: #ED9C00;
  border: 1px solid #ED9C00;
  box-shadow: none;
  background-image: url('/icons/checkbox-checked.svg');
  background-repeat: no-repeat;
  background-size: 7px 7px;
  background-position: center;
}

:disabled {
  opacity: 0.5;
}

&:checked {
  background-color: var(--color-yellow);
  border: 1px solid var(--color-yellow);
  background-image: url('/icons/checkbox-checked.svg');
  background-repeat: no-repeat;
  background-size: 7px 7px;
  background-position: center;
}
` ({
        type: 'checkbox',
        ...attrs
    }));
    var _$license_9 = _$sinUmd_43(() => {
        var shown = false
        return () => _$sinUmd_43 `` ([_$sinUmd_43 `a.text-yellow.hover:underline.cursor-pointer` ({
            onclick() {
                shown = !shown
            }
        }, shown ? 'Hide Gaming License' : 'Show Gaming License'), _$sinUmd_43 `p.text-sm` ('Loading the gaming license may set 3rd party tracking cookies'), shown && _$sinUmd_43 `iframe.border-none.m-10` ({
            sandbox: 'allow-popups',
            src: 'https://licensing.gaming-curacao.com/validator/?lh=038ec74580025dbb8cbc57d16d90ed42&template=tseal',
            width: 150,
            height: 50
        })])
    })
    var _$tos_58 = {};;
    const {
        buttonYellow: __buttonYellow_58
    } = _$button_4;;;;
    const ToS = _$tos_58 = {
        showModal: _$auth_21.missingTermsOfService,
        showToS: false,
        showPP: false,
        accept: false,
        captchaId: null,
        captchaToken: null,
        sending: false,
        errorMsg: '',
        async send() {
            _$recaptchaV2_25.execute(ToS.captchaId)
            try {
                var token = await ToS.captchaToken
            } catch (err) {
                ToS.sending = false
                ToS.errorMsg = err
                _$recaptchaV2_25.reset(ToS.captchaId)
                return
            }
            ToS.sending = true
            const {
                error, user
            } = await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/auth/tos',
                withCredentials: true,
                body: {
                    accept: ToS.accept,
                    token
                }
            })
            ToS.sending = false
            if (error) {
                ToS.errorMsg = error
                _$recaptchaV2_25.reset(ToS.captchaId)
                return
            }
            if (user)
                _$auth_21.profile = user
            ToS.showModal = false
        },
        view: () => ToS.showModal !== true ? '' : [_$modal_10({
            className: 'p-40 pb-30 w-420',
            onclose() {
                ToS.showModal = false;
                _$recaptchaV2_25.reset(ToS.captchaId)
            }
        }, [_$sinUmd_43 `img.m-20.w-190.mb-60
      ` ({
            src: 'images/rollbit-logo.svg',
            alt: 'Rollbit'
        }), _$sinUmd_43 `.flex.flex-row` ([_$checkbox_5 `.mr-15` ({
            checked: ToS.accept,
            onchange(e) {
                ToS.accept = e.target.checked
            }
        }), _$sinUmd_43 `p.text-base.font-body.leading-relaxed.text-gray-200` (['I agree with ', _$sinUmd_43 `a.text-yellow.cursor-pointer` ({
            onclick() {
                ToS.showPP = true
            }
        }, 'Privacy Policy'), ' and with ', _$sinUmd_43 `a.text-yellow.cursor-pointer` ({
            onclick() {
                ToS.showToS = true
            }
        }, 'Terms of Use'), ', this site isn\'t forbidden by my local authorities and I\'m at least 18 years old.'])]), _$sinUmd_43 `div
      position absolute
      bottom 0
      right 50%
      transform: translate(50%, calc(100% + 30px));
      ` ({
            life(node) {
                ToS.captchaToken = new Promise(async(resolve, reject) => {
                    ToS.captchaId = await _$recaptchaV2_25.render(node, (err, token) => {
                        if (err) return reject(err) return resolve(token)
                    })
                })
            }
        }, []), __buttonYellow_58.large `.w-1.uppercase.mt-30` ({
            disabled: ToS.sending,
            onclick() {
                ToS.send()
            }
        }, 'Start Playing'), _$sinUmd_43 `p.text-red.font-medium.text-base.mt-20` (ToS.errorMsg)]), ToS.showPP !== true ? '' : [_$modal_10({
                className: 'p-40 pb-30',
                onclose() {
                    ToS.showPP = false
                }
            }, _$privacyPolicy_76({})
            `..overflow-y-scroll`)], ToS.showToS !== true ? '' : [_$modal_10({
                className: 'p-40 pb-30',
                onclose() {
                    ToS.showToS = false
                }
            }, _$termsAndConditions_79({})
            `..overflow-y-scroll`)]]
    }
    _$auth_21.listen(function() {
        ToS.showModal = _$auth_21.missingTermsOfService
    })

    function SoundEffectManager() {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.support = !!this.AudioContext;
        if (this.support) {
            this.context = new this.AudioContext();
        }
        this.sounds = {};
        this.sources = {};
    }
    SoundEffectManager.prototype.loadFile = function(url, name, delay, cb) {
        if (this.support) {
            this._loadWebAudioFile(url, name, delay, cb);
        } else {
            this._loadWaveFile(url.replace('.mp3', '.wav'), name, delay, 3, cb);
        }
    };
    SoundEffectManager.prototype._loadWebAudioFile = function(url, name, delay, cb) {
        if (!this.support) {
            return;
        }
        var self = this;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            self.context.decodeAudioData(request.response, function(data) {
                self.sounds[name] = data;
                if (cb) {
                    cb(null, data);
                }
            }, function(err) {
                if (cb) {
                    cb(err);
                }
            });
        };
        setTimeout(function() {
            request.send();
        }, delay || 0);
    };
    SoundEffectManager.prototype._loadWaveFile = function(url, name, delay, multiplexLimit, cb) {
        var self = this;
        var limit = multiplexLimit || 3;
        setTimeout(function() {
            var a, i = 0;
            self.sounds[name] = [];
            while (i < limit) {
                a = new Audio();
                a.src = url;
                if (i === 0 && cb) {
                    a.addEventListener('canplaythrough', cb, false);
                }
                a.load();
                self.sounds[name][i++] = a;
            }
        }, delay || 0);
    };
    SoundEffectManager.prototype._playWebAudio = function(soundName, loop) {
        var buffer = this.sounds[soundName];
        if (!buffer) {
            return;
        }
        if (loop && this.sources[soundName]) {
            return;
        }
        var source = this.context.createBufferSource();
        source.buffer = buffer;
        source.loop = loop;
        source.connect(this.context.destination);
        if (loop) {
            this.sources[soundName] = source;
        }
        source.start(0);
    };
    SoundEffectManager.prototype._playWavAudio = function(soundName, loop) {
        var audio = this.sounds[soundName];
        var howMany = audio && audio.length || 0;
        var i = 0;
        var currSound;
        if (!audio) {
            return;
        }
        while (i < howMany) {
            currSound = audio[i++];
            if (currSound.error) {
                return;
            }
            if (currSound.currentTime === 0 || currSound.currentTime === currSound.duration) {
                currSound.currentTime = 0;
                currSound.loop = !!loop;
                i = howMany;
                return currSound.play();
            }
        }
    };
    SoundEffectManager.prototype.play = function(soundName, loop) {
        if (this.support) {
            this._playWebAudio(soundName, loop);
        } else {
            return this._playWavAudio(soundName, loop);
        }
    };
    SoundEffectManager.prototype.stop = function(soundName) {
        if (this.support) {
            if (this.sources[soundName]) {
                this.sources[soundName].stop(0);
                delete this.sources[soundName];
            }
        } else {
            var soundArray = this.sounds[soundName];
            var howMany = soundArray && soundArray.length || 0;
            var i = 0;
            var currSound;
            while (i < howMany) {
                currSound = soundArray[i++];
                currSound.pause();
                currSound.currentTime = 0;
            }
        }
    };
    var _$SoundEffectManager_44 = SoundEffectManager;
    var _$sounds_27 = {};;
    const SM = _$sounds_27 = new _$SoundEffectManager_44()
    SM.loadFile('/sounds/notify.mp3', 'notify')
    SM.loadFile('/sounds/beacon.mp3', 'beacon')
    SM.loadFile('/sounds/ready.mp3', 'ready')
    var _$compare_34 = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    };
    const states = ['listed', 'completed', 'expired', 'confirmed', 'accepted', 'withdrawn']
    var _$stateOrdering_70 = function(a, b) {
        const aIdx = states.indexOf(a.state)
        const bIdx = states.indexOf(b.state)
        return -_$compare_34(aIdx, bIdx)
    }
    var _$pDebounce_35 = {};
    'use strict';
    const pDebounce = (fn, wait, options = {}) => {
        if (!Number.isFinite(wait)) {
            throw new TypeError('Expected `wait` to be a finite number');
        }
        let leadingValue;
        let timer;
        let resolveList = [];
        return function(...arguments_) {
            return new Promise(resolve => {
                const runImmediately = options.leading && !timer;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    timer = null;
                    const result = options.leading ? leadingValue : fn.apply(this, arguments_);
                    for (resolve of resolveList) {
                        resolve(result);
                    }
                    resolveList = [];
                }, wait);
                if (runImmediately) {
                    leadingValue = fn.apply(this, arguments_);
                    resolve(leadingValue);
                } else {
                    resolveList.push(resolve);
                }
            });
        };
    };
    _$pDebounce_35 = pDebounce;
    _$pDebounce_35.default = pDebounce;
    var _$depositsModel_64 = {};;;;;

    function startSound(d) {
        console.trace('here')
        _$sounds_27.play('ready')
        _$sounds_27.play('beacon', true)
        setTimeout(updateSound, Date.parse(d.acceptExpireAt) - Date.now())
    }

    function updateSound() {
        const w = Deposits.deposits.find(d => d.state === 'withdrawn' && Date.parse(d.acceptExpireAt) > Date.now())
        if (w == null)
            return _$sounds_27.stop('beacon')
        _$sounds_27.play('beacon', true)
        setTimeout(updateSound, Date.parse(w.acceptExpireAt) - Date.now())
    }
    const Deposits = _$depositsModel_64 = {
        submitting: false,
        deposits: [],
        inventory: [],
        inventoryError: '',
        depositError: '',
        setSocket(socket) {
            socket.listen('steam/deposit', (deposit) => {
                var d = Deposits.deposits.find(d => d.ref === deposit.ref)
                if (d != null) {
                    Object.assign(d, deposit)
                    d.items.forEach(i => {
                        i.localId = Math.random()
                    })
                    if (['withdrawn'].includes(d.state))
                        startSound(d)
                    Deposits.deposits.sort(_$stateOrdering_70)
                }
                updateSound()
                _$sinUmd_43.redraw()
            })
        },
        loadInventory: _$pDebounce_35(async() => {
            const {
                inventory, error
            } = await _$sinUmd_43.request({
                method: 'GET',
                url: "https://api.rollbit.com" + '/steam/inventory',
                withCredentials: true
            })
            if (error) {
                Deposits.inventoryError = error
                return
            }
            inventory.forEach(i => {
                i.localId = Math.random()
            })
            Deposits.inventoryError = ''
            Deposits.inventory = inventory
        }, 200),
        async load() {
            const {
                deposits
            } = await _$sinUmd_43.request({
                method: 'GET',
                url: "https://api.rollbit.com" + '/steam/deposits',
                withCredentials: true
            })
            deposits.forEach(d => {
                d.items.forEach(i => {
                    i.localId = Math.random()
                })
            })
            Deposits.deposits = deposits
            Deposits.deposits.sort(_$stateOrdering_70)
            updateSound()
        },
        async submit(deposits, onsteam, onsuccess) {
            async
            function attempt() {
                Deposits.depositError = ''
                Deposits.submitting = true
                const res = await _$sinUmd_43.request({
                    method: 'POST',
                    url: "https://api.rollbit.com" + '/steam/deposit',
                    withCredentials: true,
                    body: {
                        items: deposits.map(d => {
                            return {
                                id: d.id,
                                markup: d.markup
                            }
                        })
                    }
                })
                Deposits.submitting = false
                if (res.success === false) {
                    if (res.error.hasTradeInfo === false) {
                        onsteam(() => {
                            attempt()
                        })
                        return
                    }
                    if (res.error.missingItems === true) {
                        Deposits.depositError = 'Some items could not be found in your inventory'
                        return
                    }
                    if (res.error) {
                        Deposits.depositError = res.error
                        return
                    }
                }
                for (var i = 0; i < deposits.length; i++) {
                    var idx = Deposits.inventory.indexOf(deposits[i])
                    if (idx >= 0)
                        Deposits.inventory.splice(idx, 1)
                }
                Deposits.deposits = res.deposits
                Deposits.deposits.sort(_$stateOrdering_70)
                onsuccess()
            }
            attempt()
        },
        async cancel(deposit) {
            var [depo] = Deposits.deposits.splice(Deposits.deposits.indexOf(deposit), 1)
            const res = await _$sinUmd_43.request({
                method: 'DELETE',
                url: "https://api.rollbit.com" + '/steam/deposit',
                withCredentials: true,
                body: {
                    ref: depo.ref
                }
            })
            if (res.success) {
                depo.items.forEach((i) => {
                    i.price = i.price / (1 + i.markup / 100)
                    delete i.markup
                    i.tradable = true
                    i.depositable = true
                    Deposits.inventory.push(i)
                })
                Deposits.deposits.sort(_$stateOrdering_70)
                updateSound()
                Deposits.loadInventory()
            }
        },
        async accept(deposit) {
            await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/steam/deposit/accept',
                withCredentials: true,
                body: {
                    ref: deposit.ref
                }
            })
        },
        async tradeDetails(deposit) {
            return _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/steam/deposit/trade-details',
                withCredentials: true,
                body: {
                    ref: deposit.ref
                }
            })
        },
        async ack(deposit) {
            var [depo] = Deposits.deposits.splice(Deposits.deposits.indexOf(deposit), 1)
            await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/steam/deposit/ack',
                withCredentials: true,
                body: {
                    ref: depo.ref
                }
            })
        }
    };;;
    var _$leaderboard_83 = (wagers) => [_$sinUmd_43 `p.uppercase.text-gray-200.font-body.font-bold.text-sm.mb-10` ('Highest'), betHeighest(wagers.length ? wagers[0] : null), _$sinUmd_43 `p.uppercase.text-gray-200.font-body.font-bold.text-sm.mb-10` ('All'), _$sinUmd_43 `ol.overflow-y-scroll.flex-1` (wagers.slice(1).map(betItem)), _$sinUmd_43 `footer.font-body.pt-15.font-medium-text.text-base.text-gray-200` ([_$sinUmd_43 `span.mr-20` (['Playing: ', _$sinUmd_43 `span.text-gray-100.font-numeric` (new Set(wagers.map(w => w.ref)).size)]), _$sinUmd_43 `span` (['Coins: ', _$sinUmd_43 `span.text-gray-100.font-numeric` ((wagers.reduce((s, w) => s + w.amount, 0) / 100).toFixed(2))])])]
    const betHeighest = wager => _$sinUmd_43 `div.h-50.rounded.bg-gray-400.mb-20.p-15.flex.flex-row.align-center.text-gray-100.font-body.text-sm.font-medium
` ({
        style: wager == null ? '' : [wager.you ? 'background: #3F4558;' : '', wager.win === true ? 'background: #304D35;' : '', wager.win === false ? 'opacity: 0.5' : ''].join('')
    }, wager == null ? '' : bet(wager, false))
    const betItem = wager => _$sinUmd_43 `li.h-30.rounded.bg-gray-400.p-5.flex.flex-row.align-center.text-gray-100.font-body.text-sm.font-medium
  mb 2px
` ({
        style: [wager.you ? 'background: #3F4558;' : '', wager.win === true ? 'background: #304D35;' : '', wager.win === false ? 'opacity: 0.5' : ''].join('')
    }, bet(wager, true))
    const bet = (wager, row = true) => [_$avatar_2 `.mr-10` ({
        src: wager.avatar || 'images/default-avatar.svg'
    }), _$sinUmd_43 `span.displayName.truncate.flex-1` ({}, [wager.displayName, wager.flags && wager.flags.includes('V') && _$icons_8.verified `.text-blue.inline-block;w 12;h 12;mb -1;ml 4`]), _$sinUmd_43 `span.multiplier.w-80.ml-auto.whitespace-no-wrap.ml-5.font-numeric
  ` ({}, 'x ' + (wager.multiplier / 100).toFixed(2)), _$sinUmd_43 `span.wager.align-center.flex.flex-row.ml-5.mr-10` ({
        class: row ? 'w-70' : 'w-60'
    }, [_$icons_8.coins `.text-yellow.inline-block
      h 12
      mr 8
      transform: scale(0.6315789474);
    `, _$sinUmd_43 `span.flex-1.font-numeric
    ` ({
        class: wager.win ? 'text-green' : ''
    }, ((wager.win ? wager.profit : wager.amount) / 100).toFixed(2))])]
    var _$skins_1 = {
        "0.01": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7ODYTjBH_9SJh4GFk8j5Nr_Yg2Zu5MRjjeyP9Nih3lC2qUZvYWnzcoWVclc5aVvT-1Ptwr3rhJW5vp3Lz3Mw6SkksWGdwULlxUBIxA",
            "phase": "",
            "lower": 0.01,
            "short_name": "SCAR-20 | Sand Mesh",
            "exterior": "Field-Tested",
            "market_name": "SCAR-20 | Sand Mesh",
            "rarity": "Consumer Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 53.5px; background-position -265px -0px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJfwPz3Yi1D79mJmYGZnvnxDLbUkmJE5fp9i_vG8MKsjgXi_UFpNjv6J9PAc1Q5aV-F8li6k-7n1Ja4vMiaz3Zhsyd0s37bgVXp1pm8gAuN",
            "phase": "",
            "lower": 0.01,
            "short_name": "Dual Berettas | Colony",
            "exterior": "Field-Tested",
            "market_name": "Dual Berettas | Colony",
            "rarity": "Consumer Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 72.5px; h 62.5px; background-position -87px -105.5px; background-size 530.5px 530.5px"
        }],
        "0.03": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposem2LFZf2-r3cC9B-NW1q4OEmePmMqjFqWdY781lteXA54vwxlDl_0doZ2_0cdOcewE7NVmC_gW7w-bo1JS0vMjBz3pn7ych5nfZlhapwUYbitqBBSQ",
            "phase": "",
            "lower": 0.03,
            "short_name": "G3SG1 | Polar Camo",
            "exterior": "Minimal Wear",
            "market_name": "G3SG1 | Polar Camo",
            "rarity": "Consumer Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 53.5px; background-position -355px -0px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhh3szcdD4b086zkIKHluTgDLfYkWNF18lwmO7Eu9zz0FCx_EZrYG6gd4WQI1U_NVnUqQe5xeftgZ6_tMmYzSZk63Iq4XbD30vg4jvN4E0",
            "phase": "",
            "lower": 0.03,
            "short_name": "Tec-9 | Re-Entry",
            "exterior": "Minimal Wear",
            "market_name": "Tec-9 | Re-Entry",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 63px; h 63.5px; background-position -281px -343px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-jxcjhjxszFI2kb08-mkYOfhfLLO77QgHJu5MRjjeyP84-n0AXm_UQ4Njv2do-Xc1I6Y1rRqAe6xL-70ZbptcyYn3Jr6HMl52GdwUJr--hqLg",
            "phase": "",
            "lower": 0.03,
            "short_name": "M249 | Spectre",
            "exterior": "Battle-Scarred",
            "market_name": "M249 | Spectre",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 57.5px; background-position -175px -0px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU0naHKIj9D7oTgl4LelaGnMuqIwDgFusR337HCpYmhiwzm8ktqMjv2INKLMlhprbp6CTE",
            "phase": "",
            "lower": 0.03,
            "short_name": "CS20 Case",
            "market_name": "CS20 Case",
            "rarity": "Base Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 88.5px; h 65px; background-position -0px -0px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsVFx5KAVo5PSkKV4xhfGfKTgVvIXlxNPSwaOmMLiGwzgJvJMniO-Zoo_z2wXg-EVvfSmtc78HsNoy",
            "phase": "",
            "lower": 0.03,
            "short_name": "Gamma 2 Case",
            "market_name": "Gamma 2 Case",
            "rarity": "Base Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 86.5px; h 63.5px; background-position -88.5px -0px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwOP3ZSpL68-JloWKlP_LO77QgHJu5MRjjeyP8d-j2QHnr0c_ZD30JYWVdw47NFDZ8lLsk-65h5Htvp6cyns36HUm7GGdwUK3sLGYBQ",
            "phase": "",
            "lower": 0.03,
            "short_name": "MAC-10 | Surfwood",
            "exterior": "Battle-Scarred",
            "market_name": "MAC-10 | Surfwood",
            "rarity": "Consumer Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 58.5px; h 65px; background-position -221.5px -460px; background-size 530.5px 530.5px"
        }],
        "0.05": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zLZAJSvozmxL-CgfjmKoTZk2pH8fp9i_vG8MKtjgPj-hVua2D3ddfBdA5sMw7Y-VS9l7u7hcLpvpuazXVru3Yn7HjagVXp1kgdU3rL",
            "phase": "",
            "lower": 0.05,
            "short_name": "P2000 | Ivory",
            "exterior": "Battle-Scarred",
            "market_name": "P2000 | Ivory",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 55px; h 53.5px; background-position -407px -327.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhoyszMZD5W_-OxhoWSqPv9NLPFqWdQ-sJ0xLzF9NX02wXmqhY4Mjz7LI6QJFA8NFyErwK6wubo08O6vZmanHY27yM8pSGKdBP_UDI",
            "phase": "",
            "lower": 0.05,
            "short_name": "Nova | Mandrel",
            "exterior": "Factory New",
            "market_name": "Nova | Mandrel",
            "rarity": "Consumer Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 45.5px; background-position -265px -100px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtFt7OrFAthwfTNP2oU6ojgxdjbz6PwNezQkG4H7sYn2uiR89-s31ax-kNsNjr0d9WWewQgIQaHWd7HVwo",
            "phase": "",
            "lower": 0.05,
            "short_name": "Sticker | rain | Berlin 2019",
            "market_name": "Sticker | rain | Berlin 2019",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 65px; h 62.5px; background-position -90px -300.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ08-mq4yOluHxIITck29Y_chOhujT8om73QCw-BE6amiiLdWVcgA_YAzZq1HoyO_n15LvvpvIySYyvigm4S7flwv33099HeXqqg",
            "phase": "",
            "lower": 0.05,
            "short_name": "USP-S | Forest Leaves",
            "exterior": "Field-Tested",
            "market_name": "USP-S | Forest Leaves",
            "rarity": "Industrial Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89px; h 46.5px; background-position -265px -53.5px; background-size 530.5px 530.5px"
        }],
        "0.1": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFABz7PXBfzxO08y5m4yPkvbwJenunm5Q_txOhujT8om72w3n8hI_ZWigLYaUIQM-ZgzUqALrxui6hZ60tJqbynpluiYr7X6Iywv330-Xn4ummw",
            "phase": "",
            "lower": 0.1,
            "short_name": "MP7 | Cirrus",
            "exterior": "Battle-Scarred",
            "market_name": "MP7 | Cirrus",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 68px; h 66px; background-position -89px -168px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0v73cidUvuO7kr-GkvP9JrbummpD78A_2OuT89yt3ALhr0o_MmzyJtfEdwdqMljT-1Hswu--hcfp6pjNn3pjsz5iuyi40U9lNQ",
            "phase": "",
            "lower": 0.1,
            "short_name": "CZ75-Auto | Polymer",
            "exterior": "Field-Tested",
            "market_name": "CZ75-Auto | Polymer",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 67.5px; h 53.5px; background-position -155px -345.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhz3MzadDl94NWxnJS0m_bmNL6fkDoIsJ0njrnFpd3w3wfkrRBtNmn2JIKUdFc4Z1zS_lm2xOzp1J-474OJlyVSKLZX4g",
            "phase": "",
            "lower": 0.1,
            "short_name": "Nova | Candy Apple",
            "exterior": "Minimal Wear",
            "market_name": "Nova | Candy Apple",
            "rarity": "Industrial Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 45.5px; background-position -175px -57.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-NmOXxIK_ulGRD7cR9teTE8YXghWu4qgE7Nnf2ctWSIA82N17V8lK6ybq7gce4uZuczHRmsikns33Umhbm0BhEbORmm7XAHq4bWHSW",
            "phase": "",
            "lower": 0.1,
            "short_name": "M4A1-S | Boreal Forest",
            "exterior": "Field-Tested",
            "market_name": "M4A1-S | Boreal Forest",
            "rarity": "Industrial Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -435.5px -147.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRcQFXICOak0PDbRlpnGghWpL2gZQI4hqKZcztD6NnmlobSlvP2MuOGxT0Cv5wn3rDEp4qk3lG2_URqZj_tZNjCGA8IM-0",
            "phase": "",
            "lower": 0.1,
            "short_name": "Sticker | Big Hugs",
            "market_name": "Sticker | Big Hugs",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 63.5px; h 44px; background-position -90px -486.5px; background-size 530.5px 530.5px"
        }],
        "0.15": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FF8ugPDMIWpAuIq1w4KIlaChZOyFwzgJuZNy3-2T89T0jlC2rhZla2vwIJjVLFHz75yKpg",
            "phase": "",
            "lower": 0.15,
            "short_name": "Falchion Case",
            "market_name": "Falchion Case",
            "rarity": "Base Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 86.5px; h 63.5px; background-position -0px -65px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouL-iLhFf2-r3dShB-M-JjYWHm_jjDLbUkmJE5fp9i_vG8MKgiQbsrxA-ZWv2d9CSIQE2Y1rXqFHrwObtjcW1v57OzXVq7iYr7CvfgVXp1qzwb0Lf",
            "phase": "",
            "lower": 0.15,
            "short_name": "Negev | Bulkhead",
            "exterior": "Well-Worn",
            "market_name": "Negev | Bulkhead",
            "rarity": "Industrial Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 85.5px; h 54px; background-position -445px -0px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopL-zJAt21uH3eSR9-9m0h7-DkvbiKoTdl3lW7Yt12eyZ8Iit3FLh_kI-a2D3I9KdegBoZ1_TqAK5lO7mgMW66JvKzndnpGB8sly0Ux1q",
            "phase": "",
            "lower": 0.15,
            "short_name": "R8 Revolver | Crimson Web",
            "exterior": "Battle-Scarred",
            "market_name": "R8 Revolver | Crimson Web",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 69.5px; h 55.5px; background-position -157px -225px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReXx6ACOe-hZ_sR1xmKhBoor-oOwJy0v3LdAJO7c6xkc6Jz6OjZ-uEz28C7p1zi7yZ9N300AbnrhY-am70INSTdwQ7NFvU_gTo366x0jKNHMq_",
            "phase": "",
            "lower": 0.15,
            "short_name": "Sticker | Temperance",
            "market_name": "Sticker | Temperance",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 56px; h 47.5px; background-position -463px -384.5px; background-size 530.5px 530.5px"
        }],
        "0.2": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReXx6ACOe-hZ_sXUh_IDtVs7u2Pzhs0uHPdHMR6d_klYHczvP3N-qDkG8Cv8Ym2LvEp4qm2wC180Fsa236IteTdQY-fxiOrcBG_X-P",
            "phase": "",
            "lower": 0.2,
            "short_name": "Sticker | Nuke Beast",
            "market_name": "Sticker | Nuke Beast",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 51px; h 64.5px; background-position -226.5px -225px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpos7asPwJfwPz3YTxM-NSzhr-DkvbiKoTdl3lW7Yt1jrmTotyhjgfh_Us_NWvwJoPHJARqN12GqVftwOvsgMTqv56YySA2pGB8suP10Imt",
            "phase": "",
            "lower": 0.2,
            "short_name": "Dual Berettas | Panther",
            "exterior": "Battle-Scarred",
            "market_name": "Dual Berettas | Panther",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 72.5px; h 62.5px; background-position -338.5px -149px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf2-r3ZjhA_-O-kYGdjsj4MqnWkyUH6pFy3bGSoomgiQLnrxBpMmHwJdKQIA8_aVvX_la2xe_r0JK56pnM1zI97ckpbf42",
            "phase": "",
            "lower": 0.2,
            "short_name": "CZ75-Auto | Crimson Web",
            "exterior": "Battle-Scarred",
            "market_name": "CZ75-Auto | Crimson Web",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 58.5px; h 51.5px; background-position -222.5px -408.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulROR0XcS-O_2NrDbF51NRdCur_qLwpn7P_JYzpHoozgwtnexKD1Y7rVwjgAupUm2LuZot-ijlDm80BqNjqhJYCdJFA-aVrOug_p9nN0FJs",
            "phase": "",
            "lower": 0.2,
            "short_name": "Sticker | Distinguished Master Guardian",
            "market_name": "Sticker | Distinguished Master Guardian",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 64.5px; h 63px; background-position -341px -264.5px; background-size 530.5px 530.5px"
        }],
        "0.3": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHFF9NDtbt6iiLklkg_LKKT4bu4Szl9aJxKHwa--CzzgB7MEpibHCpYql31Djr0E4MGmmOsbLJctCEnYj",
            "phase": "",
            "lower": 0.3,
            "short_name": "Sticker | Team Liquid | Berlin 2019",
            "market_name": "Sticker | Team Liquid | Berlin 2019",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 65px; h 62.5px; background-position -281px -406.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhjxszcdD4b092lnYmGmOHLPr7Vn35c18lwmO7Eu9ii3Vfhr0Foazj2I9CTJAVvaVGCrFLvyLu8gp_ttZ6dzSRiv3VwsX3D30vgmI_45mM",
            "phase": "",
            "lower": 0.3,
            "short_name": "Tec-9 | Isaac",
            "exterior": "Field-Tested",
            "market_name": "Tec-9 | Isaac",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 58px; h 57.5px; background-position -277.5px -224.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhnwMzYI2gS09W4koWZmfjLO77QgHJu5MRjjeyPpNSsiwaxqBdqZG2nJ4-QdAE_ZFCF_1HvwO_rgJTv7ZiaySYyuyYg5GGdwUKBZPSpqQ",
            "phase": "",
            "lower": 0.3,
            "short_name": "P250 | Inferno",
            "exterior": "Battle-Scarred",
            "market_name": "P250 | Inferno",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 56.5px; h 52px; background-position -411px -445.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulROR0XcS-O_2NrDbF51NRdCur_qOA5sxfbaTjFD_tuz2tCJlKTwZL2Bw2hUsJB327qX942liQS3qUplZ2n0doSVdw4_Z1uF8gCggbC4m_nmubU",
            "phase": "",
            "lower": 0.3,
            "short_name": "Sticker | Silver",
            "market_name": "Sticker | Silver",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 52px; h 64.5px; background-position -411px -381px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotaDyfgZf0Ob3cicVueOzl4-0mvLwOq7cqWdQ-sJ0xLjEoo-i0AG1rkBta23zLNKccQ43N1jQ_le2lejohpa0tZrLm3Fluyk8pSGKu5m0qKw",
            "phase": "",
            "lower": 0.3,
            "short_name": "CZ75-Auto | Eco",
            "exterior": "Well-Worn",
            "market_name": "CZ75-Auto | Eco",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 67.5px; h 53.5px; background-position -154px -452.5px; background-size 530.5px 530.5px"
        }],
        "0.4": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo7e1f1Jf0Ob3ZDBS09-5hpCEhfb4DLfYkWNF18lwmO7Eu43w2gfnqUc6MjugLdDDd1BrN16E-FTvyenugpPv6ZiYnXo1uHV34yrD30vgsbpsexc",
            "phase": "",
            "lower": 0.4,
            "short_name": "UMP-45 | Corporal",
            "exterior": "Factory New",
            "market_name": "UMP-45 | Corporal",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 87px; h 60px; background-position -0px -128.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0Ob3dzxP7c-JmIWFg_bLP7LWnn9u5MRjjeyPoo333QTsqkdsZDz2ItfHdwI_NQmF-1O5lLjq08W6uMvJwCRl63Ui7WGdwUJj4iqdBQ",
            "phase": "",
            "lower": 0.4,
            "short_name": "FAMAS | Survivor Z",
            "exterior": "Minimal Wear",
            "market_name": "FAMAS | Survivor Z",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89px; h 50.5px; background-position -0px -188.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRWTVjfUO2u0p2DAgQ7Ng1QibO2OAZh7PXHeDF94N2kk4XFlqDxZ-jSlW8I7ZIk2bvC8Nrw3Qzh_hJqYWv7JITBJgQ_aQ7Y_Ffow_Cv28FBeJ4OcA",
            "phase": "",
            "lower": 0.4,
            "short_name": "Sticker | ISSAA",
            "exterior": "Foil",
            "market_name": "Sticker | ISSAA | Katowice 2019",
            "rarity": "Remarkable",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 64.5px; h 65px; background-position -89.5px -363px; background-size 530.5px 530.5px"
        }],
        "0.5": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PDdTjlH_9mkgL-OlvD4NoTSmXlD58F0hNbN_Iv9nGu4qgE7Nnf2ctLAcFVtYAvZqFm8k-66jJ6-v5nNzCFk7HIgtyrenBHl0hpEaLQ5m7XAHlenWNbj",
            "phase": "",
            "lower": 0.5,
            "short_name": "Desert Eagle | Oxide Blaze",
            "exterior": "Factory New",
            "market_name": "Desert Eagle | Oxide Blaze",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 70px; h 53px; background-position -335.5px -211.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf1OD3djFN79fnzL-chfbgO6LCqWdY781lteXA54vwxgy3rUc9MTjxJNKUewVvYF7U_AO9xua-hsK8uMzPnyc2uXYk43jfm0apwUYbzF_ISHM",
            "phase": "",
            "lower": 0.5,
            "short_name": "Glock-18 | Wraiths",
            "exterior": "Factory New",
            "market_name": "Glock-18 | Wraiths",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 62.5px; h 48.5px; background-position -280px -469px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulROWUvRVeKs1MrsUFxkNhFbs_WzIgBn3MzEcC9F6ZLvzdTezqOjNeiExG1Xvp0k2LvCoNitjQLh-BduN2Hxd4KTcFI_YArY5BHglhBMoCDF",
            "phase": "",
            "lower": 0.5,
            "short_name": "Sticker | Viggo",
            "market_name": "Sticker | Viggo",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 44.5px; h 65px; background-position -405.5px -211.5px; background-size 530.5px 530.5px"
        }],
        "0.6": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhhwszcdD4b09--lYyAqOf1J6_UhGVu5Mx2gv3--Y3nj1H6rkNoYWynJNeQdFVvZAnS-FW-k-nugZ-57Zicn3Ax6SRzs3-Ilha0gAYMMLLE3AkjFQ",
            "phase": "",
            "lower": 0.6,
            "short_name": "Tec-9 | Cut Out",
            "exterior": "Minimal Wear",
            "market_name": "Tec-9 | Cut Out",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 63px; h 63.5px; background-position -344px -327.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRJSU3dePai28rAbF51NRdCur_qKQZpx_baTjFD_tuz2obex_SnNe6FxG0J7MQgibuR8N323wa2rxFoMWj2JoLBcVc3NVqG81eggbC4IvaHa-Q",
            "phase": "",
            "lower": 0.6,
            "short_name": "Sticker | The Baiter",
            "market_name": "Sticker | The Baiter",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 60.5px; h 61px; background-position -280.5px -282px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW09--m5CbkuXLNLPehX9u5Mx2gv3--Y3nj1H6-ERoamjwcNeRewQ9YlrS-QXrxb2-hMDqvJSYy3Iw6SJz4i7Umxe_iQYMMLJAgtH0rg",
            "phase": "",
            "lower": 0.6,
            "short_name": "M4A4 | Magnesium",
            "exterior": "Minimal Wear",
            "market_name": "M4A4 | Magnesium",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -0px -239px; background-size 530.5px 530.5px"
        }],
        "0.7": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FABz7OORIQJE-dC6q5SDhfjgJ7fUqWZU7Mxkh9bN9J7yjRqx-BZsYzv0JtSXcgA8aVqE81Lrx-bs0cLvvsjBwHRhsiVw5S2JlhGxn1gSOUW-oNgw",
            "phase": "",
            "lower": 0.7,
            "short_name": "P90 | Chopper",
            "exterior": "Field-Tested",
            "market_name": "P90 | Chopper",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 80.5px; h 49px; background-position -443px -54px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulROR0XcS-O_2NrDbF51NRdCur_qLAtv0fLETjhO5cizq4yKhfDxfejVzjsCvMdy3rvEot-n31K1_kU-ZmzyI4HBcQM5Y1GB81Xow7znhJCi_MOeCEWoNJQ",
            "phase": "",
            "lower": 0.7,
            "short_name": "Sticker | Global Elite",
            "market_name": "Sticker | Global Elite",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 65px; h 63px; background-position -346px -391px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alDL3dl3hZ6sRygdbM8Ij8nVmLpxIuNDztcISUJgBtYwnQqAXolOi7gJS67pnLyCdl7iAjsHrfmxXkiRoab-Zpg-veFws-fikLqQ",
            "phase": "",
            "lower": 0.7,
            "short_name": "M4A1-S | Flashback",
            "exterior": "Well-Worn",
            "market_name": "M4A1-S | Flashback",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -171px -103px; background-size 530.5px 530.5px"
        }],
        "0.8": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRfSV7cTur_h56KHE59IjtTs6ysKAJf1fzBfQJO7c6xkc6Iwa6tar6AkzMF7pIgjLmVotih2lew8ktkNj_wIoWdclI3ZQmB_ATs366x0h4PVJOJ",
            "phase": "",
            "lower": 0.8,
            "short_name": "Sticker | device",
            "exterior": "Foil",
            "market_name": "Sticker | device | Berlin 2019",
            "rarity": "Remarkable",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 65px; h 62.5px; background-position -346px -454px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTj5Q9c-ilYyHnu3xN4TVl3la18l4jeHVyoD0mlOx5UE4ZD30IYXEeg89NAvTrFHvxenv1MC1upTJmCNlvnRxsCyJmBSzh05SLrs4f9_uTiE",
            "phase": "",
            "lower": 0.8,
            "short_name": "Desert Eagle | Meteorite",
            "exterior": "Minimal Wear",
            "market_name": "Desert Eagle | Meteorite",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 68.5px; h 53.5px; background-position -154px -399px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uOlm7-Ehfb6NL7ul2hS7ctlmdbM8Ij8nVmLpxIuNDztIoCXdANvY13Srli6xrvp0cXqv8jBmCZguHJ3sX3elhC3ghBPa-xvjOveFwvm_9yLhw",
            "phase": "",
            "lower": 0.8,
            "short_name": "M4A1-S | Nitro",
            "exterior": "Field-Tested",
            "market_name": "M4A1-S | Nitro",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -159.5px -142.5px; background-size 530.5px 530.5px"
        }],
        "0.9": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRbSV7RS9u9xcrXUkl7NxcYuq-3IAJy7PTEfi5R9eO6lZKMkrnwZ-zQkzkCvZV1i--Vpt2liQHi-UppZT_3dteUJgI2MF3Q_li7xL_mm9bi6wETVF54",
            "phase": "",
            "lower": 0.9,
            "short_name": "Sticker | Lurker",
            "market_name": "Sticker | Lurker",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 64.5px; h 58.5px; background-position -89.5px -428px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0vL3djFN79eJxdi0guX2MrXum2Re5vp3j__E57P5gVO8vywwMiukcZjEcgQ8Zg7Y-wS6xbq91JC07c-bnHdqv3Qm53iJmRfhiE5FbrE-jPzKVxzAUGqGrtJ1",
            "phase": "",
            "lower": 0.9,
            "short_name": "Glock-18 | Moonrise",
            "exterior": "Minimal Wear",
            "market_name": "Glock-18 | Moonrise",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 62.5px; h 48.5px; background-position -450px -187px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxfwPz3YzhG09C_k4ifqPv1IbzU2DoG6pQpi7qV9Njx0ADk8kNpZmH0cY-Uelc2ZFjQ_1a4lOfu15bv7pTXiSw0KjtfQAI",
            "phase": "",
            "lower": 0.9,
            "short_name": "Glock-18 | Candy Apple",
            "exterior": "Factory New",
            "market_name": "Glock-18 | Candy Apple",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 60.5px; h 48.5px; background-position -462px -287.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DfQOqohZ-CBRJnLANosKisKQJy1MzEcC9F6ZLnxNTSxvOlYu_UxWgCvpUm3-jE8d2kjAHi_UFqYWD0coOccwBsZA3Y5BHglgVE7N25",
            "phase": "",
            "lower": 0.9,
            "short_name": "Sticker | friberg | Cologne 2016",
            "market_name": "Sticker | friberg | Cologne 2016",
            "rarity": "High Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 61px; h 54px; background-position -219.5px -289.5px; background-size 530.5px 530.5px"
        }],
        "1": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFBRw7P3dejhR-M6_hIW0mOX1PbzUqWpE7_p9g-7J4bP5iUazrl1oYGn6JYWdIFI7M1GF_1C2x-zn0ZO9u8zLzndkvid3tnaOnRe3hkxPcKUx0qBdIrwT",
            "phase": "",
            "lower": 1,
            "short_name": "AUG | Radiation Hazard",
            "exterior": "Factory New",
            "market_name": "AUG | Radiation Hazard",
            "rarity": "Industrial Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89.5px; h 49.5px; background-position -0px -390.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhhwszFcDoV08-hlYfcqPv9NLPFqWdQ-sJ0xLuRptikjQft_Rc-a2GiIdPGJlM2ZQ7YqFm-wr_qhZbquMycmnExvyU8pSGK45CFuuo",
            "phase": "",
            "lower": 1,
            "short_name": "MAG-7 | SWAG-7",
            "exterior": "Factory New",
            "market_name": "MAG-7 | SWAG-7",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 87px; h 50px; background-position -0px -440px; background-size 530.5px 530.5px"
        }],
        "2": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ08-mq42OhP_LILrXk39I-sB1teTE8YXghWu4qgE7Nnf3LdXDcAI5Z1iD-1S6xey60MO_6ZzJzyNluyVxsH2IzRzkiBAfbOY-m7XAHrcyvEA2",
            "phase": "",
            "lower": 2,
            "short_name": "USP-S | Check Engine",
            "exterior": "Field-Tested",
            "market_name": "USP-S | Check Engine",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 82.5px; h 42px; background-position -88.5px -63.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFA957PTNfS1H4uO6nYeDg8j4MqnWkyVUuZx1jr-ZrY-n2VWx-0poNT-gJ4CRe1M2YQ2F-wK_l-7mgJ-9vpiY1zI97SA2aaa6",
            "phase": "",
            "lower": 2,
            "short_name": "MP7 | Gunsmoke",
            "exterior": "Factory New",
            "market_name": "MP7 | Gunsmoke",
            "rarity": "Industrial Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 65px; h 66.5px; background-position -90px -234px; background-size 530.5px 530.5px"
        }],
        "3": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITfn2xZ_MhwmOz-_Yn0nk2LpxIuNDztd4TEcgM2NFuD_1C3wua6gZS1tZvNm3dr7iMm7SuImRTl1xpPaLA7geveFwuyOXGkNw",
            "phase": "",
            "lower": 3,
            "short_name": "M4A1-S | Nightmare",
            "exterior": "Battle-Scarred",
            "market_name": "M4A1-S | Nightmare",
            "rarity": "Classified",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -249px -145.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17OORIQJR5N2mkZeEmPPLP7LWnn9u5MRjjeyP8Nui3ADs_0M_a2ChJdSdcVRraVqE-Ae4xby615PtuprIwCFnvXJ25mGdwUJZLpuVYA",
            "phase": "",
            "lower": 3,
            "short_name": "P90 | Shapewood",
            "exterior": "Minimal Wear",
            "market_name": "P90 | Shapewood",
            "rarity": "Classified",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 80.5px; h 49px; background-position -355px -100px; background-size 530.5px 530.5px"
        }],
        "4": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09uknYaNnvnLPr7Vn35c18lwmO7Eu96kiVCx_kBlY26lJ9eUJlc_MFHW-Ae9l-vogpO5vZTPyHNnuXQitinD30vgHP9iLbw",
            "phase": "",
            "lower": 4,
            "short_name": "M4A4 | Griffin",
            "exterior": "Field-Tested",
            "market_name": "M4A4 | Griffin",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -0px -289.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957OnHdTRD746JmImMn-PLP7rDkW4fvpJ1i7ySod-n2gfi-kZqajunLYCWdQA2aQrX-lXsxOnthpS5vpSfmGwj5HcW608dkQ",
            "phase": "",
            "lower": 4,
            "short_name": "AWP | Sun in Leo",
            "exterior": "Minimal Wear",
            "market_name": "AWP | Sun in Leo",
            "rarity": "Industrial Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -0px -490px; background-size 530.5px 530.5px"
        }],
        "5": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0uL3dzxP7c-Jl4-Fg_jhIYTdn2xZ_Pp9i_vG8MKj3VDh-kY9MWr3dYDDdwZtaQnV-Fi4k-vph8e0vcmYzXBlvCNw7X7UgVXp1iHYIfHn",
            "phase": "",
            "lower": 5,
            "short_name": "FAMAS | Valence",
            "exterior": "Factory New",
            "market_name": "FAMAS | Valence",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89px; h 50.5px; background-position -0px -340px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09G3moSKm_bLP7LWnn9u5MRjjeyPpY32igHl_0VoMD30JoCRcVU4MFmGrwfvl-bohpC-tJWcm3c3uiJ04mGdwUJxLpw2dQ",
            "phase": "",
            "lower": 5,
            "short_name": "P250 | Muertos",
            "exterior": "Factory New",
            "market_name": "P250 | Muertos",
            "rarity": "Classified",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -405.5px -276.5px; background-size 530.5px 530.5px"
        }],
        "6": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq4uKnvr1PYTck29Y_chOhujT8om72Ay2_ENuY26ncoDBd1I_MlCBrgW5ye_u1sC_vJ6YyXtgsiYh7HnUywv330-jy4MGQg",
            "phase": "",
            "lower": 6,
            "short_name": "USP-S | Caiman",
            "exterior": "Field-Tested",
            "market_name": "USP-S | Caiman",
            "rarity": "Classified",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89px; h 46.5px; background-position -354px -53.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRWTVjfUO2u0p2DAgQ7Ng1Qib6sKAxzx_LLaAJE49W6q4yKhfDxfbqCwDJXuJ130uiYpdX33FDm-EFvZzqmcNKTIwJtZFGB_1frxO7tjZCi_MOewILCWmg",
            "phase": "",
            "lower": 6,
            "short_name": "Sticker | DickStacy",
            "exterior": "Foil",
            "market_name": "Sticker | DickStacy | Katowice 2019",
            "rarity": "Remarkable",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 64.5px; h 65px; background-position -155px -280.5px; background-size 530.5px 530.5px"
        }],
        "7": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS09-vloWZlOX7MITdn2xZ_Pp9i_vG8MKm0QKwrkI4Zmr0LYHDeg45ZAzS_lPqwLu9hpXouc_ByCYw7yJwt3eIgVXp1mgrQle0",
            "phase": "",
            "lower": 7,
            "short_name": "P250 | See Ya Later",
            "exterior": "Minimal Wear",
            "market_name": "P250 | See Ya Later",
            "rarity": "Covert",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 56.5px; h 52px; background-position -460.5px -235.5px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhoyszJemkV4N27q4KHgvLLP7LWnn9u5MRjjeyPrIqtjVfh-kNvNj-iIdSSIwZsYlHR8wC_wrzr0cO7tMjImyZluyJz5WGdwUKTUQkCog",
            "phase": "",
            "lower": 7,
            "short_name": "AK-47 | Blue Laminate",
            "exterior": "Factory New",
            "market_name": "AK-47 | Blue Laminate",
            "rarity": "Restricted",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -435.5px -103px; background-size 530.5px 530.5px"
        }],
        "8": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0v73fyhB4Nm3hr-bluPgNqnfx1RW5MpygdbN_Iv9nGu4qgE7NnfzJdOcc1I8aFvQr1G6lersh5e57siam3tjviQlt32IzUDkgEseZrFmm7XAHtr3Zeyq",
            "phase": "",
            "lower": 8,
            "short_name": "Glock-18 | Reactor",
            "exterior": "Factory New",
            "market_name": "Glock-18 | Reactor",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 60.5px; h 48.5px; background-position -463px -336px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7umeldfwPz3YShQ_NCzq4yCkP_gDLfQhGxUpsYlj7uToN7zjQHkqhI-Z2uhItLGJg45YA7T-Va2x7jpjcO6vpvInCN9-n511zd-YeM",
            "phase": "",
            "lower": 8,
            "short_name": "MAC-10 | Ultraviolet",
            "exterior": "Factory New",
            "market_name": "MAC-10 | Ultraviolet",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 58.5px; h 65px; background-position -222.5px -343.5px; background-size 530.5px 530.5px"
        }],
        "9": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLO_JAlf0Ob3czRY49KJlYyHqP76DLfYkWNF18lwmO7Eu4im2VWx8kQ6Nm33LNSQdwZtNw3Q_AW4wOm71Me_uZrMmnVk7yhx5y7D30vgCLYcuUs",
            "phase": "",
            "lower": 9,
            "short_name": "StatTrak™ PP-Bizon | High Roller",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ PP-Bizon | High Roller",
            "rarity": "Classified",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89px; h 43px; background-position -157px -182px; background-size 530.5px 530.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO-jb-ZkvPgOrzUhFRd4cJ5ntbN9J7yjRrkqUdsMmzydoaVcAZoMFnX8lDqlbzohpC06Z6bynswuiMg43yPnUHjn1gSOeB59EOh",
            "phase": "",
            "lower": 9,
            "short_name": "StatTrak™ M4A1-S | Blood Tiger",
            "exterior": "Factory New",
            "market_name": "StatTrak™ M4A1-S | Blood Tiger",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "0@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -246px -185px; background-size 530.5px 530.5px"
        }],
        "10": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV09K_loKHkuXLPr7Vn35c18lwmO7Eu9rzjVft_kpuazqlLdSRelc5MAzT81C8k-nr0J7ovpuazXUyvyEhti7D30vg79xIhs0",
            "phase": "",
            "lower": 10,
            "short_name": "StatTrak™ AK-47 | Rat Rod",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ AK-47 | Rat Rod",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -260px -245.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf1OD3dzxP7c-JmIWMlvTtDLzemm9u5cB1g_zMyoD0mlOx5UY_MT_xcIfGdgFrZF3Z-FG8kr_vhcC_6prLzndrvnFzt36JzUHigxlSLrs4R2CbkEM",
            "phase": "",
            "lower": 10,
            "short_name": "FAMAS | Commemoration",
            "exterior": "Field-Tested",
            "market_name": "FAMAS | Commemoration",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 50.5px; background-position -533.5px -102px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PDdTi5B7c6Jl5mZku_LP7LWnn9u5MRjjeyP8ImhjFXl-BZuN273cIbDJgdoNQqBq1now72-gZ_p7pyaziRj63NxtGGdwULm7JPnpA",
            "phase": "",
            "lower": 10,
            "short_name": "SCAR-20 | Cyrex",
            "exterior": "Factory New",
            "market_name": "SCAR-20 | Cyrex",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 55.5px; background-position -84px -0px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRRQ0LUSOr_h56LHEltKTtRubOpFAthwfTNP28butnjx9aJxqX3YOrVwT0I7JNy2OqU992n2wLn_BVsNmChIYaWJ1IgIQaHqmDkNF0",
            "phase": "",
            "lower": 10,
            "short_name": "Sticker | Tyloo",
            "exterior": "Foil",
            "market_name": "Sticker | Tyloo | London 2018",
            "rarity": "Exotic",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 64px; h 61.5px; background-position -466px -577px; background-size 644px 644px"
        }],
        "12": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhh3szYI2gS096zlYSOk8jkMrLfglRd4cJ5ntbN9J7yjRrmrxc4Yj33doDBJgBoMFrQ8lO-we_nhZTtup2YmiQys3Rzty7anRfjn1gSORMi-P6n",
            "phase": "",
            "lower": 12,
            "short_name": "P250 | Undertow",
            "exterior": "Minimal Wear",
            "market_name": "P250 | Undertow",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -586.5px -592px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goW0hPLiNrXul2VW-txOhuDG_ZjKhFWmrBZyZm36LIDAegA_ZlCF-lW4w7rsgcDpu5WbzyBkuCYg7H3VnhayhRkaa_sv26KGUuZy7w",
            "phase": "",
            "lower": 12,
            "short_name": "Five-SeveN | Angry Mob",
            "exterior": "Factory New",
            "market_name": "Five-SeveN | Angry Mob",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 62.5px; h 53px; background-position -403.5px -583.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957PvBZzh94dmynZWGqPv1IbzU2DMEv8Rw3-3Epo6giQyxqkFoYGChJ4adcQ46YAzY_1DswObvgMO_u8nXiSw0zFWmqYw",
            "phase": "",
            "lower": 12,
            "short_name": "AWP | Electric Hive",
            "exterior": "Field-Tested",
            "market_name": "AWP | Electric Hive",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -531px -194.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zbYTFD_9SJhNLex8j4OrzZglRd6dd2j6eYp9uljAyw-kc_YGCicdCdcQI-Zg2B_1HrxO-5hcPutJSayHVhvCN2-z-DyDH08JDT",
            "phase": "",
            "lower": 12,
            "short_name": "StatTrak™ P250 | Splash",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ P250 | Splash",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -452px -470.5px; background-size 644px 644px"
        }],
        "14": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09Svq5OCkvDxDLnDl31e18l4jeHVyoD0mlOx5UZtZDv7LdOSelRoNFCCqwW5kr_u1Mfuu8idn3M3uiJz4HmPnUHmgx5SLrs4BeHLjR0",
            "phase": "",
            "lower": 14,
            "short_name": "USP-S | Overgrowth",
            "exterior": "Minimal Wear",
            "market_name": "USP-S | Overgrowth",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 46.5px; background-position -171px -290px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW08y_m46OkuXLP7LWnn9u5MRjjeyPp4j2iwC38kA9N2j7IIeSe1M9ZQrZ-VS3wefv0ZG_tZXOyHo3uSZ34WGdwUJSqpF9BQ",
            "phase": "",
            "lower": 14,
            "short_name": "M4A4 | The Battlestar",
            "exterior": "Factory New",
            "market_name": "M4A4 | The Battlestar",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -534.5px -51.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW0924l4WYg-X1P4Tdn2xZ_Pp9i_vG8ML2ilDt_EBuZWH6coKXIAFvNAvZ-wPqk-fug5DuvciczXNnsycmti3agVXp1u5gA4zt",
            "phase": "",
            "lower": 14,
            "short_name": "M4A4 | 龍王",
            "exterior": "Dragon King",
            "market_name": "M4A4 | 龍王 (Minimal Wear)",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -82px -147px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLddgJB5N27kYyOmPn1OqnUqWdY781lteXA54vwxlWw-hduNW_xcIeRegc3YlmE8gS8wrvv1MS86s-dzSdk6yYj5HzYyRKpwUYb8NvXBjQ",
            "phase": "",
            "lower": 14,
            "short_name": "StatTrak™ AUG | Chameleon",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ AUG | Chameleon",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89.5px; h 49.5px; background-position -264.5px -102px; background-size 644px 644px"
        }],
        "16": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FA957OnHfD9L6eO6nYeDg8j4MqnWkyUG7pMniLqR8Nqs2Aa1rkRrYWuhI4-Qc1BqZlzU_ADrxrvm15W0tJ2c1zI97eG9a5dJ",
            "phase": "",
            "lower": 16,
            "short_name": "StatTrak™ P90 | Virus",
            "exterior": "Factory New",
            "market_name": "StatTrak™ P90 | Virus",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -241.5px -427px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhzw8zSdD9Q7d-3mb-HnvD8J4Tdl3lW7YskjLiU9tXw3AW28hI_Ymr2do6SIVJvNQrU-lbtyOboh8O_vc7In3BqpGB8svPVnivE",
            "phase": "",
            "lower": 16,
            "short_name": "AK-47 | Predator",
            "exterior": "Factory New",
            "market_name": "AK-47 | Predator",
            "rarity": "Industrial Grade",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -328.5px -429px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0mvLwOq7cqWdQ-sJ0xL6UotT33FDn-UBvMDj6cIfAdgFtN13Rr1folezp08S_tJ3NwSNm6HE8pSGKFALUdWg",
            "phase": "",
            "lower": 16,
            "short_name": "StatTrak™ AWP | Corticera",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ AWP | Corticera",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -442px -235px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alfqjuhWJd7ctyj9bJ8I3jkWu4qgE7NnfyJI_He1doNQnR-lTowejvh8S-7p-azCQyuCchs3aOnR3khh4YOLFsm7XAHuqvsTNd",
            "phase": "",
            "lower": 16,
            "short_name": "M4A1-S | Master Piece",
            "exterior": "Battle-Scarred",
            "market_name": "M4A1-S | Master Piece",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -530px -279px; background-size 644px 644px"
        }],
        "18": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLuoKhRf0v73fyhB4Nm3hr-YnOL4P6iDqW1Q5cRiteXI8oTht1i1uRQ5fTygLYGSdlA9M1qB-lLoxOruhJW-vcmbmHVquHIi4CnclhW-hx1IabZxxavJY2WIqV0",
            "phase": "",
            "lower": 18,
            "short_name": "Souvenir FAMAS | Styx",
            "exterior": "Minimal Wear",
            "market_name": "Souvenir FAMAS | Styx",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 51.5px; background-position -82px -326px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszYcDNW5Nmkq4GAw6DLPr7Vn35c18lwmO7Eu46lilXm-kQ4YmHxdoeddVVqY1vU-lO7lb3vg57uu5rIzCMw7nZ35i3D30vgFhd2p1E",
            "phase": "",
            "lower": 18,
            "short_name": "AK-47 | Jaguar",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Jaguar",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -260px -382.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FAZh7OPJfzlN_t2JmImMn-PLP7rDkW4fsJYmj-iTrd6j2Abh-RJtNW_2INWXdQQ8aVHQ-lbvlO28gcW_6Zqcmmwj5HdtheOh8g",
            "phase": "",
            "lower": 18,
            "short_name": "MP9 | Pandora's Box",
            "exterior": "Factory New",
            "market_name": "MP9 | Pandora's Box",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 82px; h 60.5px; background-position -0px -144.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJS_8W1nI-bluP8DLfYkWNF18lwmO7Eu92kjQHgqkVrYzv0I4_AcwE7ZguDr1C2lL_tgJTou52cm3Fm6SZz4nrD30vgWTTGJEA",
            "phase": "",
            "lower": 18,
            "short_name": "StatTrak™ AWP | Fever Dream",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ AWP | Fever Dream",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -440px -275px; background-size 644px 644px"
        }],
        "20": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhh3szYI2gS096zlYSOk8jkMrLfglRd4cJ5ntbN9J7yjRrmrxc4Yj33doDBJgBoMFrQ8lO-we_nhZTtup2YmiQys3Rzty7anRfjn1gSORMi-P6n",
            "phase": "",
            "lower": 20,
            "short_name": "P250 | Undertow",
            "exterior": "Factory New",
            "market_name": "P250 | Undertow",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -586.5px -592px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jnI7LFkGJD7fp9g-7J4bP5iUazrl1ka2qhLIGSIw5vZF-D8wXqwO_tjcC-uZjJnSY3vCkmsXbYlkO0gB1McKUx0vNO72r1",
            "phase": "",
            "lower": 20,
            "short_name": "USP-S | Orion",
            "exterior": "Factory New",
            "market_name": "USP-S | Orion",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 46.5px; background-position -349px -338px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgIWKkPvxDLDEm2JS4Mp1mOjG-oLKhF2zowcDPzixc9OLcw82ZlyF8wC8wb251MW4tcifmydi7CEn4HiPlhyy1BxJbeNshqPIHELeWfJvK5CfiA",
            "phase": "",
            "lower": 20,
            "short_name": "Desert Eagle | Kumicho Dragon",
            "exterior": "Factory New",
            "market_name": "Desert Eagle | Kumicho Dragon",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 70px; h 53px; background-position -76px -565px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJM6dO4q5KCk_LmDLPUl31I18lwmO7Eu9qgjFHj8xE6N2Cid4ecI1BrYl_W-1jolb3u0JS178_BnHdn7HEnsSnD30vgqmlxLSg",
            "phase": "",
            "lower": 20,
            "short_name": "AK-47 | Neon Rider",
            "exterior": "Battle-Scarred",
            "market_name": "AK-47 | Neon Rider",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -350px -245.5px; background-size 644px 644px"
        }],
        "22": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTi5B7dCzh7-JhfbiPITdn2xZ_Pp9i_vG8MKji1a1_0VqamymI4LEelRrNFHT-ATvyO680Me-uMjIzXQw6HV04CragVXp1igFofN6",
            "phase": "",
            "lower": 22,
            "short_name": "Desert Eagle | Golden Koi",
            "exterior": "Factory New",
            "market_name": "Desert Eagle | Golden Koi",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 68.5px; h 53.5px; background-position -328.5px -473.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFA957OfBdjhQ09C_k4ifqPv1IbzU2G8D7sAo377FptWl21C3_kRram3zJ9PBc1U3ZFHU_QS_ybi-gsO66snXiSw0v9hgqjA",
            "phase": "",
            "lower": 22,
            "short_name": "StatTrak™ AUG | Bengal Tiger",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ AUG | Bengal Tiger",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89.5px; h 49.5px; background-position -354px -102px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFAZh7PXJdTh94czhq4yCkP_gDLfQhGxUpsB137qWrNmj3gK3_0dpNWqhJIbEdg84aVjW-FS_xbzs18S56MnIz3R9-n51LuzV2Hc",
            "phase": "",
            "lower": 22,
            "short_name": "MP7 | Fade",
            "exterior": "Factory New",
            "market_name": "MP7 | Fade",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 68px; h 66px; background-position -0px -569px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYX0DbRvCiwMbQVg8kdFEYur2nFAthwfTNPzgQuI_lkILdxKajY72CxTgCvZB0ibGZrN2hig3k-hY6Mm-mJIaXJFUgIQaHaAFqIc4",
            "phase": "",
            "lower": 22,
            "short_name": "Sticker | LGB eSports | Katowice 2015",
            "market_name": "Sticker | LGB eSports | Katowice 2015",
            "rarity": "High Grade",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 61.5px; h 62.5px; background-position -581.5px -372.5px; background-size 644px 644px"
        }],
        "24": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJF7dC_mL-IlvnwKrjZl2RC18l4jeHVyoD0mlOx5URsMGindteTIQRqNFHZ_ATtx-jp1JS6vM_PyXYwvSYisH_czUe1gUxSLrs4lUwxnXw",
            "phase": "",
            "lower": 24,
            "short_name": "Galil AR | Sugar Rush",
            "exterior": "Factory New",
            "market_name": "Galil AR | Sugar Rush",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89.5px; h 45.5px; background-position -349.5px -292.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszceClD4s-im5KGqPv9NLPFqWdQ-sJ0xOiQo93zjgKxqkFvMj_xcI_HIFJtYQnX_1boxO_phsDtvcydwXUyuSA8pSGKJZ_JCy4",
            "phase": "",
            "lower": 24,
            "short_name": "StatTrak™ M4A4 | Desert-Strike",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ M4A4 | Desert-Strike",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -174.5px -53px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5gZKKkPLLMrfFqWZU7Mxkh9bN9J7yjRrhrUFuazjzJteVJlQ6NVHTrFe3wObs15G06picwHFnvid25C3bnhSzn1gSOQz0szG-",
            "phase": "",
            "lower": 24,
            "short_name": "AK-47 | Aquamarine Revenge",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Aquamarine Revenge",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -442px -190.5px; background-size 644px 644px"
        }],
        "26": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zLZAJSvozmxL-NnuXxDL7dk2ZU5tFwhtbM8Ij8nVmLpxIuNDztLYGcJFVoZF3X-gO2x7y808K8vZ2cwHYxsigh4C7emkfm1BxOb7M80eveFwtKPv5lvA",
            "phase": "",
            "lower": 26,
            "short_name": "StatTrak™ P2000 | Fire Elemental",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ P2000 | Fire Elemental",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 53.5px; background-position -397px -473.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszPYzhH4uO6kYGfn_LmDLrawjxu5Mx2gv3--Y3nj1H68kVuYT_zcISde1I3aQmB_1G8wua8hcW1uZvPynMxvSNwtnzcmBTi1QYMMLI7CTKq-A",
            "phase": "",
            "lower": 26,
            "short_name": "AK-47 | First Class",
            "exterior": "Minimal Wear",
            "market_name": "AK-47 | First Class",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -532px -234.5px; background-size 644px 644px"
        }],
        "28": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszKZDFO6ciJhoGCmcj5Z7qAqWZU7Mxkh9bN9J7yjRq18kBsZG6lJ4SUcAdrMlzR8wLsk-bvh5ftvZrLnHE1uCYjs3yMl0O1n1gSOYmlpP_c",
            "phase": "",
            "lower": 28,
            "short_name": "StatTrak™ M4A4 | Bullet Rain",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ M4A4 | Bullet Rain",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -264px -0px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJB496klb-HnvD8J4Tdl3lW7YtyjLuR9omjiVfl-kZtMW2iJ4bBelc2ZVjY-wTtxe3ohsXu6sydzSNnpGB8shVvZCcj",
            "phase": "",
            "lower": 28,
            "short_name": "AWP | Redline",
            "exterior": "Minimal Wear",
            "market_name": "AWP | Redline",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -84.5px -107px; background-size 644px 644px"
        }],
        "30": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV0924lZKIn-7LP7LWnn9u5MRjjeyPo4ms0FLkqEU6MDv7JdfEJ1VvYVuD_1frlLrpjZ-6vsvMySFq73Yr4WGdwUIt-GQI9g",
            "phase": "",
            "lower": 30,
            "short_name": "AK-47 | Neon Revolution",
            "exterior": "Minimal Wear",
            "market_name": "AK-47 | Neon Revolution",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -174.5px -104.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLPbTYhFRd4cJ5ntbN9J7yjRqxr0M6Z2v3IdWUIA8-YlmD_AW6wO7shZbv6ZudnHM1u3V0t3jYmx22n1gSORPnfTIP",
            "phase": "",
            "lower": 30,
            "short_name": "USP-S | Neo-Noir",
            "exterior": "Minimal Wear",
            "market_name": "USP-S | Neo-Noir",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 82.5px; h 42px; background-position -163px -537px; background-size 644px 644px"
        }],
        "32": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTi5H7c-im5KGqPX4PLTVqWZU7Mxkh9bN9J7yjRrt_kRpamHwLIPEdFNqNQ2FrgXvkOu715-4vZWYznRn6CRz43vazETjn1gSOd7ehvGp",
            "phase": "",
            "lower": 32,
            "short_name": "Desert Eagle | Sunset Storm 壱",
            "exterior": "Field-Tested",
            "market_name": "Desert Eagle | Sunset Storm 壱",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 68.5px; h 53.5px; background-position -146px -579px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAZt7ODEeClK6c6JhNnbqPv9NLPFqWdQ-sJ0xLyZpo2s2Ffi_UtpazqlJNXGcAY8ZFuE-Ae6kO690Je9upWcmCYx6XE8pSGKTc8IZr4",
            "phase": "",
            "lower": 32,
            "short_name": "StatTrak™ P90 | Cold Blooded",
            "exterior": "Factory New",
            "market_name": "StatTrak™ P90 | Cold Blooded",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -79.5px -277.5px; background-size 644px 644px"
        }],
        "34": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09SzmIyNnuXxDLbUkmJE5fp9i_vG8ML33Absr0o9YmjyIIbAJFM7YVvUq1HowbjsjZe5tJ_IyCRq63F24X6PgVXp1iJDp8Rl",
            "phase": "",
            "lower": 34,
            "short_name": "StatTrak™ M4A4 | Hellfire",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ M4A4 | Hellfire",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -264.5px -51.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhzw8zGZDZH_8iknZCOqPjmMrXWk1Rd4cJ5ntbN9J7yjRqwrhFvamD2cdWVIFI5YVrRqQe9wr2-hZ616pydwXpq7HIr5y6Pzhyzn1gSORU55uYZ",
            "phase": "",
            "lower": 34,
            "short_name": "M4A4 | Radiation Hazard",
            "exterior": "Minimal Wear",
            "market_name": "M4A4 | Radiation Hazard",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -354px -0px; background-size 644px 644px"
        }],
        "36": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAZt7PHEfjJP0966gYW0m_7zO6_ummpD78A_2rvC992kiQztrhZpMm6lJ9KWe1BsNAvR_1a7xru91JW4upTInHdhvD5iuygSUibTow",
            "phase": "",
            "lower": 36,
            "short_name": "AUG | Midnight Lily",
            "exterior": "Factory New",
            "market_name": "AUG | Midnight Lily",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 53px; background-position -174px -0px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEm1Rd6dd2j6eQ9N2t2wK3-ENsZ23wcIKRdQE2NwyD_FK_kLq9gJDu7p_KyyRr7nNw-z-DyIFJbNUz",
            "phase": "",
            "lower": 36,
            "short_name": "StatTrak™ AK-47 | Redline",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ AK-47 | Redline",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -171px -336.5px; background-size 644px 644px"
        }],
        "38": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79eJg4GYg_L4MrXVqXlU6sB9teXI8oTht1i1uRQ5fWv7II6ce1dsYl2F_wC8yL3p0MLuupmbyyM1uykmtiqInhzmgU0YZuxxxavJ__KWVeE",
            "phase": "",
            "lower": 38,
            "short_name": "StatTrak™ Glock-18 | Wasteland Rebel",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ Glock-18 | Wasteland Rebel",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 62.5px; h 48.5px; background-position -455px -528.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK9cyzhr-JkvbnJ4Tdn2xZ_Pp9i_vG8MKg3VGyqkY5YGn6INfDdQdtMF6B_1fsx7u-1p-678_Jy3A1vXVxsXePgVXp1hRVxWZh",
            "phase": "",
            "lower": 38,
            "short_name": "AWP | Hyper Beast",
            "exterior": "Minimal Wear",
            "market_name": "AWP | Hyper Beast",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -82px -377.5px; background-size 644px 644px"
        }],
        "40": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjhM6863goWPqPPxMrzdk1Rd4cJ5ntbN9J7yjRrs-0c9YjjzJdeXe1RoaVjW_VLsxu3m05Xp7p_LyXBkuHEk7XzVnhy0n1gSOexptizi",
            "phase": "",
            "lower": 40,
            "short_name": "StatTrak™ Desert Eagle | Heirloom",
            "exterior": "Factory New",
            "market_name": "StatTrak™ Desert Eagle | Heirloom",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 68.5px; h 53.5px; background-position -214.5px -583.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW0865jYGHqOTlJrLDk1Rc7cF4n-T--Y3nj1H6r0tvYWzzJo6RdQQ2Zg6E-QS5xeno15C96JnJyiBk7HUj5C3fmxO1gwYMMLJ1i-HMUA",
            "phase": "",
            "lower": 40,
            "short_name": "StatTrak™ M4A4 | Royal Paladin",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ M4A4 | Royal Paladin",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -354.5px -51.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PfacDpN4uOmzdC0leX1JbTum25V4dB8teXA54vwxgTm_hFqNjzzJI_DcA43M1uDqQW8w-rp1JG_tZqfmCM1vyQgt3vazhepwUYb67ogGAs",
            "phase": "",
            "lower": 40,
            "short_name": "P90 | Emerald Dragon",
            "exterior": "Field-Tested",
            "market_name": "P90 | Emerald Dragon",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -76px -419.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zbYTFD_9SJhNLex8j4OrzZglRd6dd2j6eYp9uljAyw-kc_YGCicdCdcQI-Zg2B_1HrxO-5hcPutJSayHVhvCN2-z-DyDH08JDT",
            "phase": "",
            "lower": 40,
            "short_name": "StatTrak™ P250 | Splash",
            "exterior": "Factory New",
            "market_name": "StatTrak™ P250 | Splash",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -452px -470.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09Svq5OCkvDxDLnDl31e18l4jeHVyoD0mlOx5UZtZDv7LdOSelRoNFCCqwW5kr_u1Mfuu8idn3M3uiJz4HmPnUHmgx5SLrs4BeHLjR0",
            "phase": "",
            "lower": 40,
            "short_name": "StatTrak™ USP-S | Overgrowth",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ USP-S | Overgrowth",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 46.5px; background-position -171px -290px; background-size 644px 644px"
        }],
        "45": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhh3szDeDBN4tOJh5WFhf7nNoTdn2xZ_Pp9i_vG8MLz3Ffg-UBvZWrxctPBdQY-ZQmC_le4x7-61MXp7c_MynBguXN2sSvbgVXp1tleQfgM",
            "phase": "",
            "lower": 45,
            "short_name": "M4A4 | Daybreak",
            "exterior": "Minimal Wear",
            "market_name": "M4A4 | Daybreak",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -444px -0px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8bP4jVC9vh4DPzixc9OLcQU2Z1vQ_FfrwbvnhJ6-uJ_PnXAyuCUmtHfenRW00h5MPOVt1_KYHULeWfL4W83H_Q",
            "phase": "",
            "lower": 45,
            "short_name": "USP-S | Kill Confirmed",
            "exterior": "Field-Tested",
            "market_name": "USP-S | Kill Confirmed",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 82.5px; h 42px; background-position -439px -315px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PDJZS5J-dC6h7-bzqfLP7LWnn9u5MRjjeyPpYrz2lfhqEZvMm_6JdOXelJrYVqDrlbsxe66hp-56JjKnXowvCgg42GdwUIaw99WQg",
            "phase": "",
            "lower": 45,
            "short_name": "P90 | Death by Kitty",
            "exterior": "Minimal Wear",
            "market_name": "P90 | Death by Kitty",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -76px -468px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposLOzLhRlxfbGTj5X09q_goW0hPLiNrXul2VW-txOhuDG_ZjKhFWmrBZyZm36LIDAegA_ZlCF-lW4w7rsgcDpu5WbzyBkuCYg7H3VnhayhRkaa_sv26KGUuZy7w",
            "phase": "",
            "lower": 45,
            "short_name": "StatTrak™ Five-SeveN | Angry Mob",
            "exterior": "Factory New",
            "market_name": "StatTrak™ Five-SeveN | Angry Mob",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 62.5px; h 53px; background-position -403.5px -583.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV08-jhIWZlP_1IbzUklRc7cF4n-T--Y3nj1H6-hU-ZWmicYeTcQ82Yl_V-VG5yOa5hZbp6Z2fnHYw7yEn4i2ImEa10gYMMLLca3SSng",
            "phase": "",
            "lower": 45,
            "short_name": "AK-47 | Fuel Injector",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Fuel Injector",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -172px -151.5px; background-size 644px 644px"
        }],
        "50": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhhwszYI2gS09-3hpSOm8j4OrzZglRd6dd2j6fFo9_wiQXl_EpvZzigLNCcIwI-MA6F-lO5l7_r1Je4v5WdmyBivScl-z-DyIG61H2I",
            "phase": "",
            "lower": 50,
            "short_name": "StatTrak™ P250 | Cartel",
            "exterior": "Factory New",
            "market_name": "StatTrak™ P250 | Cartel",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -586.5px -541px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf1OD3YjoXuY-JgImMkuXLPrTFnlRd4cJ5ntbN9J7yjRrl8xc5Yzz2cYaXewE6YAnW_VK9we7sjcO6uJufmCBivykksyyLyh2_n1gSOThlER5Z",
            "phase": "",
            "lower": 50,
            "short_name": "StatTrak™ SG 553 | Tiger Moth",
            "exterior": "Factory New",
            "market_name": "StatTrak™ SG 553 | Tiger Moth",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 48.5px; background-position -443.5px -102px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV0924lZKIn-7LP7LWnn9u5MRjjeyPo4ms0FLkqEU6MDv7JdfEJ1VvYVuD_1frlLrpjZ-6vsvMySFq73Yr4WGdwUIt-GQI9g",
            "phase": "",
            "lower": 50,
            "short_name": "AK-47 | Neon Revolution",
            "exterior": "Factory New",
            "market_name": "AK-47 | Neon Revolution",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -174.5px -104.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh-TLPbTYhFRd4cJ5ntbN9J7yjRqxr0M6Z2v3IdWUIA8-YlmD_AW6wO7shZbv6ZudnHM1u3V0t3jYmx22n1gSORPnfTIP",
            "phase": "",
            "lower": 50,
            "short_name": "USP-S | Neo-Noir",
            "exterior": "Factory New",
            "market_name": "USP-S | Neo-Noir",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 82.5px; h 42px; background-position -163px -537px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszYcDNW5Nmkq4GAw6DLP7LWnn9u5MRjjeyPo46iiwzm-0tvMWyldtSScwA9YAmE_Vi4wL-8hJO4v8nInyFh6yVxsWGdwUIYQq5JMA",
            "phase": "",
            "lower": 50,
            "short_name": "AK-47 | Jaguar",
            "exterior": "Factory New",
            "market_name": "AK-47 | Jaguar",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -260px -338px; background-size 644px 644px"
        }],
        "55": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJP7c-ikZKSqPv9NLPFqWdQ-sJ0xL-Qoomm2wHk_0A6YWzzd9LHe1I4MFyD_Vi2lO7ogMTptZjPySE37iQ8pSGKluvjCzA",
            "phase": "",
            "lower": 55,
            "short_name": "StatTrak™ AWP | Elite Build",
            "exterior": "Factory New",
            "market_name": "StatTrak™ AWP | Elite Build",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -171px -381px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jnI7LFkGJD7fp9g-7J4bP5iUazrl1ka2qhLIGSIw5vZF-D8wXqwO_tjcC-uZjJnSY3vCkmsXbYlkO0gB1McKUx0vNO72r1",
            "phase": "",
            "lower": 55,
            "short_name": "StatTrak™ USP-S | Orion",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ USP-S | Orion",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 46.5px; background-position -349px -338px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV0966m4-PhOf7Ia_ummJW4NFOhujT8om73ASy-0RqNW-hLYTAcg5vMgvT_Vm4wefthpO_v8yYwHVlsicr4C3fzQv330_79eypFA",
            "phase": "",
            "lower": 55,
            "short_name": "AK-47 | Bloodsport",
            "exterior": "Factory New",
            "market_name": "AK-47 | Bloodsport",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -262px -151.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbupIgthwczLZAJF7dC_mL-OlPjLP7LWnn9u5MRjjeyPooqj3FHmr0RrZ2vwdoXGdgQ4YgnX_gLvlLq-hJ6_tJ6ayydnsid24GGdwUKFloqfGg",
            "phase": "",
            "lower": 55,
            "short_name": "StatTrak™ Galil AR | Eco",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ Galil AR | Eco",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89.5px; h 45.5px; background-position -260px -292.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovrG1eVcwg8zJfAJN_8-_kpm0lfvhNoTBxDsBuPpzmOjX-rP5gVO8vywwMiukcZicc1A8Y13W-VToxrvr1J-0us_MyCdjs3JwtH7dmUbmh0lIPLNo0afMVxzAUPnKUIAd",
            "phase": "",
            "lower": 55,
            "short_name": "P2000 | Ocean Foam",
            "exterior": "Minimal Wear",
            "market_name": "P2000 | Ocean Foam",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 53.5px; background-position -283px -583.5px; background-size 644px 644px"
        }],
        "60": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszYcDNW5Nmkq4GAw6DLPr7Vn35c18lwmO7Eu46lilXm-kQ4YmHxdoeddVVqY1vU-lO7lb3vg57uu5rIzCMw7nZ35i3D30vgFhd2p1E",
            "phase": "",
            "lower": 60,
            "short_name": "StatTrak™ AK-47 | Jaguar",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ AK-47 | Jaguar",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -260px -382.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9Q1LO5kNoBhSQl-fROuh28rQR1R2KQFoprOrFBFh3_baeDx94N2kk4XFw_GhZu-JxzMIvJx007vErduh0Azlr0RoZDv2I4WXJlJvZQrQqVG5xPCv28GYd26wPg",
            "phase": "",
            "lower": 60,
            "short_name": "Valeria Phoenix Pin",
            "market_name": "Valeria Phoenix Pin",
            "rarity": "Extraordinary",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 84px; h 84.5px; background-position -0px -0px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOzAot-jiQa3-hBqYzvzLdSVJlQ3NQvR-FfsxL3qh5e7vM6bzSA26Sg8pSGKJUPeNtY",
            "phase": "",
            "lower": 60,
            "short_name": "AWP | Asiimov",
            "exterior": "Field-Tested",
            "market_name": "AWP | Asiimov",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -82px -197.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopamie19f0Ob3Yi5FvISJkJKKkPj6NbLDk1RC68phj9bN_Iv9nGu4qgE7Nnf3LISddw5taAzQ8lm6xOq9gZTpuZ6fyXA3syIltHffnxbkhxEYOLZtm7XAHgXm-xFt",
            "phase": "",
            "lower": 60,
            "short_name": "StatTrak™ SSG 08 | Dragonfire",
            "exterior": "Factory New",
            "market_name": "StatTrak™ SSG 08 | Dragonfire",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 46px; background-position -172px -198.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDKjBqW9Q-NV9j9bM8Ij8nVmLpxIuNDztd4XEelNtZA7S_QDrl-3qjJC8us-Yy3RlsnJ25SmImxG-1UwYbOZohOveFwugxkI3yg",
            "phase": "",
            "lower": 60,
            "short_name": "★ Navaja Knife | Scorched",
            "exterior": "Field-Tested",
            "market_name": "★ Navaja Knife | Scorched",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 66px; h 53px; background-position -578px -435px; background-size 644px 644px"
        }],
        "65": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PTbTjlH7du6kb-KkPDmNqjCmXlu5Mx2gv3--Y3nj1H6_kI6NTv7I9CVcVdrYQzTqVW4xrrrgZe-6p6ay3ZluiYl4nvVyhO21QYMMLLk7OGppA",
            "phase": "",
            "lower": 65,
            "short_name": "Desert Eagle | Code Red",
            "exterior": "Factory New",
            "market_name": "Desert Eagle | Code Red",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 70px; h 53px; background-position -438px -417.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhz3MzfeTRW6dOjgL-HnvD8J4Tdl3lW7Yt3jO2X8Nqk3Fbi-BdvMj_xINeVdlc3N1_X-1HsxOvthJbtu8nJy3tlpGB8sifSTxxd",
            "phase": "",
            "lower": 65,
            "short_name": "P250 | Whiteout",
            "exterior": "Factory New",
            "market_name": "P250 | Whiteout",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -530px -593px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJR_OO7kZODqOP1PYTck29Y_chOhujT8om72VDl-URva2qndoXEdAM7ZA2G-lLrw7rrhsPouZ_OyCBn73Zx7X7flwv330-8vWjOaw",
            "phase": "",
            "lower": 65,
            "short_name": "★ Shadow Daggers | Safari Mesh",
            "exterior": "Field-Tested",
            "market_name": "★ Shadow Daggers | Safari Mesh",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 78.5px; h 54px; background-position -241.5px -475.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLPIqW9V-MRlteXI8oTht1i1uRQ5fWuhLdfBdFU9YVnWr1a2k-vq05DuvpnMmnBm7ydz5njeyRWyiBFPOuRxxavJ9gXhxGw",
            "phase": "",
            "lower": 65,
            "short_name": "★ Navaja Knife | Forest DDPAT",
            "exterior": "Minimal Wear",
            "market_name": "★ Navaja Knife | Forest DDPAT",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 66px; h 53px; background-position -507px -475.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAZt7PDaZDBS4NmJlpKKgfjLP7LWnn9u5MRjjeyPoIqg0VCx-UFrN2v7JNCWIQVsYlGGqwS5lOrm1MW9uJ7Kynow6yVw52GdwULDeIeGVQ",
            "phase": "",
            "lower": 65,
            "short_name": "AWP | Graphite",
            "exterior": "Factory New",
            "market_name": "AWP | Graphite",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -80px -237.5px; background-size 644px 644px"
        }],
        "70": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpouLWzKjhoyszAZDNW6c6JmY-PkuX6DLfYkWNF18lwmO7Eu9iiig3lrhJrZzz7JtCTJwY6YAqDrFPqwe28hJe77sjPyyM2uCUr5XbD30vgvPMstOw",
            "phase": "",
            "lower": 70,
            "short_name": "Nova | Modern Hunter",
            "exterior": "Factory New",
            "market_name": "Nova | Modern Hunter",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 45.5px; background-position -170px -244.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_8i_gIODkvPLNKnUk2Vu79d0k9bM8Ij8nVmLpxIuNDztddWXIQQ2N13VqAK5ku281JO96JrAy3Zr6HEhs33ay0a3iBweOrBrgOveFwveidUuqQ",
            "phase": "",
            "lower": 70,
            "short_name": "★ Driver Gloves | Racing Green",
            "exterior": "Field-Tested",
            "market_name": "★ Driver Gloves | Racing Green",
            "rarity": "Extraordinary",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -0px -326px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszcYzRA-cizq4GAw6DLPr7Vn35c18lwmO7Eu9mhiwLnr0RvMWnxLdedIwY4YFCC_lnrk-28h5K675rIyntj6ygl4HnD30vgkRiUzqw",
            "phase": "",
            "lower": 70,
            "short_name": "StatTrak™ AK-47 | Wasteland Rebel",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ AK-47 | Wasteland Rebel",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -352px -151.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eOwm5KIkvPLPr7Vn35c18lwmO7Eu9X2igG38kNuYDv1LNDBJwVtMFDVrFjrlL_vjJ-76pyYnHtnu3QnsS7D30vgiQV49Zo",
            "phase": "",
            "lower": 70,
            "short_name": "★ Shadow Daggers | Stained",
            "exterior": "Field-Tested",
            "market_name": "★ Shadow Daggers | Stained",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 78.5px; h 54px; background-position -245.5px -529.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh5C0mvLnO4TFl2Vu5Mx2gv3--Y3nj1H6rhA_MW76LY_DdwE6N12F-1G2wbq50MC9uZSayntjuXMmsHmJzRXj1AYMMLIjtwvRMA",
            "phase": "",
            "lower": 70,
            "short_name": "★ Falchion Knife | Safari Mesh",
            "exterior": "Minimal Wear",
            "market_name": "★ Falchion Knife | Safari Mesh",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -0px -384.5px; background-size 644px 644px"
        }],
        "75": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTi5N09K_k4ifqPrxN7LEm1Rd6dd2j6fAodqgjFfn-EpvYzuhINWUdA5rYF-B_FS_wbzn1pDptMjAmCRkunIl-z-DyJdWNjR9",
            "phase": "",
            "lower": 75,
            "short_name": "★ Gut Knife | Night",
            "exterior": "Field-Tested",
            "market_name": "★ Gut Knife | Night",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 65.5px; h 56.5px; background-position -324px -527px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhzw8zbZTxQ096klZaEqPv9NLPFqWdQ-sJ0xO2V9NmjiVax80tpMmiiJIXAIwc5YgnWqwDrk-q5hJbu78iazyNj6SI8pSGKHzKMZwk",
            "phase": "",
            "lower": 75,
            "short_name": "StatTrak™ M4A4 | Zirka",
            "exterior": "Factory New",
            "market_name": "StatTrak™ M4A4 | Zirka",
            "rarity": "Restricted",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -534px -0px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb09q5hoWYg8j2PKnUl2du5Mx2gv3--Y3nj1H6qUFkMm2gctSUcQJtNVCCr1TqkO3m056-6M_JnSRnuicn4njZmB3iiQYMMLJLcEs9NA",
            "phase": "",
            "lower": 75,
            "short_name": "★ Gut Knife | Boreal Forest",
            "exterior": "Minimal Wear",
            "market_name": "★ Gut Knife | Boreal Forest",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 65.5px; h 56.5px; background-position -338px -583.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PDJZS5J-dC6h7-bzqfLPr7Vn35c18lwmO7Eu9iiilXl8kVoN2nyIIORdgRqY1nU_lS3x7y61pe-vszMnXE1uHEhsXrD30vggDzyTcg",
            "phase": "",
            "lower": 75,
            "short_name": "StatTrak™ P90 | Death by Kitty",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ P90 | Death by Kitty",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -76px -516.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlZG0kfjmML7VqWZU7Mxkh9bN9J7yjRq2_xZlYT3yJoaTewE4MgvS_1C8lOboh8O07pmczyNkuSdz4H_UnBe0n1gSORcGh2Vk",
            "phase": "",
            "lower": 75,
            "short_name": "★ Falchion Knife | Stained",
            "exterior": "Field-Tested",
            "market_name": "★ Falchion Knife | Stained",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -0px -446px; background-size 644px 644px"
        }],
        "80": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJnJm0kfjmNqjFqWle-sBwhtbM8Ij8nVmLpxIuNDztINeWcwE9Yl3R8lbskOnt05W76ZnOynUxs3YksymMzUa3hU4fP7BqgOveFwtESutf8g",
            "phase": "",
            "lower": 80,
            "short_name": "★ Falchion Knife | Boreal Forest",
            "exterior": "Field-Tested",
            "market_name": "★ Falchion Knife | Boreal Forest",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -0px -507.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957PHEcDB9_9W7hIyOqPv9NLPFqWdQ-sJ0xOzFpN2h0QDj_0ttNmnwIoDHcFVqNFjZ-AC2lbq-1pLou5_MyXVkv3I8pSGK_P3OCnU",
            "phase": "",
            "lower": 80,
            "short_name": "StatTrak™ AWP | BOOM",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ AWP | BOOM",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -443.5px -150.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJM6dO4q5KCk_LmDLfYkWNF18lwmO7Eu9Wn2A3l8kE-Zmj3d4LAIQ82YFzWqFW5xem70MW078jNyXUysycltnfD30vgEgITXkM",
            "phase": "",
            "lower": 80,
            "short_name": "AK-47 | Neon Rider",
            "exterior": "Factory New",
            "market_name": "AK-47 | Neon Rider",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -262px -198.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhoyszJemkV4N27q4KcqPv9NLPFqWdQ-sJ0xOqUpdj2iVbm_Es9Z2D2IdOccAQ7ZA2F-FG8w-3rhcTpvsnJwHph6yQ8pSGKy_qypRo",
            "phase": "",
            "lower": 80,
            "short_name": "AK-47 | Black Laminate",
            "exterior": "Factory New",
            "market_name": "AK-47 | Black Laminate",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -349px -384.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhjxszYI2gS092lnYmGmOHLP7LWnn9u5MRjjeyPoo_2jgDi_hVrNzr2IdKXJg84YVzW_wW6weq8hJbv7s7BmnZnuHN3sGGdwUIcgRyEsg",
            "phase": "",
            "lower": 80,
            "short_name": "StatTrak™ P250 | Asiimov",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ P250 | Asiimov",
            "rarity": "Classified",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 56.5px; h 52px; background-position -530px -541px; background-size 644px 644px"
        }],
        "85": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrAqWRY5MB1teHE9Jrst1i1uRQ5fTugcNedegE8NwzV_AS5kurm0JO9vMidm3Y3s3Mn7XveyhPmhBpJaLdxxavJ8AoGV38",
            "phase": "",
            "lower": 85,
            "short_name": "★ Navaja Knife | Case Hardened",
            "exterior": "Battle-Scarred",
            "market_name": "★ Navaja Knife | Case Hardened",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 66px; h 53px; background-position -573px -488px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb09O1kYGFqPz6Or3UqWZU7Mxkh9bN9J7yjRrj_EM-MjjwJtDDcVM5ZgmG8wK7l-y8h5Xv7pTKnXRh6SFx5i3VnBPjn1gSOZ_l7rSw",
            "phase": "",
            "lower": 85,
            "short_name": "★ Gut Knife | Bright Water",
            "exterior": "Field-Tested",
            "market_name": "★ Gut Knife | Bright Water",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 72px; h 60.5px; background-position -438px -357px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD_eO5nYyOk8j8NrrHj1Rd6dd2j6eToN-i3VWy_EVtMDrwINeQcAA3ZlrW81C9wOrs1J7vus6awHU2snQh-z-DyIibsxxS",
            "phase": "",
            "lower": 85,
            "short_name": "★ Shadow Daggers | Case Hardened",
            "exterior": "Battle-Scarred",
            "market_name": "★ Shadow Daggers | Case Hardened",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 78.5px; h 54px; background-position -521.5px -318.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR_OO7kZODqOP1PYTck29Y_chOhujT8om72VXkr0E4Z2r3J9CRIQ9tNArWq1S_lOrug8Xv7sjJwXVruyUl5XqOmQv330_24dUqqg",
            "phase": "",
            "lower": 85,
            "short_name": "★ Flip Knife | Safari Mesh",
            "exterior": "Field-Tested",
            "market_name": "★ Flip Knife | Safari Mesh",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 71.5px; h 58px; background-position -510px -372.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJnJm0kfjmNqjFqWle-sBwhtbM8Ij8nVmLpxIuNDztJITEcA5vMgrQ81a8l-vt0ce5vMycy3VlsnV3t3jVyR3mgxgdPOxtgeveFwtjDyM0aA",
            "phase": "",
            "lower": 85,
            "short_name": "★ Stiletto Knife | Boreal Forest",
            "exterior": "Field-Tested",
            "market_name": "★ Stiletto Knife | Boreal Forest",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 78.5px; h 57px; background-position -163px -423px; background-size 644px 644px"
        }],
        "90": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJQJD_9W7m5a0mvLwOq7cqWdQ-sJ0xOvEpIj0jAbkqEE_ZD3xctLGJAE_Zw7U-QTowefth8TpvM_InHZh6XQ8pSGKWYJAoJI",
            "phase": "",
            "lower": 90,
            "short_name": "M4A4 | Asiimov",
            "exterior": "Field-Tested",
            "market_name": "M4A4 | Asiimov",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -84.5px -55.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLIKvum25C4Ppli-f--YXygECLpxIuNDztJ4CVI1c_aFCCrgTqwry61p7ov87JzHMx7iF24yuOmBewgUpPPOxu0-veFwsN6NGreg",
            "phase": "",
            "lower": 90,
            "short_name": "★ Bowie Knife | Safari Mesh",
            "exterior": "Minimal Wear",
            "market_name": "★ Bowie Knife | Safari Mesh",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -0px -266px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjVb08uzlpO0mvLwOq7cqWdQ-sJ0xLqZ99_w3FXt80tpMDyncY7EcARqMlyC_lO8wOrt1p-6uZzByHUxsyA8pSGK0TMvFOE",
            "phase": "",
            "lower": 90,
            "short_name": "★ Gut Knife | Crimson Web",
            "exterior": "Field-Tested",
            "market_name": "★ Gut Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 65.5px; h 56.5px; background-position -389.5px -527px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJh5C0k_bkI7fUqWdY781lteXA54vwxgTm-hFpZWzyLYCWcFNoZg3Y-1bqlObtgpS16pTMwSZkvSIrtnncnECpwUYbJ9lqpSg",
            "phase": "",
            "lower": 90,
            "short_name": "★ Stiletto Knife | Scorched",
            "exterior": "Minimal Wear",
            "market_name": "★ Stiletto Knife | Scorched",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 78.5px; h 57px; background-position -163px -480px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJh5C0mvLnO4TFl2Vu5Mx2gv3--Y3nj1H6-EJoNjj1IYLGJlRvaAvZ-1Hvwuboh5K4vp_NzCZhuCYqtyrZnxHk1wYMMLI47XWL5Q",
            "phase": "",
            "lower": 90,
            "short_name": "★ Huntsman Knife | Safari Mesh",
            "exterior": "Minimal Wear",
            "market_name": "★ Huntsman Knife | Safari Mesh",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 70px; h 45px; background-position -508px -430.5px; background-size 644px 644px"
        }],
        "95": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW08-zl5SEhcj4OrzZglRd6dd2j6eVpon22QXlrhVpZmGlI4LGdg9rYlnW-FDqxevq05-_7szNyHZkuyR3-z-DyIA1jQSm",
            "phase": "",
            "lower": 95,
            "short_name": "StatTrak™ M4A4 | Buzz Kill",
            "exterior": "Factory New",
            "market_name": "StatTrak™ M4A4 | Buzz Kill",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -444.5px -51.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJM6dO4m4mZqPv9NLPFqWdQ-sJ0xOqU8Yig31Ls_kZpN2jwd4KUJAY2YVrUrFO5kOfshJK8u5mbz3tr63Y8pSGKcgFBR7U",
            "phase": "",
            "lower": 95,
            "short_name": "StatTrak™ AWP | Neo-Noir",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ AWP | Neo-Noir",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -533.5px -152.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV09m7hJKOhOTLPr7Vn35c18lwmO7Eu9ql2gDg8kBoYWqlddLHIVI8YFnZqFTrk73mjMW-v87ByHRluiB2533D30vgNUkukuM",
            "phase": "",
            "lower": 95,
            "short_name": "StatTrak™ AK-47 | The Empress",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ AK-47 | The Empress",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -352px -198.5px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJl5W0h-LmI7fUqWNE5tFih-jPyoHwjF2hpiwwMiukcZicIAE4MFjRrgXqxOvqhMDptMmfynRluSl0tnfelkDiiBgdbLZmhvPNVxzAUD7WvYVt",
            "phase": "",
            "lower": 95,
            "short_name": "★ Huntsman Knife | Ultraviolet",
            "exterior": "Field-Tested",
            "market_name": "★ Huntsman Knife | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 80px; h 61px; background-position -0px -205px; background-size 644px 644px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDKLUmmde__pyi-TOyoTwiUKtlB89IT6mOo7AJAJvYg7SrFK3x-7qh8ftvZ_OyXFiviAk4XvezhaxgkoYaO1ugvSACQLJFgwjm6I",
            "phase": "",
            "lower": 95,
            "short_name": "★ Moto Gloves | Transport",
            "exterior": "Battle-Scarred",
            "market_name": "★ Moto Gloves | Transport",
            "rarity": "Extraordinary",
            "sheetRetina": "10@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -0px -84.5px; background-size 644px 644px"
        }],
        "100": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh5C0k_bkI7fUqWdY781lteXA54vwxgTj-RE4Z2j3J9eVIQE4aA7Srla2ye3q0Mfp6ZXBnSdns3Mq4XaPyxapwUYb8i5yVXs",
            "phase": "",
            "lower": 100,
            "short_name": "★ StatTrak™ Falchion Knife | Scorched",
            "exterior": "Minimal Wear",
            "market_name": "★ StatTrak™ Falchion Knife | Scorched",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -206.5px -544px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTi5B7dCzh7-JhfbiPITdn2xZ_Pp9i_vG8MKji1a1_0VqamymI4LEelRrNFHT-ATvyO680Me-uMjIzXQw6HV04CragVXp1igFofN6",
            "phase": "",
            "lower": 100,
            "short_name": "StatTrak™ Desert Eagle | Golden Koi",
            "exterior": "Factory New",
            "market_name": "StatTrak™ Desert Eagle | Golden Koi",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 68.5px; h 53.5px; background-position -868px -234px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrukGRD68B1teTE8YXghWu4qgE7Nnf6LNOSdAI5Z1rT81W2k-vtjMe56cucnHdmvnF35SmIyxW-0hFObbM9m7XAHpVosyuA",
            "phase": "",
            "lower": 100,
            "short_name": "★ Bowie Knife | Stained",
            "exterior": "Field-Tested",
            "market_name": "★ Bowie Knife | Stained",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -728px -423.5px; background-size 1018px 616.5px"
        }],
        "105": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJh4-0mf7zO6_um25V4dB8teXA54vwxgzhqRZlZmD3dYCWdAM9NV3Q-FO7xb3mgp65vMnBzSBm7iVwsXfazBepwUYbETGOf94",
            "phase": "",
            "lower": 105,
            "short_name": "★ Huntsman Knife | Night",
            "exterior": "Field-Tested",
            "market_name": "★ Huntsman Knife | Night",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 70px; h 45px; background-position -180.5px -39.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJU5c6jh7-GkvP9JrbummpD78A_3riRoNmi2w3gr0ZlZGClIdKVcFU8N1vV8gPql-zohp7vvs_MnSdgvz5iuygPIUuNCQ",
            "phase": "",
            "lower": 105,
            "short_name": "StatTrak™ AWP | Containment Breach",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ AWP | Containment Breach",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -84px -280.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3YShR5JLnx4bfx67yYejUwD4CuZUmibCRot2kjQG1qUFpazv2JtSUegFoN16B5BHglmGclzRb",
            "phase": "",
            "lower": 105,
            "short_name": "★ Shadow Daggers",
            "market_name": "★ Shadow Daggers",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 78.5px; h 54px; background-position -0.5px -183.5px; background-size 1018px 616.5px"
        }],
        "110": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJK9eOhkYKYqPrxN7LEm1Rd6dd2j6eSpt7z3gLi_hY5Nm-mJ4GTIQc-ZFrU-VG4wuzp18Duvc_KmCE27iIk-z-DyP8GDskT",
            "phase": "",
            "lower": 110,
            "short_name": "★ Shadow Daggers | Crimson Web",
            "exterior": "Field-Tested",
            "market_name": "★ Shadow Daggers | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 78.5px; h 54px; background-position -171px -187px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW0865jYGHqOTlJrLDk1Rd4cJ5ntbN9J7yjRqy80NuNjrwd9CcIQdtZ1DT_QW2xe_sjZLqusnIyHBgvCch4X_VlxXln1gSOYPgMY0F",
            "phase": "",
            "lower": 110,
            "short_name": "M4A4 | Royal Paladin",
            "exterior": "Factory New",
            "market_name": "M4A4 | Royal Paladin",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -91px -134px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibK8LxVh7PTEfitH_-O0mI-Ek__7JrXVqWNI7NdwtfrP9Ifwm1-9pSw-ITiwZ-nNJ1d4KDeMqxPplPDqjcPtvMmbwHNm73IhtimPl0Ti00xKbeBmgKfPTVieVqIfSvbTDnSBrtktH7dYomR7",
            "phase": "",
            "lower": 110,
            "short_name": "★ Hydra Gloves | Rattler",
            "exterior": "Battle-Scarred",
            "market_name": "★ Hydra Gloves | Rattler",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 49.5px; background-position -529.5px -168.5px; background-size 1016.5px 621.5px"
        }],
        "115": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlZG0kfjmML7VqWZU7Mxkh9bN9J7yjRqwqEduMj_6JdLGJFI-ZVuE8le4yL_phJ-7upnMyHEx7Chws32Mnxfln1gSOSeCb2Yp",
            "phase": "",
            "lower": 115,
            "short_name": "★ Stiletto Knife | Stained",
            "exterior": "Field-Tested",
            "market_name": "★ Stiletto Knife | Stained",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 78.5px; h 57px; background-position -415px -551px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ODbTi5S09Gzh4i0g_b6DLbUkmJE5fp9i_vG8MKn2gzsrktuMmygItSdIQZqYg3QrFjqk7zvgcO4usidyyAx7HZ253fcgVXp1pcDZS8x",
            "phase": "",
            "lower": 115,
            "short_name": "★ Classic Knife | Safari Mesh",
            "exterior": "Field-Tested",
            "market_name": "★ Classic Knife | Safari Mesh",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 80px; h 59px; background-position -935.5px -61.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrukmpc6dZyn_r-rNzKhVGwogYxDDWiZtHAbAU2N16BqAW7xr250cW_vJvMmndjvXEr53vbnRG21UxOb7FrhvWbTVyAR_sefYX2kr4",
            "phase": "",
            "lower": 115,
            "short_name": "★ Bowie Knife | Damascus Steel",
            "exterior": "Field-Tested",
            "market_name": "★ Bowie Knife | Damascus Steel",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -936.5px -0.5px; background-size 1016.5px 621.5px"
        }],
        "120": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFA957OfBdjhQ09C_k4ifqPv1IbzU2G8D7sAo377FptWl21C3_kRram3zJ9PBc1U3ZFHU_QS_ybi-gsO66snXiSw0v9hgqjA",
            "phase": "",
            "lower": 120,
            "short_name": "StatTrak™ AUG | Bengal Tiger",
            "exterior": "Factory New",
            "market_name": "StatTrak™ AUG | Bengal Tiger",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89.5px; h 49.5px; background-position -83.5px -323.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1ObcTjxM08i_k4WZqPjmMrXWk1Rd4cJ5ntbN9J7yjRrg_kpsN2qiLYCTdAdtZA3V_gDowuzngMXuvp7OyXVk7HMk5ivZlxPln1gSOddL0hWc",
            "phase": "",
            "lower": 120,
            "short_name": "★ Gut Knife | Tiger Tooth",
            "exterior": "Factory New",
            "market_name": "★ Gut Knife | Tiger Tooth",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 65.5px; h 56.5px; background-position -727px -497.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3YihQ-tWglYy0lfjjOr6fxjpQ7MFz373Fodyl0AXh-ENkMWinJ4eXcA8-ZFHUq1K_xum70ZO56oOJlyUgjHI5fA",
            "phase": "",
            "lower": 120,
            "short_name": "★ Bowie Knife",
            "market_name": "★ Bowie Knife",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -808.5px -425.5px; background-size 1018px 616.5px"
        }],
        "125": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp3i-vT_I_Kj0axrh0DMDiue-nNJ1d4KDeMqxPplPDshcO-vZvLzyFk63El5i3eyxXjghwebLNoh_yWTwjNVPAcHaeHAyeCrtktHzjL_kKd",
            "phase": "",
            "lower": 125,
            "short_name": "★ Hand Wraps | Arboreal",
            "exterior": "Battle-Scarred",
            "market_name": "★ Hand Wraps | Arboreal",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -540.5px -61.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PfacDpN4uOmzdC0leX1JbTummJW4NFOhujT8om72gTkrhVpYmqicYScI1M5Z13RqwW9l-3u0JC07pibyHpluCcr4HjfyQv33082TFpJRA",
            "phase": "",
            "lower": 125,
            "short_name": "StatTrak™ P90 | Emerald Dragon",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ P90 | Emerald Dragon",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -441.5px -168.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfw-bbeQJD4eOskYKZlsj4OrzZglRd6dd2j6fApdX03ley-EdkMWjzJtCdclM2ZlrS_ALtxu-7hZW5uJmczHJhvSAh-z-DyBAi1xKI",
            "phase": "",
            "lower": 125,
            "short_name": "★ Shadow Daggers | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ Shadow Daggers | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 78.5px; h 54px; background-position -250.5px -187px; background-size 1018px 616.5px"
        }],
        "130": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszcYzRA-cizq4GAw6DLP7LWnn9u5MRjjeyP89z2i1KxrhJkMm3wJtedcFVoZQ6C_Qe-xe_u1JG-uMmbm3ZgviUrtGGdwULRVQuqfg",
            "phase": "",
            "lower": 130,
            "short_name": "AK-47 | Wasteland Rebel",
            "exterior": "Factory New",
            "market_name": "AK-47 | Wasteland Rebel",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -393.5px -41.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbfgJS-c6mmIW0n_L1JaLummpD78A_jrCVrY-kjVLh_UE6YGilLdPBcwZsNVjW-AfvwOjnh5_oupnPyXpksj5iuyg6akF_1w",
            "phase": "",
            "lower": 130,
            "short_name": "★ Bayonet | Ultraviolet",
            "exterior": "Battle-Scarred",
            "market_name": "★ Bayonet | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -0.5px -476.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDKLUmmde__pyi-TOyoHwjF2hpiwwMiukcZjDdA9oMlDY_1Prxr_s0cLq7pjMmnNk6Cgrti2JnhTliBhEOOU6hfCaVxzAUD-tKUqZ",
            "phase": "",
            "lower": 130,
            "short_name": "★ Moto Gloves | Transport",
            "exterior": "Field-Tested",
            "market_name": "★ Moto Gloves | Transport",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -85.5px -0.5px; background-size 1016.5px 621.5px"
        }],
        "135": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibipJAhk2_zdfzl969C5goWYqPX4PLTVnmRE5sFOjfzE5578hFi1lB45NzC2eenJI0RpNEbX-Fa5xuvohJ_t6pzJzScyuyYl5X7alkfmhBEZb7M9gvzITQ3PUfYaAuDcUW_UGkXA",
            "phase": "",
            "lower": 135,
            "short_name": "★ Bloodhound Gloves | Guerrilla",
            "exterior": "Field-Tested",
            "market_name": "★ Bloodhound Gloves | Guerrilla",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 49.5px; background-position -795.5px -336.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlZG0k_b5MqjSg3hu-Nd4meTAyoD8j1yglB89IT6mOtKScQE2NQuG-VbtkOrohpW46ZrBwCQ27iMk7H6PnhTkiB1Lb7Rs1PaACQLJACMUVno",
            "phase": "",
            "lower": 135,
            "short_name": "★ Stiletto Knife | Damascus Steel",
            "exterior": "Minimal Wear",
            "market_name": "★ Stiletto Knife | Damascus Steel",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 78.5px; h 57px; background-position -494.5px -558.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FA957PHEcDB9_9W7hIyOqPv9NLPFqWdQ-sJ0xOzFpN2h0QDj_0ttNmnwIoDHcFVqNFjZ-AC2lbq-1pLou5_MyXVkv3I8pSGK_P3OCnU",
            "phase": "",
            "lower": 135,
            "short_name": "AWP | BOOM",
            "exterior": "Factory New",
            "market_name": "AWP | BOOM",
            "rarity": "Classified",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -454.5px -0.5px; background-size 1018px 616.5px"
        }],
        "140": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0HdUuqkw9aDAhJjLApQs76aLwJmxuDNYwJO7c6xkc7fx_Oha-2BkD8D6cYki-yU9Nqt2gyw_hFrNz3zdoHGIAA5Z17R-Ae6366x0uQkCoPG",
            "phase": "",
            "lower": 140,
            "short_name": "Sticker | Winged Defuser",
            "market_name": "Sticker | Winged Defuser",
            "rarity": "High Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60.5px; h 56px; background-position -857.5px -547.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV092lnYmGmOHLP7LWnn9u5MRjjeyPo9qgjlfnqUtvMGHzIICWew45aV-B_1bqw7u5gse16JTKwXBnvigg5WGdwUL3VYtbUA",
            "phase": "",
            "lower": 140,
            "short_name": "AK-47 | Asiimov",
            "exterior": "Factory New",
            "market_name": "AK-47 | Asiimov",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -484.5px -41.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhoyszJemkV4N27q4yCkP_gDLfQhGxUppQo07-TpYmt2Azh_EpqYGDxIoLGJAE7YgzQ_FS-xuzu15Lu75yfynV9-n512WUCzeM",
            "phase": "",
            "lower": 140,
            "short_name": "AK-47 | Red Laminate",
            "exterior": "Factory New",
            "market_name": "AK-47 | Red Laminate",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -438.5px -218px; background-size 1016.5px 621.5px"
        }],
        "145": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Yh8jwMqvBmm5u4MBwnPD--Y3nj1H6qBZvZGyidtKWIAU4Zl7Q_lTvlem81pW4us_KnCBn73ImsHvazEayggYMMLJyFcWEgQ",
            "phase": "",
            "lower": 145,
            "short_name": "★ M9 Bayonet | Scorched",
            "exterior": "Battle-Scarred",
            "market_name": "★ M9 Bayonet | Scorched",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -496px -304px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1OrYYiR95t21n4uFnvHxDLrcqWZQ-sd9j9bH9Ijwt1i9rBsoDDWiZtHAbAY4NAyG_Vm8le_ujJ677ZWYyXNj73RzsHzVzhS0hhgfb-I70fDKTA2AR_seTTmGAb4",
            "phase": "",
            "lower": 145,
            "short_name": "★ Navaja Knife | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ Navaja Knife | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 66px; h 53px; background-position -934.5px -143px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW09m7hIWZmOXLP7LWnn9u5MRjjeyPo933jQDs_kZlMWmiIdKQdVM-ZVnQ8ge2xui5gMXqu5jMnCFr63Nx7WGdwUKmIT3TEw",
            "phase": "",
            "lower": 145,
            "short_name": "M4A4 | The Emperor",
            "exterior": "Factory New",
            "market_name": "M4A4 | The Emperor",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -182px -135.5px; background-size 1018px 616.5px"
        }],
        "150": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLILTumGJW4NFOhuDG_ZjKhFWmrBZyN2mnItWXJwNvY1HW_FK_l7rvgJW9vZrLz3Rgvikr5XbYnxa30hoebPsv26IdEgFJpA",
            "phase": "",
            "lower": 150,
            "short_name": "★ Bowie Knife | Night",
            "exterior": "Minimal Wear",
            "market_name": "★ Bowie Knife | Night",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -83px -481.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh3szKcDBA49OJnpWFkPvxDLbUkmJE5fp9i_vG8MKsiwXn8xFvYTv1I4LBcgM5MFDZ-lXsyOvvhcW97pSby3s1snQlsS6LgVXp1pCH1igz",
            "phase": "",
            "lower": 150,
            "short_name": "AK-47 | Hydroponic",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Hydroponic",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -528.5px -219px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLILTuhn5D-Ml0teXI8oTht1i1uRQ5fTilJoaXJlc7NVDRqFm4x-nrgpG6upqbzyYxuSMg4nnUzhyx005EbrBxxavJXgWc9oY",
            "phase": "",
            "lower": 150,
            "short_name": "★ Bowie Knife | Ultraviolet",
            "exterior": "Minimal Wear",
            "market_name": "★ Bowie Knife | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -83px -542.5px; background-size 1016.5px 621.5px"
        }],
        "155": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17OORIXBD_9W_mY-dqPv9NLPFqWdQ-sJ0xLnC9Nvz31K3-0BuMGD7d4PGIQM-ZwuDrgS3w7zshsO5tJ7PmHoysig8pSGKpkWB0BI",
            "phase": "",
            "lower": 155,
            "short_name": "StatTrak™ P90 | Asiimov",
            "exterior": "Factory New",
            "market_name": "StatTrak™ P90 | Asiimov",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -415px -501.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-DjsjyPKnUhX9u6spjj-jNyoHwjF2hpiwwMiukcZiUcg8_M12G_VK8xOa71JHtvJvBwCE3uyIj5XyIzBC_g0lJP-xog_HLVxzAUDd65g9U",
            "phase": "",
            "lower": 155,
            "short_name": "★ Talon Knife | Boreal Forest",
            "exterior": "Field-Tested",
            "market_name": "★ Talon Knife | Boreal Forest",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -910px -254px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp1n-rV4Y3ljWu4ohQ0JwavdcTCJxhsYFDZ_VTtlezn1MPpu5vNzCYx7HQq43_dlh2_hRtJZuNpgaCfGA2bGeUXS9qrj1zp",
            "phase": "",
            "lower": 155,
            "short_name": "★ Hand Wraps | Duct Tape",
            "exterior": "Minimal Wear",
            "market_name": "★ Hand Wraps | Duct Tape",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -943.5px -336px; background-size 1016.5px 621.5px"
        }],
        "160": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV086jloKOhcj4OrzZglRd6dd2j6eUrd-jiwfsr0BsYG6iIdeUJA8-Nw6EqVntyLrv15-4v5vOmiNr73Z2-z-DyAddTn8e",
            "phase": "",
            "lower": 160,
            "short_name": "AK-47 | Vulcan",
            "exterior": "Factory New",
            "market_name": "AK-47 | Vulcan",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -83.5px -374px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYX0DbRvCiwMbQVg8kdFEYorOxKglf2_zEfgJO7c6xkc6KxvSmMe_UkG5UvMZw3O-Qp9Tw3AXgrURqZWChJIGWdwdqMg6Erwfv366x0n0TDkh_",
            "phase": "",
            "lower": 160,
            "short_name": "Sticker | Titan",
            "exterior": "Holo",
            "market_name": "Sticker | Titan | Katowice 2015",
            "rarity": "Remarkable",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 61.5px; h 61.5px; background-position -283.5px -544.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_8i_gIODkvPLMbfQlWBu59dwhO7EyoHwjF2hpiwwMiukcZjHcFc-YlqB_we5wei-g567usvKz3Rm6XUq5n-OnhKz1BpKabBugaDMVxzAUC3Cr238",
            "phase": "",
            "lower": 160,
            "short_name": "★ Driver Gloves | Overtake",
            "exterior": "Field-Tested",
            "market_name": "★ Driver Gloves | Overtake",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -329px -303px; background-size 1018px 616.5px"
        }],
        "165": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMqrumWJd7cFOh-zF_Jn4t1i1uRQ5fT3zddOVdlRtZFCE_FS8lLrsg8fv6ZzJmCQw7yZw7XvUmhewgBFNbLFxxavJ0JP3WyI",
            "phase": "",
            "lower": 165,
            "short_name": "★ Bowie Knife | Case Hardened",
            "exterior": "Field-Tested",
            "market_name": "★ Bowie Knife | Case Hardened",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -889px -432px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRRQ0LUSOr_h56LHE59IjtTs6ysKAJf1PzEdQJO7c6xkc7TxqT1ZOyGzj8HsMEj2-zF9I332AHk-kNsY2H2J4LGewM-NwyC_lfv366x0uoHJCwv",
            "phase": "",
            "lower": 165,
            "short_name": "Sticker | device",
            "exterior": "Gold",
            "market_name": "Sticker | device | London 2018",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 64px; h 55px; background-position -937.5px -232px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhnwMzJemkV0966m4-PhOf7Ia_ummJW4NFOhujT8om73ASy-0RqNW-hLYTAcg5vMgvT_Vm4wefthpO_v8yYwHVlsicr4C3fzQv330_79eypFA",
            "phase": "",
            "lower": 165,
            "short_name": "StatTrak™ AK-47 | Bloodsport",
            "exterior": "Factory New",
            "market_name": "StatTrak™ AK-47 | Bloodsport",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -575.5px -41.5px; background-size 1018px 616.5px"
        }],
        "170": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY60g_7zNqnumXlQ5sJ0teXI8oTht1i1uRQ5fTr3IoHGJw5oZlvYrgW3k726jcXou8yfzHZluyB07H7VmUHm1UxPaOdxxavJF8H2Qq8",
            "phase": "",
            "lower": 170,
            "short_name": "★ Falchion Knife | Tiger Tooth",
            "exterior": "Factory New",
            "market_name": "★ Falchion Knife | Tiger Tooth",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -346px -544.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJK9eOhkYKYqPrxN7LEm1Rd6dd2j6eSp4332AG3qhA_YWinJ4OXJFM-Z1HZqAW7wOnog8Dp78jLm3Zr63Vx-z-DyBZ1xJAE",
            "phase": "",
            "lower": 170,
            "short_name": "★ Flip Knife | Crimson Web",
            "exterior": "Field-Tested",
            "market_name": "★ Flip Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 71.5px; h 58px; background-position -588.5px -384.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJlY20jfL2IbrummJW4NFOhujT8om721e2qBZuYmDycITEcAZsaVCF_FC-lebujZbvvsvNmHs27yAi43mOzgv3308URyVBpw",
            "phase": "",
            "lower": 170,
            "short_name": "★ Falchion Knife | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ Falchion Knife | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -423px -544.5px; background-size 1018px 616.5px"
        }],
        "175": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-YmMj6OrzZglRc7cF4n-T--Y3nj1H6_0RoMmv0cYCRJlU5Yw7SqwS4x-_v1pXqvJjMnHA1uCUgsC7UnRC1gwYMMLKQrWJFUg",
            "phase": "",
            "lower": 175,
            "short_name": "★ M9 Bayonet | Night",
            "exterior": "Field-Tested",
            "market_name": "★ M9 Bayonet | Night",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -580.5px -304px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDL_VhmpF18Jjj-zPyo_0hVuLpxo7Oy2ceNfXJVMgNVGE-QXvxunvhZe9u8_Ly3A17icj5inayRbl0kxJaeU6hvSaGlqdU7sJQvfphGk4-w",
            "phase": "",
            "lower": 175,
            "short_name": "★ Specialist Gloves | Forest DDPAT",
            "exterior": "Minimal Wear",
            "market_name": "★ Specialist Gloves | Forest DDPAT",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -80px -240px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-YmMjkJqnBmm5u4MBwnPD--Y3nj1H6-BdsYj2iLIXGJwU7NAyB_FTvl-frgZTuvZrLnHJjsyAg7HiJnhfigwYMMLInwifyEw",
            "phase": "",
            "lower": 175,
            "short_name": "★ Talon Knife | Ultraviolet",
            "exterior": "Battle-Scarred",
            "market_name": "★ Talon Knife | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -84px -221.5px; background-size 1016.5px 621.5px"
        }],
        "180": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLnQhWJS18Jjj-zPyoPniVqzriw0Nji1benJI0RpNEaF81m5w73s15_o753IwXM3siRxtC3bl0e1hR9PbuFm1_eXHFyYBaJMAuDcUR541dMf",
            "phase": "",
            "lower": 180,
            "short_name": "★ Moto Gloves | Turtle",
            "exterior": "Battle-Scarred",
            "market_name": "★ Moto Gloves | Turtle",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -171px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh5C0k_bkI7fUqWZU7Mxkh9bN9J7yjRrm_UdrNW77cdKWdAY7Z1DRrlG9yey80JO7ucudyXY3uXIlt3uMzRe1n1gSOZd2wXJa",
            "phase": "",
            "lower": 180,
            "short_name": "★ Karambit | Scorched",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Scorched",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -273px -135.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0DfQOqohZ-CBxJgIAVasrOiJQ500uD3eTJO4-O6lZKMkrmmMuyJwDJVupZ03LuWpYqh2A3nqRc9Yzz2LYbEcgU7NQuDrwS4wejnm9bi67k5kpUd",
            "phase": "",
            "lower": 180,
            "short_name": "Sticker | Team Dignitas",
            "exterior": "Holo",
            "market_name": "Sticker | Team Dignitas | Cologne 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60.5px; h 61px; background-position -938px -437.5px; background-size 1016.5px 621.5px"
        }],
        "185": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAY5b6oKh9f3_LadjgM7oriwNnZz6f3auuIzzNXuMEmjr-U9N_x3A3j-kdoMWmgLNeWe1I4aUaQpAYdUSVEQg",
            "phase": "",
            "lower": 185,
            "short_name": "Sticker | 3DMAX | Katowice 2014",
            "market_name": "Sticker | 3DMAX | Katowice 2014",
            "rarity": "High Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60px; h 62.5px; background-position -661px -368px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRRQ0LUSOr_h56LHE59IjtE57e1JwJf1PzEdQJO7c6xkc6JlqKtN-iJkG4JsZQj2bDD9Nj03Qzi-xU_a2HyIYCRcFU3M1HYqFPq366x0ts2VaKj",
            "phase": "",
            "lower": 185,
            "short_name": "Sticker | s1mple",
            "exterior": "Gold",
            "market_name": "Sticker | s1mple | London 2018",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 64px; h 55px; background-position -481px -189.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zAaAJV6d6lq4iOluHtDLfQhGxUppIlib7AptvwjFDs-EVtZmygIdKSdgNqaFHWr1TolO7u15Xqu57On3d9-n51YCbwx_k",
            "phase": "",
            "lower": 185,
            "short_name": "★ Bayonet | Crimson Web",
            "exterior": "Battle-Scarred",
            "market_name": "★ Bayonet | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -83px -478.5px; background-size 1018px 616.5px"
        }],
        "190": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYu7WwOAJzw_zaZS594N2kk4XFw_OgYunQlGoD7ccn3LzH997zi1Hs-kFkMGyiJIHHdwBvaF7Vq1K8kvCv28FRtbwHJA",
            "phase": "",
            "lower": 190,
            "short_name": "Sticker | mousesports | Katowice 2014",
            "market_name": "Sticker | mousesports | Katowice 2014",
            "rarity": "High Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 63px; h 58.5px; background-position -591px -264.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhz3MzRdDFO48uJmImMn-PLP7rDkW4f6scjj7-Trdz22VDt-RJpZG2gLYWUcAVqZlGE_1a8xezog8LuupSfymwj5Hd5_c8U3g",
            "phase": "",
            "lower": 190,
            "short_name": "Souvenir MAG-7 | Bulldozer",
            "exterior": "Factory New",
            "market_name": "Souvenir MAG-7 | Bulldozer",
            "rarity": "Restricted",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 88px; h 51px; background-position -794px -60px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4iSqPPwI7rFqWNU6dNoteXA54vwxgfs_0U-ZDuiI9PGd1Q9Nw3R-Fa-yebp1MTuv87IzCdnsycq5n3VmRepwUYbV0tpYIY",
            "phase": "",
            "lower": 190,
            "short_name": "★ Butterfly Knife | Forest DDPAT",
            "exterior": "Battle-Scarred",
            "market_name": "★ Butterfly Knife | Forest DDPAT",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -666.5px -41.5px; background-size 1018px 616.5px"
        }],
        "195": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhzw8zGZDZH_8iknZCOqPjmMrXWk1Rd4cJ5ntbN9J7yjRqwrhFvamD2cdWVIFI5YVrRqQe9wr2-hZ616pydwXpq7HIr5y6Pzhyzn1gSORU55uYZ",
            "phase": "",
            "lower": 195,
            "short_name": "M4A4 | Radiation Hazard",
            "exterior": "Factory New",
            "market_name": "M4A4 | Radiation Hazard",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -168.5px -109.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopujwezhzw8zGZDZH_8iknZCOqPDmNr7fqWdY781lteXA54vwxgTt8hA5YGzxd9LGJA49YVzQqwDqxu_tjJC06J3PzyRhvCAm5naOnRepwUYbH0dTvU8",
            "phase": "",
            "lower": 195,
            "short_name": "P250 | Nuclear Threat",
            "exterior": "Factory New",
            "market_name": "P250 | Nuclear Threat",
            "rarity": "Restricted",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 55px; h 51px; background-position -962.5px -41.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJD4eO7lZKAkvPLJqvummJW4NFOhujT8om73gDm-0dvaz_yLYWVIQE8N1GBrwS_l7zp0ZTpvcjNyHBgsnNzs3zZnwv330_U-q7jVg",
            "phase": "",
            "lower": 195,
            "short_name": "★ StatTrak™ Flip Knife | Freehand",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Flip Knife | Freehand",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 69px; h 61.5px; background-position -500px -544.5px; background-size 1018px 616.5px"
        }],
        "200": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlY20jfL2Ibrum25V4dB8teXA54vwxgax-kFuYjv3LNCddlU6MwuF-QTrwu3o0cK8usiayndm7nJzsH2JyhapwUYbOUIPwyg",
            "phase": "",
            "lower": 200,
            "short_name": "★ Stiletto Knife | Slaughter",
            "exterior": "Field-Tested",
            "market_name": "★ Stiletto Knife | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 78.5px; h 57px; background-position -574px -563.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbfgJM5du-gL-HnvD8J4Tdl3lW7Ysg2-uTpN2iiVLmrkM6YW3zJYeUcQY7aV3XqwO3wrvvhZ-96Z7Nzic3pGB8sk5ZbSKb",
            "phase": "",
            "lower": 200,
            "short_name": "★ Bayonet | Night",
            "exterior": "Minimal Wear",
            "market_name": "★ Bayonet | Night",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -165.5px -479px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLjZmWhe18d-heT-_Yn0nk2LpxIuNDztd4bAdQBtaVjV-FO-kOq6jJG4tJXPm3FksiMj4n-PyxPlhBFEbLc5huveFwvsnpcO-g",
            "phase": "",
            "lower": 200,
            "short_name": "★ Moto Gloves | POW!",
            "exterior": "Battle-Scarred",
            "market_name": "★ Moto Gloves | POW!",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -256.5px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDK_Dn2xD4cFOiOXU8LP9jVWisiwwMiukcZiWclVrMAnX8gTrwu68gMK1tMyfnXBrvCMisHfbnEawhE1Ma7Zo1_WbVxzAUH2luZU-",
            "phase": "",
            "lower": 200,
            "short_name": "★ Moto Gloves | Polygon",
            "exterior": "Battle-Scarred",
            "market_name": "★ Moto Gloves | Polygon",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -342px -0.5px; background-size 1016.5px 621.5px"
        }],
        "210": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KhsjwMrbQhWhE-_oo2tbJ8I3jkWu4qgE7Nnelco-UIw5vYVGGq1DoxLi-gp_qv5-anHJhviEi5yvfmBHiiRoZbbFom7XAHn609d59",
            "phase": "",
            "lower": 210,
            "short_name": "★ M9 Bayonet | Damascus Steel",
            "exterior": "Battle-Scarred",
            "market_name": "★ M9 Bayonet | Damascus Steel",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -665px -304px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrXugmJW7ddOhfvA-4vwt1i9rBsoDDWiZtHAbFc2Mg7SrFW8wOq8jJO86pjAzntr7CEnsX_dnhbhhklPbbBpjPKcHw2AR_se0_ywIGs",
            "phase": "",
            "lower": 210,
            "short_name": "★ Bowie Knife | Tiger Tooth",
            "exterior": "Factory New",
            "market_name": "★ Bowie Knife | Tiger Tooth",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -247px -551px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zLZAJA7cW5moWfqOTgPLXUgWpC4Pp9g-7J4bP5iUazrl1sNWDwJdXEegU_MlzQ_1i8xufnhsK57p-amHFiuCBztHbemRbjhkxPcKUx0pWyZ5s1",
            "phase": "",
            "lower": 210,
            "short_name": "★ Bayonet | Black Laminate",
            "exterior": "Minimal Wear",
            "market_name": "★ Bayonet | Black Laminate",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -248px -422px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrbujG5T-sROhuDG_ZjKhFWmrBZyYTygdtTEe1RqYQ3Z8lTtkO6-0JC66czAzCdk73Ym7Hjemh20iREYb_sv26KxNysneA",
            "phase": "",
            "lower": 210,
            "short_name": "★ Bowie Knife | Slaughter",
            "exterior": "Minimal Wear",
            "market_name": "★ Bowie Knife | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -327.5px -553px; background-size 1016.5px 621.5px"
        }],
        "220": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-Yh8j6OrzZgnhF-sxhj9bN_Iv9nGu4qgE7Nnfzd46dcwM6aF7WqVe-yLq7hp-4vpnBnHtmv3EnsS3VzRfkiUofa7dom7XAHrj0jwtS",
            "phase": "",
            "lower": 220,
            "short_name": "★ Talon Knife | Night Stripe",
            "exterior": "Minimal Wear",
            "market_name": "★ Talon Knife | Night Stripe",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -350.5px -109.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYu6O2Pw5r7P_JYzpHoojjzITexq_wZuKJw28GsJUk37jE9Nqli1HmqEs_aj-lLYSdcQZrNw3Oug_plugATIQ",
            "phase": "",
            "lower": 220,
            "short_name": "Sticker | Clan-Mystik | Katowice 2014",
            "market_name": "Sticker | Clan-Mystik | Katowice 2014",
            "rarity": "High Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 62px; h 60.5px; background-position -727px -388px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ODbTjxT09q5hoOOk8j4OrzZglRd6dd2j6eW89qijlG3_EZvam31IoDAdFJoZwmB8gC9wL--gZ--6JnMzXI16Skm-z-DyPjg83UB",
            "phase": "",
            "lower": 220,
            "short_name": "★ Classic Knife | Stained",
            "exterior": "Factory New",
            "market_name": "★ Classic Knife | Stained",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 80px; h 59px; background-position -814.5px -365.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWNU6dNoteXA54vwxle2-0ZlMG70ItfDcg83YFyB-1S6wu-618O0tMjJmCRl7yZ3sy6MykSpwUYbwc40mvc",
            "phase": "",
            "lower": 220,
            "short_name": "★ M9 Bayonet | Crimson Web",
            "exterior": "Battle-Scarred",
            "market_name": "★ M9 Bayonet | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -749.5px -304.5px; background-size 1018px 616.5px"
        }],
        "230": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJP7c69kYS0gufLP7LWnn9u5MRjjeyP9t703FC2qBJlYGr7d4fEd1BoMAnS_le5wOvpjJDqtZ_Iz3oyvilwtmGdwUIOFR4ADQ",
            "phase": "",
            "lower": 230,
            "short_name": "★ Bayonet | Freehand",
            "exterior": "Minimal Wear",
            "market_name": "★ Bayonet | Freehand",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -328px -422.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-Khsj2P67UklRc7cF4n-T--Y3nj1H6_Uo9Y2r1INfEIVI7ZV_X_lnvxei80Me86cvNySRjvygg4nzdnBa1ggYMMLKi41dRLQ",
            "phase": "",
            "lower": 230,
            "short_name": "★ Talon Knife | Blue Steel",
            "exterior": "Well-Worn",
            "market_name": "★ Talon Knife | Blue Steel",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -174px -257.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlYG0kfbwNoTdn2xZ_Pp9i_vG8MKjjgbl_UA_MDz3ctCUcwA8Y1yG8lG3w-7v1p_ptZ_BnSA17yFx7H2MgVXp1l4ye9bA",
            "phase": "",
            "lower": 230,
            "short_name": "★ Huntsman Knife | Fade",
            "exterior": "Factory New",
            "market_name": "★ Huntsman Knife | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 70px; h 45px; background-position -251.5px -41px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp3i-vT_I_Kj1G7phYoITCgS9TJN1NROQ2BvBjRnb-t0sOiuZubznZkvXZ24i6OmkDliBtMOOY71vbMGFqYBaRBGvGFAHaF5Mx7STLqR01FWrnHiQ",
            "phase": "",
            "lower": 230,
            "short_name": "★ Hand Wraps | Overprint",
            "exterior": "Battle-Scarred",
            "market_name": "★ Hand Wraps | Overprint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -857.5px -499px; background-size 1016.5px 621.5px"
        }],
        "240": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh4-0mf7zO6_um25V4dB8teXA54vwxgbtrRVqNm_xJdKXcQVqMg7W_lDtl7vq1pe4753KynJqsnZ25n_alxapwUYbStGwX0o",
            "phase": "",
            "lower": 240,
            "short_name": "★ Karambit | Night",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Night",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -346.5px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDL3Qkm5u4MBwnPD--Y3nj1H6r0pqNmnwcYXBe1Q8Zg2G8we6xu7sgsC46MmawHRjvSR04X-InRPlgQYMMLIaIlZ_Jg",
            "phase": "",
            "lower": 240,
            "short_name": "★ Specialist Gloves | Fade",
            "exterior": "Battle-Scarred",
            "market_name": "★ Specialist Gloves | Fade",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -163px -242px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibipJAhk2_zdfzl969C5goWYqPX4PLTVnmRE5sFOh-zV9ID5gVeLpxo7Oy2ceNfXJVMgZAnQ8we9xem7jMTpv8nKzHdh6HQhsSvbzkfl0BBNaLBq16OfG1-aDrsJQvcRjAdgdw",
            "phase": "",
            "lower": 240,
            "short_name": "★ Bloodhound Gloves | Bronzed",
            "exterior": "Minimal Wear",
            "market_name": "★ Bloodhound Gloves | Bronzed",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 49.5px; background-position -869.5px -336.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYuLOrIQZz2v3YaDdD4d2lq4yKhfDxfb3Xz25TupAg07CYrd3xiVbs-hVsN2_wJI_DcQ9sZ12F8lTryezr18Wi_MOe9RgIWTE",
            "phase": "",
            "lower": 240,
            "short_name": "Sticker | Ninjas in Pyjamas | Katowice 2014",
            "market_name": "Sticker | Ninjas in Pyjamas | Katowice 2014",
            "rarity": "High Grade",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 60px; h 61.5px; background-position -570px -544.5px; background-size 1018px 616.5px"
        }],
        "250": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GaqPH7IbjUklRd4cJ5ntbN9J7yjRrlrkZuYWz6co7HJgBsYgvS_lPtlLq9h8K87ZXOwCdq7HMj4i3azhe0n1gSOS5_6hS1",
            "phase": "",
            "lower": 250,
            "short_name": "★ Butterfly Knife | Stained",
            "exterior": "Minimal Wear",
            "market_name": "★ Butterfly Knife | Stained",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -740.5px -41.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlY20jfL2IbrummJW4NFOhujT8om72VfnrUM4MG_3IIXDJlA8MgzU8gLtxrvn05HqtM7ImHE26HYg5SvUywv3308EwsMv_w",
            "phase": "",
            "lower": 250,
            "short_name": "★ Stiletto Knife | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ Stiletto Knife | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 78.5px; h 57px; background-position -612.5px -109.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYsLSkPw5j7P_JYzpHoo3gl9eJwPKiMu-BwD8AuMMj2-jH9tWl2Vex-BI6YWymJY-QdFc-Y1zOug_pq-0yPCk",
            "phase": "",
            "lower": 250,
            "short_name": "Sticker | Fnatic | Katowice 2014",
            "market_name": "Sticker | Fnatic | Katowice 2014",
            "rarity": "High Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 62px; h 60.5px; background-position -790px -388px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0mPTxMrXunWVY7sBOh-zF_Jn4t1i1uRQ5fTryLIbBegRqaFzWqwLtl-7t1pTvv5_Jmyc3uycqtH3enh20hhwaZrBxxavJey8mJTk",
            "phase": "",
            "lower": 250,
            "short_name": "★ Karambit | Bright Water",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Bright Water",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -546px -189.5px; background-size 1018px 616.5px"
        }],
        "260": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0kfjmML7VqWZU7Mxkh9bN9J7yjRqy-EY5NTrwJYSTe1I8ZwzU_QS-yOq8h8K17pzKzSA3u3Ijt33Ulxaxn1gSOW7yFo2m",
            "phase": "",
            "lower": 260,
            "short_name": "★ Karambit | Stained",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Stained",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -420px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_NC3nYS0h-LmI7fUqWNU6dNoteXA54vwxgLi8xZrZmn7IoCUJFU4MwnS-VS-wum9h5-47Z-YzXdr7iQi43_azUapwUYbjFoDcBM",
            "phase": "",
            "lower": 260,
            "short_name": "★ Driver Gloves | Imperial Plaid",
            "exterior": "Battle-Scarred",
            "market_name": "★ Driver Gloves | Imperial Plaid",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -258px -316.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJlY20mvbmMbfUqW1Q7MBOhuDG_ZjKhFWmrBZyYDyld4GTdQA6MlmBq1e8xeno08PpuM_NnSRi6yMq5S3cnhDhhBlMbfsv26Jdi7qC2w",
            "phase": "",
            "lower": 260,
            "short_name": "★ Huntsman Knife | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ Huntsman Knife | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 80px; h 61px; background-position -0.5px -559.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYobWpLThz2ObEfQJH_9CJko-Cm8j4MqnWkyVTu5An2ryQpdyijgzmqBBuYTvxIYbAc1RrN1CD_FPrwezpgpO56ZjM1zI97VCLs1zd",
            "phase": "",
            "lower": 260,
            "short_name": "Sticker | ESL Skull",
            "exterior": "Foil",
            "market_name": "Sticker | ESL Skull | Katowice 2014",
            "rarity": "Exotic",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 63.5px; h 64px; background-position -655.5px -303px; background-size 1016.5px 621.5px"
        }],
        "270": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-YmMj6OrzZglRd4cJ5ntbN9J7yjRrhqhA-MTygIILEcwRvYgzVr1S9yefv1pHtvsjMwSMy7CghtCrflxK2n1gSORdzljmC",
            "phase": "",
            "lower": 270,
            "short_name": "★ M9 Bayonet | Night",
            "exterior": "Minimal Wear",
            "market_name": "★ M9 Bayonet | Night",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -598.5px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5OEqPn9NLPFqWZU7Mxkh9bN9J7yjRqw-0doYjv7JteQcA42aAmBrFjsw7jugJe5uJyYmHAwvXF05HzfnEOyn1gSOczLixFH",
            "phase": "",
            "lower": 270,
            "short_name": "★ Butterfly Knife | Night",
            "exterior": "Field-Tested",
            "market_name": "★ Butterfly Knife | Night",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -814.5px -41.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV086jloKOhcj4OrzZglRd6dd2j6eUrd-jiwfsr0BsYG6iIdeUJA8-Nw6EqVntyLrv15-4v5vOmiNr73Z2-z-DyAddTn8e",
            "phase": "",
            "lower": 270,
            "short_name": "StatTrak™ AK-47 | Vulcan",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ AK-47 | Vulcan",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -83.5px -374px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDKLUmmde__pyi-TOyoD8j1yglB89IT6mOoHAJgQ4YAqF-FHoxezugJW9tZXLzHQ163El436PzRXliRpMPOc60_yACQLJGoOGu0s",
            "phase": "",
            "lower": 270,
            "short_name": "★ Moto Gloves | Transport",
            "exterior": "Minimal Wear",
            "market_name": "★ Moto Gloves | Transport",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -427.5px -0.5px; background-size 1016.5px 621.5px"
        }],
        "280": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWZU7Mxkh9bN9J7yjRqwrxVvMGDyI9KSdgQ-Z1HV_VfsyLu-hZe1tMzJnHFgv3IitHmLzhO0n1gSOc4nk3bB",
            "phase": "",
            "lower": 280,
            "short_name": "★ M9 Bayonet | Crimson Web",
            "exterior": "Field-Tested",
            "market_name": "★ M9 Bayonet | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -683px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-KhsjwMrbQhWhE-_pmg-3O4rP5gVO8vywwMiukcZiQdVdrZwuC-1W_kOvmjMfvv5ubzXUxs3Qmsynfn0O-1xBEbrRqh_XIVxzAUJkx9GvL",
            "phase": "",
            "lower": 280,
            "short_name": "★ Talon Knife | Damascus Steel",
            "exterior": "Minimal Wear",
            "market_name": "★ Talon Knife | Damascus Steel",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -258px -257.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhh3szKcDBA49OJnpWFkPvxDLfYkWNF18lwmO7Eu9Wti1Dk-UA5aj3xJoaSI1I5Z12C_FG-k-znhJW5vs6bmndjuiki4H7D30vgYDi_Mc0",
            "phase": "",
            "lower": 280,
            "short_name": "AK-47 | Hydroponic",
            "exterior": "Minimal Wear",
            "market_name": "AK-47 | Hydroponic",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -164px -435px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3ZjRG48u7lYuOhbn1Y-OFxGpVuJFyjuiYp9Wn3AznqUtkam-nJdLGJldoNwmD8wK8lOu6m9bi6xwzqz5_",
            "phase": "",
            "lower": 280,
            "short_name": "★ Talon Knife",
            "market_name": "★ Talon Knife",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -174px -316.5px; background-size 1016.5px 621.5px"
        }],
        "290": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597dGJjoWJhfbLP7LWnn9u5MRjjeyPrYnw3QKy_xY-Nmv2JoHBJlQ7ZlDZrFXrxry6hpW5vpXOyiRmsyd0tGGdwULd6R2JzQ",
            "phase": "",
            "lower": 290,
            "short_name": "★ Ursus Knife | Slaughter",
            "exterior": "Minimal Wear",
            "market_name": "★ Ursus Knife | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 74.5px; h 56px; background-position -846px -120px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3fGR97t2vm46Og7mlMu6ExzsI7ZVy0rGWrN7w3VDh_RY9Y22nd4fDdAE4NFzUrFjqlL3tm9bi6x2aUKuH",
            "phase": "",
            "lower": 290,
            "short_name": "★ M9 Bayonet",
            "market_name": "★ M9 Bayonet",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -897px -313px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulReQ0HdUuqkw9aDAhJ2KQVUvYWuIgln7P_JYzpHooTnkYWIlKL1arrVwG4I65xw3OuQ99n3jFXh_RdrNWD2I4DGI1I6aVrOug_p3rgcK2Y",
            "phase": "",
            "lower": 290,
            "short_name": "Sticker | King on the Field",
            "market_name": "Sticker | King on the Field",
            "rarity": "High Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 51.5px; h 59px; background-position -883px -60px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwObaZzRU7dCJlo-cnvLLMrrukGpV7fp9g-7J4bP5iUazrl06N2H2cYXBe1BsNVDX_wLvw-vqhMS_u5jBn3dgvSR35nyJnhOw10oacKUx0rse6B8s",
            "phase": "",
            "lower": 290,
            "short_name": "★ Bowie Knife | Fade",
            "exterior": "Factory New",
            "market_name": "★ Bowie Knife | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 60px; background-position -583.5px -502.5px; background-size 1016.5px 621.5px"
        }],
        "300": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlY20k_jkI7fUhFRB4MRij7j--YXygECLpxIuNDztIY-UcAZqZQ6F8wK_kOy7h8W-75XKzXRluykq53rYyxW200kfaOFshOveFws_sD0ryA/",
            "phase": "Phase 1",
            "lower": 300,
            "short_name": "★ Stiletto Knife | Doppler",
            "exterior": "Factory New",
            "market_name": "★ Stiletto Knife | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 78.5px; h 57px; background-position -0.5px -238.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Khsj2P67UklRd4cJ5ntbN9J7yjRq3rUI5Mjz2dobBdgRtYQvS_FTrlOno1MLo78nIy3Jk73Jz4i7VzhHln1gSOQ4y0ztq",
            "phase": "",
            "lower": 300,
            "short_name": "★ M9 Bayonet | Blue Steel",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Blue Steel",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -767.5px -0.5px; background-size 1016.5px 621.5px"
        }],
        "320": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDKzYmH9U-s10ktbN_Iv9nGu4qgE7NnfxdoPBd1NtYQrV-Vm2k7u60567uM_AynAysnYrtn_YnBaxgUkZabE8m7XAHup0sXXa",
            "phase": "",
            "lower": 320,
            "short_name": "★ Specialist Gloves | Mogul",
            "exterior": "Minimal Wear",
            "market_name": "★ Specialist Gloves | Mogul",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -246px -242px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibipJAhk2_zdfzl969C5goWYqPX4PLTVnmRE5sFOmefA_onmg126lBEuMiqwS9rMJV56DgSBuAbr3-m6gZG06Muanydr6SgrtinZyRGxhBkZO-BrgqfMSA6eUvFJSqCHUHrO8MckMX7MiPk",
            "phase": "",
            "lower": 320,
            "short_name": "★ Bloodhound Gloves | Snakebite",
            "exterior": "Minimal Wear",
            "market_name": "★ Bloodhound Gloves | Snakebite",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 49.5px; background-position -853px -387px; background-size 1016.5px 621.5px"
        }],
        "340": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoor-mcjhzw8zGZDZH_8iknZCOqPDmNr7fqX9U65xOhuDG_ZjKhFWmrBZyY2n1I4WWcQA8ZAqG-1Dol7_mhsK7vJidnSdmvyNw4S3fzUOx1xBOPfsv26K75-WM4g",
            "phase": "",
            "lower": 340,
            "short_name": "Tec-9 | Nuclear Threat",
            "exterior": "Factory New",
            "market_name": "Tec-9 | Nuclear Threat",
            "rarity": "Restricted",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 58px; h 57.5px; background-position -653.5px -563.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6ryFBRv7OTAeClH48miq4yCkP_gDLfQhGxUppR32L6Tot_22QztqEJlMW3xIYCSIFJqZVyGrAK9lOu90JG86czKmHZ9-n51-XhiT_o",
            "phase": "",
            "lower": 340,
            "short_name": "MP7 | Whiteout",
            "exterior": "Factory New",
            "market_name": "MP7 | Whiteout",
            "rarity": "Mil-Spec Grade",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 65px; h 66.5px; background-position -655px -235.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDKzUlHhu-sB1teTE8YXghWu4qgE7NnelJdSRJgQ_M1nZ-QTrx7vv18PpvcjLwSQyv3V35X2IyxDjiExOOuJmm7XAHqjzIu8S",
            "phase": "",
            "lower": 340,
            "short_name": "★ Specialist Gloves | Crimson Web",
            "exterior": "Field-Tested",
            "market_name": "★ Specialist Gloves | Crimson Web",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -329px -244.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJG48ymmIWZqOf8MqjUxVRd4cJ5nqeXpdzx0FHgqhFqZmn6IY_DI1U8aFuB_FLql-nt1pe7tMybzHFmvCUj-z-DyAETkzcY/",
            "phase": "Phase 3",
            "lower": 340,
            "short_name": "★ Bayonet | Doppler",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -761px -486.5px; background-size 1018px 616.5px"
        }],
        "360": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopbmkOVUw7PvRTjVX4sizhr-Jm_buNoTBn2Va18l4jeHVyoD0mlOx5RFrMj_2cdPBdFRrYQvXrli7lL3vhMO-6cnAyHRrviF2tH_dmkbk10tSLrs4Rs_HOBY",
            "phase": "",
            "lower": 360,
            "short_name": "SCAR-20 | Splash Jam",
            "exterior": "Factory New",
            "market_name": "SCAR-20 | Splash Jam",
            "rarity": "Classified",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 53.5px; background-position -80px -185.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh4-0h-LmI7fUqW1Q5MZ5g-bPyoD8j1yglB89IT6mOoaUcg49YQ3Q_1G7xui608PutJ2byidjviZ27CuOzEOx1E1Ob7ZshKeACQLJzgnS6HQ",
            "phase": "",
            "lower": 360,
            "short_name": "★ Falchion Knife | Ultraviolet",
            "exterior": "Factory New",
            "market_name": "★ Falchion Knife | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -631px -545.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJR4-O4nYeDg8j4OrzZglRd6dd2j6fC8dqk2wDi-xE6Nz_7II6cewRrY12G-gC6xL--hsfuvZqbzyZnvHIk-z-DyFVtBt8T",
            "phase": "",
            "lower": 360,
            "short_name": "★ Flip Knife | Night",
            "exterior": "Factory New",
            "market_name": "★ Flip Knife | Night",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 71.5px; h 58px; background-position -921.5px -121.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJl5W0h-LmI7fUqWNE5tFih-jPyoD8j1yglB89IT6mOoXBewU7ZAvQq1Htwb3ugpbovZ3BzHQ26HMg4XbfyUDhhxlEbec516aACQLJnTl2wPo",
            "phase": "",
            "lower": 360,
            "short_name": "★ Huntsman Knife | Ultraviolet",
            "exterior": "Factory New",
            "market_name": "★ Huntsman Knife | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 80px; h 61px; background-position -83px -419.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_tmyq42Ok_7hPoTdl3lW7Ysn27jA8dyh2FLk-kQ-a276doTGIQY8aVvZ81Lql-u81pLqvcjMmCY1pGB8soKYr6Bu",
            "phase": "",
            "lower": 360,
            "short_name": "★ Driver Gloves | Crimson Weave",
            "exterior": "Well-Worn",
            "market_name": "★ Driver Gloves | Crimson Weave",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -341px -318.5px; background-size 1016.5px 621.5px"
        }],
        "380": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC597dGJkI-bh_vxIYTBnmpC7ZZOhuDG_ZjKhFWmrBZyazvwddCdIQE_YVrV8gC7l-zphpK0tZXBzSBg6XVx4y2ImEO_1R9LPPsv26JsS3ljjQ/",
            "phase": "Phase 3",
            "lower": 380,
            "short_name": "★ Ursus Knife | Doppler",
            "exterior": "Factory New",
            "market_name": "★ Ursus Knife | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 74.5px; h 56px; background-position -831px -177px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJY6d6klb-HnvD8J4Tdl3lW7Ysj2LqVpdqh2wLm-UNoNmH0cdeQIVM9N1HZ_QXtx-fu0Z64uMnAyHRrpGB8stNTCQHv",
            "phase": "",
            "lower": 380,
            "short_name": "★ Bayonet | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -0.5px -375px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5ObqPP1I6vdk1Rd4cJ5ntbN9J7yjRri-kJsMmDyco6Ve1U3aF7W81fokObo0Z-87pqcmHpr7yAh4niJn0Hhn1gSOTpeEaNS",
            "phase": "",
            "lower": 380,
            "short_name": "★ Butterfly Knife | Scorched",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Scorched",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -888.5px -41.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1f_BYQJF_-OwmImbqPbhJ7TFhGRf4cZOhuDG_ZjKhFWmrBZya2HxcIaUcFNoYA3X_1ntyLvsh5Xo6Jidz3BjuHMm7CmPyh2-hU1Ma_sv26IF0j6FwQ",
            "phase": "",
            "lower": 380,
            "short_name": "★ Flip Knife | Autotronic",
            "exterior": "Factory New",
            "market_name": "★ Flip Knife | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 69px; h 61.5px; background-position -708px -548px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmm4mYmPnLNanekVRT5NB0tf7J_Jjwt1yxqgUlDDWiZtHAbFRqMA6B-FW3lO_vg8C775qfnXNn7igj4XeLzhPmgh5JOuNtgKHPTQqAR_sep9L1YfU",
            "phase": "",
            "lower": 380,
            "short_name": "★ Sport Gloves | Amphibious",
            "exterior": "Battle-Scarred",
            "market_name": "★ Sport Gloves | Amphibious",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -425px -263.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_NC3nYS0h-LmI7fUqWZU7Mxkh9bN9J7yjRrhqURoajimcoGWIw5qZF-G8gfqx73qh5Dt7Z-bzSNguyN04yvayhC3n1gSOQLRpPXA",
            "phase": "",
            "lower": 380,
            "short_name": "★ Driver Gloves | Imperial Plaid",
            "exterior": "Field-Tested",
            "market_name": "★ Driver Gloves | Imperial Plaid",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -424px -323px; background-size 1016.5px 621.5px"
        }],
        "400": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j_v--YXygECLpxIuNDztII-We1I4aAqE_Fi_lerthMXttc7OnXRmvyhw4Xndlx3kiUkfa-ZuguveFwseJK64Qw",
            "phase": "",
            "lower": 400,
            "short_name": "StatTrak™ M4A1-S | Chantico's Fire",
            "exterior": "Factory New",
            "market_name": "StatTrak™ M4A1-S | Chantico's Fire",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -273.5px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh4-0h-LmI7fUqWdY781lteXA54vwxlfn-xdqMG_ycY_AIQRraVjYqFm6xLrqjJLtupzMnHZluCN24HmIyhCpwUYbxnUlics",
            "phase": "",
            "lower": 400,
            "short_name": "★ Karambit | Ultraviolet",
            "exterior": "Minimal Wear",
            "market_name": "★ Karambit | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -493.5px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PzadQJD_eOwm5KIkvPLP7LWnn9u5MRjjeyPooil3gbm_hFoZWDzJ4fBdw48YAqC_1a6x-_rhJDq6ZucmyY3uiV37GGdwUKfLPOs_w",
            "phase": "",
            "lower": 400,
            "short_name": "★ Paracord Knife | Stained",
            "exterior": "Factory New",
            "market_name": "★ Paracord Knife | Stained",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79px; h 58px; background-position -586px -443.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp3i-vT_I_Kj1G7phYoITCgS9TJN1NRPA2EoxTjrrK-x8HposucwHBkviJx5y6Ll0S-iBpLaeBrhPfKGA7LVqIbH6KFDyKFsZt2Tiu0WUTgH3c1zyg",
            "phase": "",
            "lower": 400,
            "short_name": "★ Hand Wraps | Overprint",
            "exterior": "Field-Tested",
            "market_name": "★ Hand Wraps | Overprint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -0.5px -84.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zLZAJA7cW5moWfqPv7Ib7um25V4dB8teXA54vwxlXs_BVpZz-ldYbDcwJsaAzUqATswu3v08Xo7syYyHphvCcm43iOnUCpwUYbyMGRBAc",
            "phase": "",
            "lower": 400,
            "short_name": "★ Bayonet | Lore",
            "exterior": "Field-Tested",
            "market_name": "★ Bayonet | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -408px -423px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJK7dK4jYG0m_7zO6_ummpD78A_juqZoomljgW1rhY9MTz1d4fGegI-N1qB8wS5xOi61JS6vcifwCZruz5iuyh5fuIHYA",
            "phase": "",
            "lower": 400,
            "short_name": "StatTrak™ AWP | Oni Taiji",
            "exterior": "Factory New",
            "market_name": "StatTrak™ AWP | Oni Taiji",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -545.5px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbuhX9e5sBmi_rJyoHwjF2hpiwwMiukcZidcwY6YA3WrFjow72-gZG0vc-dzCBn7CZ0t33YzBPmhEwaOrBrgqSdVxzAUOk9oStu",
            "phase": "",
            "lower": 400,
            "short_name": "★ StatTrak™ Karambit | Black Laminate",
            "exterior": "Field-Tested",
            "market_name": "★ StatTrak™ Karambit | Black Laminate",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -626.5px -189.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjuNrnDl1Rd4cJ5ntbN9J7yjRrh-BVlZW3ydoTHdABsZ13Y_Qe5xue6gMC-vp-amntr6yQq4XfUzhTin1gSOZHog2Kf",
            "phase": "",
            "lower": 400,
            "short_name": "★ M9 Bayonet | Slaughter",
            "exterior": "Minimal Wear",
            "market_name": "★ M9 Bayonet | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -852px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GaqPP1PrrClX5C15whteXI8oTht1i1uRQ5fT_1cdPGIQM4NFGE_Fi5xey7jZbt6J2bn3dqvCkntHfUzEe_1RFKZuFxxavJ4x2f9Kw",
            "phase": "",
            "lower": 400,
            "short_name": "★ Butterfly Knife | Damascus Steel",
            "exterior": "Minimal Wear",
            "market_name": "★ Butterfly Knife | Damascus Steel",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -692px -110.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0gPL2IITck29Y_chOhujT8om7iwLn_Ec4NWrwdoDDIFNtZlHT-QW6xOzmgZ_t6pTNznUyvnQg7Crclwv330__CL9_dg",
            "phase": "",
            "lower": 400,
            "short_name": "★ Karambit | Crimson Web",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -567px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_tmyq42Ok_7hPoTdl3lW7Ysn27jA8dyh2FLk-kQ-a276doTGIQY8aVvZ81Lql-u81pLqvcjMmCY1pGB8soKYr6Bu",
            "phase": "",
            "lower": 400,
            "short_name": "★ Driver Gloves | Crimson Weave",
            "exterior": "Field-Tested",
            "market_name": "★ Driver Gloves | Crimson Weave",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -341px -318.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLnQhWJS18d9i-rKyoD8j1yglB89IT6mOo_EegI3MwvR_lS6wertgJ7vtJTPyHZnsykq5SvVlhbl0BEZOLNtgqCACQLJu5kk5I0",
            "phase": "",
            "lower": 400,
            "short_name": "★ Moto Gloves | Eclipse",
            "exterior": "Minimal Wear",
            "market_name": "★ Moto Gloves | Eclipse",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -513px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbuhX9e5sBmi_rJyoHwjF2hpiwwMiukcZidcwY6YA3WrFjow72-gZG0vc-dzCBn7CZ0t33YzBPmhEwaOrBrgqSdVxzAUOk9oStu",
            "phase": "",
            "lower": 400,
            "short_name": "★ Karambit | Black Laminate",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Black Laminate",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -626.5px -189.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0k_b5MqjSg3hu5Mx2gv3--Y3nj1H6_0Q9ZG-lI46TIQc-NQuE8gS-kr-918C76J2fnyM26SkhsC7UlhO30AYMMLK-PHGgTA",
            "phase": "",
            "lower": 400,
            "short_name": "★ Karambit | Damascus Steel",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Damascus Steel",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -640.5px -138px; background-size 1018px 616.5px"
        }],
        "420": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJG48ymmIWZqOf8MqjUx1Rd4cJ5nqeT8Ymi3wzt-UNrZ2mmItWRcgRvM16BqVK4l7jq0J-4vZ3IwHQ16HUq-z-DyALmsiWI/",
            "phase": "Phase 1",
            "lower": 420,
            "short_name": "★ StatTrak™ Bayonet | Doppler",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Bayonet | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -0.5px -436.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmm4mYmPnLNanekVRD7cFOjfvE8ILKhF2zowcDPzixc9OLcwQ2aFuC81O8l7zn05To75ydyCc26XYi5C2LmRe_hxxOZuJr0PydTkLeWfIZs4EquA",
            "phase": "",
            "lower": 420,
            "short_name": "★ Sport Gloves | Bronze Morph",
            "exterior": "Minimal Wear",
            "market_name": "★ Sport Gloves | Bronze Morph",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -508px -264.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5D19V5i_rEprP5gVO8v11lZj-gIYbDclRqMA7Zq1S7lOm-0Za6753KmHoxvnQh5y7ZyhWxiRwecKUx0iL1oy6z/",
            "phase": "Phase 3",
            "lower": 420,
            "short_name": "★ M9 Bayonet | Doppler",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -0.5px -357.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDL7ck3lQ5MFOnezDyoHwjF2hpiwwMiukcZjGJg85NQnR81LolObogsLo6MvJzHBlsyl04nvUmke-hxEfPeVojPXKVxzAUDsQyVOl",
            "phase": "",
            "lower": 420,
            "short_name": "★ Specialist Gloves | Emerald Web",
            "exterior": "Field-Tested",
            "market_name": "★ Specialist Gloves | Emerald Web",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -412px -245.5px; background-size 1018px 616.5px"
        }],
        "440": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-MhMj5aoTTl3Ju6dBlhf3T-oL8i2u5rhc1JjSceNfXJVMgNF7T_AW8xOm7gMLo7pvJyXtkv3Qi53vdmRW-gk4eZ-M6hPTLTw_PALsJQvckGrdvcQ",
            "phase": "",
            "lower": 440,
            "short_name": "★ M9 Bayonet | Autotronic",
            "exterior": "Field-Tested",
            "market_name": "★ M9 Bayonet | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82.5px; h 61px; background-position -0.5px -65.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou6r8FBRv7OrNfTFN--O6nYeDg8j4MqnWkyVV7sQk2uvF89ynile3qUpsY2unJI_Geg8_NVzRqAC4xLzu1sO-6JSa1zI97a3Fmcif",
            "phase": "",
            "lower": 440,
            "short_name": "MP9 | Bulldozer",
            "exterior": "Factory New",
            "market_name": "MP9 | Bulldozer",
            "rarity": "Restricted",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 60.5px; background-position -0.5px -313.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJcAJE7dizq4yCkP_gDLfQhGxUppBwib3Hod6n2ADnqUdkMW30cYKRdwVtMlrV-gK5yLi71JXpu5XBzHd9-n51Ga5qFJk",
            "phase": "",
            "lower": 440,
            "short_name": "★ Bayonet | Fade",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -843.5px -493px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5OEqPn9NLPFqWdY781lteXA54vwxg2y-UZoZzrwIY6TdVc7ZViG-wW-kOu6gZK66JzJnXFm6CRwt3zfnxepwUYb2Pp00lU",
            "phase": "",
            "lower": 440,
            "short_name": "★ Butterfly Knife | Night",
            "exterior": "Minimal Wear",
            "market_name": "★ Butterfly Knife | Night",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -163.5px -569px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJh4-0mf7zO6_ummJW4NFOhujT8om73QfhrkpvamHxLIaQcQA-NAmDqVS3x-e6hMS-tMucz3Y1uyUg5HmLygv330_-hpfX1A",
            "phase": "",
            "lower": 440,
            "short_name": "★ Falchion Knife | Night",
            "exterior": "Factory New",
            "market_name": "★ Falchion Knife | Night",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -769px -112px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0mP74Nr_ummJW4NFOhujT8om73Qay8kFuaj3xLYCVJAM7ZF-B8li9kOfm1sW6u5SfyHNru3Im7SvUlwv330-EAAozoQ",
            "phase": "",
            "lower": 440,
            "short_name": "★ Karambit | Case Hardened",
            "exterior": "Minimal Wear",
            "market_name": "★ Karambit | Case Hardened",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -714px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmcjgOrzUhFRe-sR_jez--YXygECLpxIuNDztII_Bd1doM16E_Qe_xr29hcS_tJmbnHNnuyZz7HrenB2zgBlLarQ8gOveFwvcAFHlzA",
            "phase": "",
            "lower": 440,
            "short_name": "★ M9 Bayonet | Tiger Tooth",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Tiger Tooth",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -85px -359.5px; background-size 1018px 616.5px"
        }],
        "460": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJF7dG7lb-PmOfkP77DqXtZ6dZ029bN_Iv9nBrk-RE-NTygJYOdcwdsMlnW_Vi6xufuhZHt6p2an3cwvCYn5yrZn0O2n1gSOaR__zxS/",
            "phase": "Phase 1",
            "lower": 460,
            "short_name": "★ Bayonet | Gamma Doppler",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Gamma Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -488px -423px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjwPKvBmm5D19V5i_rEpLP5gVO8v11tMmD6IobEdFRsMFmB8lPvlL-9hZbuvJ_JziBn7HYltnvfnES21xhKcKUx0sfosVEP/",
            "phase": "Phase 1",
            "lower": 460,
            "short_name": "★ StatTrak™ M9 Bayonet | Doppler",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ M9 Bayonet | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -169.5px -359.5px; background-size 1018px 616.5px"
        }],
        "480": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NFOhujT8om70Azg_kQ6MTygdYKXJw9qMlnX_Fa3ye28gpC-vZSdynYxviZztyncmwv330_7Rx0jNA",
            "phase": "",
            "lower": 480,
            "short_name": "★ Karambit | Slaughter",
            "exterior": "Minimal Wear",
            "market_name": "★ Karambit | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -787.5px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDL3Qkm5u5cB1g_zMyoD0mlOx5URtMjj1INKTIQI8aA3T_gK-yOq9jMO675mYziQw7CQlsCrUnhy00xpSLrs4IWXm618",
            "phase": "",
            "lower": 480,
            "short_name": "★ Specialist Gloves | Fade",
            "exterior": "Field-Tested",
            "market_name": "★ Specialist Gloves | Fade",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -495px -245.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zPYgJA7cW5moWfqPbhJ7TFhGRf4cZOhuDG_ZjKhFWmrBZyZzv0co6Ve1A6NA3U-VXql7jn05S7vM_JzXNiuiAi5H2LnBzkhE0eO_sv26L9s_p6DA",
            "phase": "",
            "lower": 480,
            "short_name": "★ Bayonet | Autotronic",
            "exterior": "Minimal Wear",
            "market_name": "★ Bayonet | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -568px -423px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhnwMzFJTwW0865jYGHqOTlJrLDk1Rd4cJ5ntbN9J7yjRqy80NuNjrwd9CcIQdtZ1DT_QW2xe_sjZLqusnIyHBgvCch4X_VlxXln1gSOYPgMY0F",
            "phase": "",
            "lower": 480,
            "short_name": "StatTrak™ M4A4 | Royal Paladin",
            "exterior": "Factory New",
            "market_name": "StatTrak™ M4A4 | Royal Paladin",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 50.5px; background-position -91px -134px; background-size 1018px 616.5px"
        }],
        "500": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp1n-rV4Y3ljWu4ohQ0JwavdcTCJxhsYFDZ_VTtlezn1MPpu5vNzCYx7HQq43_dlh2_hRtJZuNpgaCfGA2bGeUXS9qrj1zp",
            "phase": "",
            "lower": 500,
            "short_name": "★ Hand Wraps | Duct Tape",
            "exterior": "Factory New",
            "market_name": "★ Hand Wraps | Duct Tape",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -943.5px -336px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDLDYm2Rf5_p1g-jM-oLxm2umrhcDOzyiYs_6Lld8Ng3OqALoyejvgJC7vJvOnSZn7nMq5nrezRW31BEfPOdp1vzNQViaBvAbHr7CWCSgpxYuwg",
            "phase": "",
            "lower": 500,
            "short_name": "★ Specialist Gloves | Crimson Kimono",
            "exterior": "Battle-Scarred",
            "market_name": "★ Specialist Gloves | Crimson Kimono",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -578px -245.5px; background-size 1018px 616.5px"
        }],
        "510": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLjZmWhe18d-heT--InxgUG5lB89IT6mOo6dIQU5aViG_gO8wr3pgJa16ZXByiFjsikgsXqLyUexhxFNau05hqaACQLJ80aLR9A",
            "phase": "",
            "lower": 510,
            "short_name": "★ Moto Gloves | POW!",
            "exterior": "Field-Tested",
            "market_name": "★ Moto Gloves | POW!",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -248px -483px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_9K3n4WYnP76DKzZn39U18h0juDU-LP5iUazrl1rYT3xcNWcdgM2YQzR-QS_wr--gMe9vZrLyHNrvHRw7XjamBe1iBlEcKUx0tQA-7uv",
            "phase": "",
            "lower": 510,
            "short_name": "★ Driver Gloves | King Snake",
            "exterior": "Field-Tested",
            "market_name": "★ Driver Gloves | King Snake",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -315px -362.5px; background-size 1018px 616.5px"
        }],
        "520": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJP7c60mIW0kfbwNoTdn2xZ_Pp9i_vG8ML0jFfm80U6YGCgLY7EewA9YV7S-gC3xubshMXtvsjMyXdjuCIrsSmLgVXp1iqhnkny",
            "phase": "",
            "lower": 520,
            "short_name": "★ Bayonet | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -926px -493px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbummRD7fp8j-3I4IHKhFWmrBZyY233coeRelVsZF3Z-1HsyL3t0Zbv6Z2YwXcy6XZ05nvayh210h5Lbvsv26LXJ1pZGg",
            "phase": "",
            "lower": 520,
            "short_name": "★ Karambit | Lore",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -707px -189.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP4jVC9vh4DPzixc9OLdlJqN1mC_lC2xO670JbouJTAyXAxvSIjsHzdzkSy1UsZb7Y7hfacT0LeWfK7G5XVQA",
            "phase": "",
            "lower": 520,
            "short_name": "★ Karambit | Autotronic",
            "exterior": "Well-Worn",
            "market_name": "★ Karambit | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -853px -190px; background-size 1018px 616.5px"
        }],
        "530": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20k_jkI7fUhFRB4MRij7j--YXygED6-kU_Y2HyLYaXeldoZFHYqFa5w-btg8W-7s7PzndkuyJz5CvYzkO0hgYMMLK4xIyRWw/",
            "phase": "Phase 1",
            "lower": 530,
            "short_name": "★ Karambit | Doppler",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -861px -138.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjuNrnDl1Rd4cJ5ntbN9J7yjRrh-BVlZW3ydoTHdABsZ13Y_Qe5xue6gMC-vp-amntr6yQq4XfUzhTin1gSOZHog2Kf",
            "phase": "",
            "lower": 530,
            "short_name": "★ M9 Bayonet | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -852px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GaqPX4Jr7VqWdY781lteXA54vwxg3i8kZtazqmI4CVdgY6NV_S-li7kLjngJXqtZ2dn3VmsiJ34nfVlkOpwUYb7EhgLjQ",
            "phase": "",
            "lower": 530,
            "short_name": "★ Butterfly Knife | Blue Steel",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Blue Steel",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -721px -288.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Igsj5aoTTl3Ju5Mpjj9bM8Ij8nVmLpxIuNDztdYGXcQ42ZlrW_gDqxOa5hsO8uZ-dznFkuiBwsSrZzEe1hRofP7E9hOveFws2jhIh_Q",
            "phase": "",
            "lower": 530,
            "short_name": "★ M9 Bayonet | Lore",
            "exterior": "Field-Tested",
            "market_name": "★ M9 Bayonet | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82.5px; h 61px; background-position -0.5px -127.5px; background-size 1016.5px 621.5px"
        }],
        "550": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQh5hlcX0nvUOGsx8DdQBJjIAVHubSaIAlp1fb3cyhW-NmkkoyS2aCtZ-qFwW4JvMQlj7CVp9qn2Aaw_0ZtZ2z6JYbGIFQ-YV_X81btlOvxxcjrQyWGkSc",
            "phase": "",
            "lower": 550,
            "short_name": "★ Butterfly Knife",
            "market_name": "★ Butterfly Knife",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -795px -288.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-MhMj5aoTTl3Ju6dBlhf3T-oL8i2u4ohQ0JwavdcTCJxhoaVmG_Fnoxua9hcS4vJrIznRjuHZx7XeLmRflhUxLP7NsgfPNTV-eGeUXSwZKyJQd",
            "phase": "",
            "lower": 550,
            "short_name": "★ M9 Bayonet | Autotronic",
            "exterior": "Minimal Wear",
            "market_name": "★ M9 Bayonet | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82.5px; h 61px; background-position -0.5px -189.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAR0hwIQFTibK8LxVh7PTEfitH_-O0mI-Ek__7JrXVqWNI7Ndwte7T8In7t1ixqgc0NiucedPWKmlsIwmTuT7imLm3wfng7d-enGw3syYitCmMyUG-iRAeaeM-0ffIHw-cUqJOSaOCACLTtcxzSXqqG0nmhSEOkTgX46si",
            "phase": "",
            "lower": 550,
            "short_name": "★ Hydra Gloves | Mangrove",
            "exterior": "Factory New",
            "market_name": "★ Hydra Gloves | Mangrove",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 49.5px; background-position -927px -387px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO7nYyCg_bmKoTdn2xZ_Pp9i_vG8MKh2QK1_kRtNzyhJY-dcgU7NF7Z-QLvxuq70Je7vsydy3Ay7iEq7X_UgVXp1uxQF-Nd",
            "phase": "",
            "lower": 550,
            "short_name": "★ Sport Gloves | Arid",
            "exterior": "Minimal Wear",
            "market_name": "★ Sport Gloves | Arid",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -398px -363px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLnQhWJS18Jjj-zPyoPniVqzriwwOj6rYOnJI0RpNEbTr1S2wuvsjJG46ZTLmyBmvHYg5HePzRy00xwaP-Jo1_WYSlXLA6xBAuDcUV1SmWMa",
            "phase": "",
            "lower": 550,
            "short_name": "★ Moto Gloves | Turtle",
            "exterior": "Minimal Wear",
            "market_name": "★ Moto Gloves | Turtle",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -333.5px -483.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KlsjyMr_UqWdY781lteXA54vwxgLi-0FrNWqiI4CWIw5sYQnY81m3xLjs18LouZjNwXc3uCF27SuOy0SpwUYbghNKfR8",
            "phase": "",
            "lower": 550,
            "short_name": "★ M9 Bayonet | Fade",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -481px -363.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbfgJM5du-gL-HnvD8J4Tdl3lW7Ysg2-uTpN2iiVLmrkM6YW3zJYeUcQY7aV3XqwO3wrvvhZ-96Z7Nzic3pGB8sk5ZbSKb",
            "phase": "",
            "lower": 550,
            "short_name": "★ Bayonet | Night",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Night",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -165.5px -479px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP4jVC9vh4DPzixc9OLdlJqN1mC_lC2xO670JbouJTAyXAxvSIjsHzdzkSy1UsZb7Y7hfacT0LeWfK7G5XVQA",
            "phase": "",
            "lower": 550,
            "short_name": "★ Karambit | Autotronic",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -853px -190px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY60g_7zNqnumXlQ5sJ0teXI8oTht1i1uRQ5fTqnIdecJgFqMFmG-1TsxO3phcO0vpibziZruCYj537dzECwgB9KauZxxavJ_ct1ylw",
            "phase": "",
            "lower": 550,
            "short_name": "★ Karambit | Tiger Tooth",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Tiger Tooth",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -603.5px -167.5px; background-size 1016.5px 621.5px"
        }],
        "600": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oTht1i1uRQ5fWDwLYbAdVBqYVHRrwC2kO7rhpLq6J_IzXE2unFxs3-JmkG200ofZ-JxxavJKZiOt4k",
            "phase": "",
            "lower": 600,
            "short_name": "AK-47 | Fire Serpent",
            "exterior": "Minimal Wear",
            "market_name": "AK-47 | Fire Serpent",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -164px -480.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV086jloKOhcj4OrzZglRd6dd2j6eUrd-jiwfsr0BsYG6iIdeUJA8-Nw6EqVntyLrv15-4v5vOmiNr73Z2-z-DyAddTn8e",
            "phase": "",
            "lower": 600,
            "short_name": "StatTrak™ AK-47 | Vulcan",
            "exterior": "Factory New",
            "market_name": "StatTrak™ AK-47 | Vulcan",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -83.5px -374px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KmsjzMrbcl1RV59VhhuzTypz9iUex-iwwOj6rYJiRew4-MgrSqAO-yLvujMe4tMzJzSM2uylz5SrbnBC0hRpKO-1u1qbLVxzAUNEUr2p2/",
            "phase": "Phase 1",
            "lower": 600,
            "short_name": "★ M9 Bayonet | Gamma Doppler",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Gamma Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82.5px; h 61px; background-position -0.5px -251.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NFOhujT8om70Azg_kQ6MTygdYKXJw9qMlnX_Fa3ye28gpC-vZSdynYxviZztyncmwv330_7Rx0jNA",
            "phase": "",
            "lower": 600,
            "short_name": "★ Karambit | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -787.5px -138px; background-size 1018px 616.5px"
        }],
        "610": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GaqPj9P77VqWdY781lteXA54vwxlDh-BZkYzv0JIDAdVI5NwmD8wW8w7rtg5O5tZicmHMysyUrsC7alkepwUYbj35ccSk",
            "phase": "",
            "lower": 610,
            "short_name": "★ Butterfly Knife | Case Hardened",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Case Hardened",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -869px -288.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j_OrfdqWhe5sN4mOTE8bP5gVO8vywwMiukcZjEcVc5M1CG-1jtyLi9jJW97pzBmnM27nQlsSvfnkGzhU1OPeY8h6CeVxzAUEsa6pHf",
            "phase": "",
            "lower": 610,
            "short_name": "StatTrak™ USP-S | Kill Confirmed",
            "exterior": "Factory New",
            "market_name": "StatTrak™ USP-S | Kill Confirmed",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82.5px; h 42px; background-position -163.5px -526px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqO3xManQqWdY781lteXA54vwxgyy_hduaz_7do6TcgFqaVvQ_1jtxbq5g5e07p7AwCdh7HEn4H6PzRGpwUYb-q86lXo",
            "phase": "",
            "lower": 610,
            "short_name": "★ Butterfly Knife | Slaughter",
            "exterior": "Minimal Wear",
            "market_name": "★ Butterfly Knife | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -943px -288px; background-size 1016.5px 621.5px"
        }],
        "650": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO3mb-GkuP1P6jummJW4NFOhujT8om72VGy-kJpZjr0JYSWdg9sYwmBrwS2wOnt1JXo7Zqfm3M2vCJ35HzbnQv330-9f4-Ixw",
            "phase": "",
            "lower": 650,
            "short_name": "Souvenir M4A1-S | Knight",
            "exterior": "Factory New",
            "market_name": "Souvenir M4A1-S | Knight",
            "rarity": "Classified",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 89.5px; h 39.5px; background-position -364px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmgZKbm_LLO77QgHJu5MRjjeyPo46i0A3lqhJsYzr6dYHDdgc_N16G_1C7l7jpg8O_vs6fzHcx6SV0tGGdwUINRWWZ1w",
            "phase": "",
            "lower": 650,
            "short_name": "★ Sport Gloves | Pandora's Box",
            "exterior": "Battle-Scarred",
            "market_name": "★ Sport Gloves | Pandora's Box",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -565.5px -363.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszYfi5H5di5mr-HnvD8J4Tdl3lW7YsijuuUo9StiQG2_0Q-N2z0JobAdQU2ZQmCrFC9kurqh5W97Z6amnJgpGB8sqTzmbCH",
            "phase": "",
            "lower": 650,
            "short_name": "M4A4 | Poseidon",
            "exterior": "Factory New",
            "market_name": "M4A4 | Poseidon",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -168.5px -162px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWNU6dNoteXA54vwxgbk-BBqZmH2coOdJlM5NAmCrlLqxOfqh8Xtv5XKy3Uy7CAht37cmhGpwUYbp-HOwfM",
            "phase": "",
            "lower": 650,
            "short_name": "AK-47 | Wild Lotus",
            "exterior": "Battle-Scarred",
            "market_name": "AK-47 | Wild Lotus",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -176.5px -61.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopuP1FAR17PfacDpN4uOmzdC0leX1JbTummJW4NFOhujT8om72gTkrhVpYmqicYScI1M5Z13RqwW9l-3u0JC07pibyHpluCcr4HjfyQv33082TFpJRA",
            "phase": "",
            "lower": 650,
            "short_name": "StatTrak™ P90 | Emerald Dragon",
            "exterior": "Factory New",
            "market_name": "StatTrak™ P90 | Emerald Dragon",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 87px; h 48.5px; background-position -441.5px -168.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kPb5PrrukmRB-Ml0mNbR_Y3mjQWLpxo7Oy3tI4CcIVA8MArW_VfrkOy-gsK7v5_LmnBmsnYn4i2MzB3j0klMbuZsg-veFwtNHI-dng/",
            "phase": "Phase 1",
            "lower": 650,
            "short_name": "★ Karambit | Gamma Doppler",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Gamma Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -254px -495px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0gPL2IITdn2xZ_Pp9i_vG8MKj2Qbl_EdlZziiddOXdAY2YAvT-wW2xrjugJG_tcvNyyBn6SEm4XuMgVXp1n8qZn5H",
            "phase": "",
            "lower": 650,
            "short_name": "★ Karambit | Crimson Web",
            "exterior": "Minimal Wear",
            "market_name": "★ Karambit | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -906.5px -180.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO0mJWOqOf9PbDunm5Q_txOhujT8om70QG1qRJvZ2indY6WIVdtYQmDrFO7kObn1pW16MnImCFr63Fw4iqMygv330-VmyLWnQ",
            "phase": "",
            "lower": 650,
            "short_name": "★ Sport Gloves | Vice",
            "exterior": "Battle-Scarred",
            "market_name": "★ Sport Gloves | Vice",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -648.5px -363.5px; background-size 1018px 616.5px"
        }],
        "700": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp3i-vT_I_Kj1G7phYoITCgS9TJN1NRPQGHohXRnb-t0sOi7Z7MyiY37ykh5XmJlkfigE0dOLFngfadSA6eVfNIHqCDAnGCtpBxHjLqR03yK1V2Uw",
            "phase": "",
            "lower": 700,
            "short_name": "★ Hand Wraps | Overprint",
            "exterior": "Minimal Wear",
            "market_name": "★ Hand Wraps | Overprint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -72.5px -84.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zLZAJA7cW5moWfqPv7Ib7ummJW4NFOhujT8om72wPmqEQ5YzygIoORJAVsNF2E_1Lryem818Tt756Ym3NlunMqtnjbygv3309GNM5LHA",
            "phase": "",
            "lower": 700,
            "short_name": "★ Bayonet | Lore",
            "exterior": "Minimal Wear",
            "market_name": "★ Bayonet | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -648px -423px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0vL3dzxG6eO6nYeDg8j4MqnWkyUHucB1ieqXrIrz2gHmr0ZvZDj3cNKUdlQ-YF6DqAS2w-i8h5Dt6Zib1zI97Ycw1ud8",
            "phase": "",
            "lower": 700,
            "short_name": "Glock-18 | Fade",
            "exterior": "Factory New",
            "market_name": "Glock-18 | Fade",
            "rarity": "Restricted",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 60.5px; h 48.5px; background-position -956.5px -93.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY60g_7zNqnumXlQ5sJ0teXI8oTht1i1uRQ5fTqnIdecJgFqMFmG-1TsxO3phcO0vpibziZruCYj537dzECwgB9KauZxxavJ_ct1ylw",
            "phase": "",
            "lower": 700,
            "short_name": "★ StatTrak™ Karambit | Tiger Tooth",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Karambit | Tiger Tooth",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -603.5px -167.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDLTDl2VW7fpmguDV8LP5gVO8vywwMiukcZiSJ1NsYVqE8lXswu66hpe-6p7LnXdl63R25SuOmRexgk1JOOVtgqacVxzAUP3oPC3w",
            "phase": "",
            "lower": 700,
            "short_name": "★ Specialist Gloves | Foundation",
            "exterior": "Minimal Wear",
            "market_name": "★ Specialist Gloves | Foundation",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -661px -245.5px; background-size 1018px 616.5px"
        }],
        "725": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20jfL2IbrummJW4NFOhujT8om70Azg_kQ6MTygdYKXJw9qMlnX_Fa3ye28gpC-vZSdynYxviZztyncmwv330_7Rx0jNA",
            "phase": "",
            "lower": 725,
            "short_name": "★ StatTrak™ Karambit | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Karambit | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -787.5px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPP7I6vdk3lu-M1wmeyQyoD8j1yg5RVtMmCmctOWJlI-YwyD_VG8w-nohsPt78zKz3Zhsygq4HnczEHk0k5SLrs4Un2yL0k/",
            "phase": "Phase 1",
            "lower": 725,
            "short_name": "★ Butterfly Knife | Doppler",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -677px -173px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-KlsjyMr_UqWdY781lteXA54vwxgLi-0FrNWqiI4CWIw5sYQnY81m3xLjs18LouZjNwXc3uCF27SuOy0SpwUYbghNKfR8",
            "phase": "",
            "lower": 725,
            "short_name": "★ M9 Bayonet | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -481px -363.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqO3xManQqWdY781lteXA54vwxgyy_hduaz_7do6TcgFqaVvQ_1jtxbq5g5e07p7AwCdh7HEn4H6PzRGpwUYb-q86lXo",
            "phase": "",
            "lower": 725,
            "short_name": "★ Butterfly Knife | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Slaughter",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -943px -288px; background-size 1016.5px 621.5px"
        }],
        "750": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlZG0mP74Nr_ummJW4NFOhujT8om73Qay8kFuaj3xLYCVJAM7ZF-B8li9kOfm1sW6u5SfyHNru3Im7SvUlwv330-EAAozoQ",
            "phase": "",
            "lower": 750,
            "short_name": "★ Karambit | Case Hardened",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Case Hardened",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -714px -138px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOxhoWOmcj5Nr_Yg2Zu5MRjjeyPpdX22gbhqkppMWz7coGcIAE9ZVvV8le2wOq7h5TotM7My3FkuCEk42GdwUK5qPdDsA",
            "phase": "",
            "lower": 750,
            "short_name": "★ Sport Gloves | Hedge Maze",
            "exterior": "Field-Tested",
            "market_name": "★ Sport Gloves | Hedge Maze",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -731.5px -364px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zPYgJA7cW5moWfqPbhJ7TFhGRf4cZOhuDG_ZjKhFWmrBZyZzv0co6Ve1A6NA3U-VXql7jn05S7vM_JzXNiuiAi5H2LnBzkhE0eO_sv26L9s_p6DA",
            "phase": "",
            "lower": 750,
            "short_name": "★ Bayonet | Autotronic",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -568px -423px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teHE9Jrst1i1uRQ5fW3yI9WRcw83YViCr1DswO680JW57cjPwXcwvXQrtHbUmByzgkkZOuJxxavJ1uEsotc",
            "phase": "",
            "lower": 750,
            "short_name": "StatTrak™ AK-47 | Fire Serpent",
            "exterior": "Battle-Scarred",
            "market_name": "StatTrak™ AK-47 | Fire Serpent",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -0.5px -39px; background-size 1018px 616.5px"
        }],
        "800": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJh4-0mf7zO6_ummJW4NFOhujT8om73Abj_0toMWHxIo6SIA9rM1rUr1K2wOzq05Pp7ZScwHpgsiQls3nVyQv3309jjRKblA",
            "phase": "",
            "lower": 800,
            "short_name": "★ Karambit | Night",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Night",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -721px -237px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDK_Dn2pf78l0tevN4InKhF2zowcDPzixc9OLclBqYFHQ8ljskLzngJa-uM_AzXdr7icq43qInRSy1R8YbuRo06GWTULeWfIJUakEYg",
            "phase": "",
            "lower": 800,
            "short_name": "★ Moto Gloves | Cool Mint",
            "exterior": "Minimal Wear",
            "market_name": "★ Moto Gloves | Cool Mint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -419px -483.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_NC3nYS0h-LmI7fUqWdY781lteXA54vwxgTn-kY-ZG-nddDDIA49aA3Q-QC3lOvrhsLvvMnNmHEy6HUl5HnUnRepwUYb5f1GGmY",
            "phase": "",
            "lower": 800,
            "short_name": "★ Driver Gloves | Imperial Plaid",
            "exterior": "Minimal Wear",
            "market_name": "★ Driver Gloves | Imperial Plaid",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -507px -324px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP5gVO8vywwMiukcZiQI1A4MlnQ8gLrwua5gpfqvJTPzSRi6HJ25XmPzBG_0hkYbbBqgfOcVxzAUM3VirIt",
            "phase": "",
            "lower": 800,
            "short_name": "★ Karambit | Autotronic",
            "exterior": "Minimal Wear",
            "market_name": "★ Karambit | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -334.5px -497px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmMbfUqW1Q7MBOhuDG_ZjKhFWmrBZyNmynJNCRdQdtMlyBqwW2lbq7g8Po6ZnLwCM17yhxsX2JlxXkgEsabPsv26LDJQinCA",
            "phase": "",
            "lower": 800,
            "short_name": "★ Karambit | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -722px -336.5px; background-size 1016.5px 621.5px"
        }],
        "850": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-KmsjwPKvBmm5D19V5i_rEprPigVC7vCwwOj6rYOnJI0RpNEbVrAXvlOi8gcDtvZrJziA1vCAqt3-MyRHm0hoYaec-1_3PQF7NVfNIAuDcUWvXnfMD/",
            "phase": "Phase 3",
            "lower": 850,
            "short_name": "★ StatTrak™ Talon Knife | Doppler",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Talon Knife | Doppler",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -77px -298.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfx_LLZTRB7dCJnJm0gPL2IITdn2xZ_Pp9i_vG8MLwjgbg_UI_Y2rxLIGSIFA5NV6C-1e-wb251JfvvpzKyHUx6Slx4XndgVXp1lCrFlUj",
            "phase": "",
            "lower": 850,
            "short_name": "★ Huntsman Knife | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Huntsman Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 70px; h 45px; background-position -322.5px -41px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDLDYm2Rf5_p1g-jM-oLxm2umrhcDPjynfcPIHVpvIw-F5AW7ku_p0J6_vciYnyY3vyUi5yzUyxCx1E1FO-I90P3NSFueBKdLT6ScRi2HjGqdP_k",
            "phase": "",
            "lower": 850,
            "short_name": "★ Specialist Gloves | Crimson Kimono",
            "exterior": "Field-Tested",
            "market_name": "★ Specialist Gloves | Crimson Kimono",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -744px -245.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO6nYeDg8j2P67UqWZU7Mxkh9bN9J7yjRqy_0RkYGjwddCTJA5qM1iF_lHrku7nh5676p7BnHRqv3Mrt3nZnxWwn1gSOSn3eWSL",
            "phase": "",
            "lower": 850,
            "short_name": "★ Sport Gloves | Superconductor",
            "exterior": "Field-Tested",
            "market_name": "★ Sport Gloves | Superconductor",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -173.5px -375.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWdY781lteXA54vwxgG2rhFla2-hcYTGclBqYAnWrgXrx728hsC_up2fm3MyvnIl4nffnEGpwUYbLGuk_6Y",
            "phase": "",
            "lower": 850,
            "short_name": "★ M9 Bayonet | Crimson Web",
            "exterior": "Minimal Wear",
            "market_name": "★ M9 Bayonet | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -84px -102.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-KlsjyMr_UqWdY781lteXA54vwxgHgqEE_a23ycYKRIwQ5aA3Q-lC2xu25jZbqtZXOwXpmvSgity3cmhOpwUYbp5WcBYw",
            "phase": "",
            "lower": 850,
            "short_name": "★ Talon Knife | Fade",
            "exterior": "Factory New",
            "market_name": "★ Talon Knife | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -161px -300.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-Kmsj5MqnTmm5u7sR1j9bW_Ij6n2u4ohQ0JwavdcTCJxg_Y1qD-QXqx-_pjZXu6prNwCZh7yd24S3amhzjghxMZ7Rsh_ydQV6cGeUXSyrHXU9u",
            "phase": "",
            "lower": 850,
            "short_name": "★ Talon Knife | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ Talon Knife | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -245px -300.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp9g-7J4bP5iUazrl09Zj_yJdWRcVQ9NV6G_li7ybq8jZ687ZmfwHtrvHYi4n3VzUbh1RsfcKUx0hi_kNRQ",
            "phase": "",
            "lower": 850,
            "short_name": "★ Hand Wraps | Leather",
            "exterior": "Factory New",
            "market_name": "★ Hand Wraps | Leather",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -144.5px -85.5px; background-size 1018px 616.5px"
        }],
        "900": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlYG0kfbwNoTdn2xZ_Pp9i_vG8ML20QXi80M4ZGzwddLGcFBtMl2FrlPrxeu71MC0vZifzyZn63In5S3agVXp1g0meEXB",
            "phase": "",
            "lower": 900,
            "short_name": "★ Karambit | Fade",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -794.5px -237px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf1fLEcjVL49KJnJm0gPL2IITdn2xZ_Pp9i_vG8MKsiwfh_hBra2j6do7DJg83YgrV_lLskru61p-7usjOwHo2vHUq43zegVXp1quG0xFU",
            "phase": "",
            "lower": 900,
            "short_name": "★ Falchion Knife | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Falchion Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -842.5px -554.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-YmMjkJqnBmm5u5Mx2gv3--Y3nj1H6_hA9a2rwddSQc1Q5MFHX-AW3k-u915G7tZ-awXpqvydz43aOm0ez0gYMMLJr8B7KPw",
            "phase": "",
            "lower": 900,
            "short_name": "★ M9 Bayonet | Ultraviolet",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -84px -162px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDKLUmmde__pyi-TOyoD8j1yglB89IT6mOoHAJgQ4YAqF-FHoxezugJW9tZXLzHQ163El436PzRXliRpMPOc60_yACQLJGoOGu0s",
            "phase": "",
            "lower": 900,
            "short_name": "★ Moto Gloves | Transport",
            "exterior": "Factory New",
            "market_name": "★ Moto Gloves | Transport",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -427.5px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLbYmH9u_Nd4i-fG-YnKhVGwogYxDDWiZtHAbFBqYV2BqFm8k-3n1JPv6c_OyyMw7nQm4HuLnBHlhU1MZuA6gPaYH1yAR_seFZ1ThSM",
            "phase": "",
            "lower": 900,
            "short_name": "★ Moto Gloves | Spearmint",
            "exterior": "Field-Tested",
            "market_name": "★ Moto Gloves | Spearmint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -504.5px -483.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8jyMrnDn2hu59dwhO7Eyo_0hVuLpxo7Oy2ceNfXJVMgN1DU_1Ltx-65gpLttJnPmyZg6SAn5n7dy0Cz1xhMarY7jPDPSA3PBbsJQvf6eanOuA",
            "phase": "",
            "lower": 900,
            "short_name": "★ Hand Wraps | Badlands",
            "exterior": "Factory New",
            "market_name": "★ Hand Wraps | Badlands",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -216.5px -87px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zLZAJA7cW5moWfqPv7Ib7ummJW4NFOhujT8om72wPmqEQ5YzygIoORJAVsNF2E_1Lryem818Tt756Ym3NlunMqtnjbygv3309GNM5LHA",
            "phase": "",
            "lower": 900,
            "short_name": "★ Bayonet | Lore",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 79px; h 59.5px; background-position -648px -423px; background-size 1018px 616.5px"
        }],
        "950": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-YmMj6OrzZglRd4cJ5ntbN9J7yjRrhqhA-MTygIILEcwRvYgzVr1S9yefv1pHtvsjMwSMy7CghtCrflxK2n1gSORdzljmC",
            "phase": "",
            "lower": 950,
            "short_name": "★ M9 Bayonet | Night",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Night",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -598.5px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_tmyq4yCkP_gDLfQhGxUppQi3b2UoIrx3gDs_RBpYD-mcoeQIwM8Yg7Y_AS8yOzngpK_6MjAzid9-n51DgI4TYA",
            "phase": "",
            "lower": 950,
            "short_name": "★ Driver Gloves | Crimson Weave",
            "exterior": "Minimal Wear",
            "market_name": "★ Driver Gloves | Crimson Weave",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -895.5px -372.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GKqPH1N77ummJW4NFOhujT8om7igW1qUY6MWqmcIadcw47MFrW_FK9xbzpgZ607Z7PzSAxuXYg53-Llwv330-D9XTwcQ",
            "phase": "",
            "lower": 950,
            "short_name": "★ Butterfly Knife | Fade",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -727px -449.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWZU7Mxkh9bN9J7yjRri-xJlMGHwcIWTJ1A_Z12C_gO7lO65hJXvvcmcy3U2uylx4inezRK1n1gSOchgY33-",
            "phase": "",
            "lower": 950,
            "short_name": "AK-47 | Wild Lotus",
            "exterior": "Well-Worn",
            "market_name": "AK-47 | Wild Lotus",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -267.5px -61.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4iSqODxMajummJW4NFOhujT8om70FHnqkBqZWGiLICSelc6Mg3V_AO8x-nq1pC86JqcmnQyvSUk7X3azgv3309LA7AIOA",
            "phase": "",
            "lower": 950,
            "short_name": "★ Butterfly Knife | Crimson Web",
            "exterior": "Minimal Wear",
            "market_name": "★ Butterfly Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -801px -449.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20mvbmMbfUqW1Q7MBOhuDG_ZjKhFWmrBZyNmynJNCRdQdtMlyBqwW2lbq7g8Po6ZnLwCM17yhxsX2JlxXkgEsabPsv26LDJQinCA",
            "phase": "",
            "lower": 950,
            "short_name": "★ StatTrak™ Karambit | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Karambit | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -722px -336.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlYG0kfbwNoTdn2xZ_Pp9i_vG8ML20QXi80M4ZGzwddLGcFBtMl2FrlPrxeu71MC0vZifzyZn63In5S3agVXp1g0meEXB",
            "phase": "",
            "lower": 950,
            "short_name": "★ StatTrak™ Karambit | Fade",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Karambit | Fade",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -794.5px -237px; background-size 1016.5px 621.5px"
        }],
        "1000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO0mIGInMjjNrnTn2VW19x0huXO4rP5gVO8vywwMiukcZiQJgFsYFjRrwO5yenq1pK978ufzHo2unZz5Szdl0SziE5LbeVs1_CeVxzAUAb58qK8",
            "phase": "",
            "lower": 1000,
            "short_name": "★ Sport Gloves | Omega",
            "exterior": "Minimal Wear",
            "market_name": "★ Sport Gloves | Omega",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -256.5px -376px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4GGqPr1Ibndk1RX6cF0teXI8oTht1i1uRQ5fTr6JYGVIFVsaV3Ur1Tqwru7hcC_7Z_LmyM2snEm4H7eyUGzhxFJarRxxavJ1sigobc",
            "phase": "",
            "lower": 1000,
            "short_name": "★ Butterfly Knife | Marble Fade",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Marble Fade",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -919.5px -554.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ97tC3l4u0m_7zO6_ummpD78A_2-iSrYmg0QLsqEZoaj33LdOSewdtN13VqAK6l-bmh5W-6ZzAnHBl7D5iuyjjIkA5BA",
            "phase": "",
            "lower": 1000,
            "short_name": "★ Driver Gloves | Lunar Weave",
            "exterior": "Factory New",
            "market_name": "★ Driver Gloves | Lunar Weave",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -339.5px -378px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdShR7eO3g5C0n_L1JaLummpD78A_jLHE8d-jjQex_0duY2qlJdOQIwM6M1zV_FDqkObvhcK4uMudwXVruD5iuygDtt1P9Q",
            "phase": "",
            "lower": 1000,
            "short_name": "AWP | Medusa",
            "exterior": "Battle-Scarred",
            "market_name": "AWP | Medusa",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -636.5px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLGeDBH092jk7-DkvbiKoTdl3lW7Ysp3L6Z8Y2s0Ay2-UQ_amz6cNCXdVQ5Z1HQ-lG5yO7q0ZLtvJ3KmiBgpGB8suLjylz8",
            "phase": "",
            "lower": 1000,
            "short_name": "AUG | Akihabara Accept",
            "exterior": "Minimal Wear",
            "market_name": "AUG | Akihabara Accept",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89.5px; h 49.5px; background-position -703.5px -60px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJH4t27kYy0n_L1JaLummpD78A_jLyQod2j3gLs_UE_MjzxIIaRJ1A2Z13T-FXql-rm1JK7upifzHZi6D5iuygxPvG0kg",
            "phase": "",
            "lower": 1000,
            "short_name": "AWP | The Prince",
            "exterior": "Battle-Scarred",
            "market_name": "AWP | The Prince",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -168.5px -214.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLnQhWJS18d9i-rKyoD8j1yglB89IT6mOo_EegI3MwvR_lS6wertgJ7vtJTPyHZnsykq5SvVlhbl0BEZOLNtgqCACQLJu5kk5I0",
            "phase": "",
            "lower": 1000,
            "short_name": "★ Moto Gloves | Eclipse",
            "exterior": "Factory New",
            "market_name": "★ Moto Gloves | Eclipse",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -513px -0.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYtbWoOwtly_rcaAJK49C5q4yKhfDxfezXwGkC7Z0m3rDAotuk2gfg-0o9MG33JIHGJlNrZVGDrAXvkLjtjcCi_MOeg7M2uuw",
            "phase": "",
            "lower": 1000,
            "short_name": "Sticker | compLexity Gaming",
            "exterior": "Holo",
            "market_name": "Sticker | compLexity Gaming | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 61px; h 53px; background-position -929.5px -499.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmm4mYmPnLNanekVRD7cFOjfvE8ILKhF2zowcDPzixc9OLcwQ2aFuC81O8l7zn05To75ydyCc26XYi5C2LmRe_hxxOZuJr0PydTkLeWfIZs4EquA",
            "phase": "",
            "lower": 1000,
            "short_name": "★ Sport Gloves | Bronze Morph",
            "exterior": "Factory New",
            "market_name": "★ Sport Gloves | Bronze Morph",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -508px -264.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmgZKbm_LLPr7Vn35c18lwmO7Eu9ut2Fa1rUFtMmiiJdKWIFI5ZgmCqFe9kOy80Z7v7cnImHpkuSQqtHfD30vgHujwGg0",
            "phase": "",
            "lower": 1000,
            "short_name": "★ Sport Gloves | Pandora's Box",
            "exterior": "Well-Worn",
            "market_name": "★ Sport Gloves | Pandora's Box",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -422.5px -382.5px; background-size 1016.5px 621.5px"
        }],
        "1250": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oTht1i1uRQ5fWDwLYbAdVBqYVHRrwC2kO7rhpLq6J_IzXE2unFxs3-JmkG200ofZ-JxxavJKZiOt4k",
            "phase": "",
            "lower": 1250,
            "short_name": "AK-47 | Fire Serpent",
            "exterior": "Factory New",
            "market_name": "AK-47 | Fire Serpent",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -164px -480.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Igsj5aoTTl3Ju5Mpjj9bN_Iv9nGu4qgE7NnehINTDIwQ4NV3X-gW6xe660JLvvJnLzXZluiVz7X7dnBS-gREYP-c5m7XAHtWD61VD",
            "phase": "",
            "lower": 1250,
            "short_name": "★ M9 Bayonet | Lore",
            "exterior": "Minimal Wear",
            "market_name": "★ M9 Bayonet | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82.5px; h 61px; background-position -61.5px -540px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmm4mYmPnLNanekVRT5NB0tf7J_Jjwt1i9rBsoDDWiZtHAbFVtZVzY8wLskL3qjMC0vsmdm3Nr6Slz5nzczhy_004YauVph_LLHF6AR_sevt6vaXY",
            "phase": "",
            "lower": 1250,
            "short_name": "★ Sport Gloves | Amphibious",
            "exterior": "Minimal Wear",
            "market_name": "★ Sport Gloves | Amphibious",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -505.5px -383.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu4MBwnPD--Y3nj1H68hE-NW_2JNPAdVNtYV_Q_wO6le7u1pS-7pWfzCFnvCEq7SyOnBzi0wYMMLK7E03aCQ",
            "phase": "",
            "lower": 1250,
            "short_name": "AWP | Dragon Lore",
            "exterior": "Battle-Scarred",
            "market_name": "AWP | Dragon Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -727.5px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO0mJWOqOf9PbDum25V4dB8teXA54vwxgLtqURrYDzydoeWd1JtZ1_Q-1O8yL3r0Je_ucvJy3dk7HJ25C2OnBapwUYbuKd4XdQ",
            "phase": "",
            "lower": 1250,
            "short_name": "★ Sport Gloves | Vice",
            "exterior": "Field-Tested",
            "market_name": "★ Sport Gloves | Vice",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -254px -435.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLbemGRu6sp-h9bN_Iv9nGu4qgE7NnemctCTdgRsNQnXqQTtkO_u0ZO7tJ6bzXtmviQgsyvbzkC20htPbeY7m7XAHhlqr6GE",
            "phase": "",
            "lower": 1250,
            "short_name": "★ Moto Gloves | Boom!",
            "exterior": "Factory New",
            "market_name": "★ Moto Gloves | Boom!",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -590px -483.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJk5O0nPbmMrbul35F59FjhefI9rP5gVO8vywwMiukcZiQI1A4MlnQ8gLrwua5gpfqvJTPzSRi6HJ25XmPzBG_0hkYbbBqgfOcVxzAUM3VirIt",
            "phase": "",
            "lower": 1250,
            "short_name": "★ Karambit | Autotronic",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Autotronic",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -334.5px -497px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYu7WwOAJzw_zaZS595NO6m7-HluXzNvXSwWhSusMk2evD8NmijQfi80BvNW-lItPEIA5oZA7Xrle4xb_ngsTvot2Xnuiici9a",
            "phase": "",
            "lower": 1250,
            "short_name": "Sticker | mousesports",
            "exterior": "Holo",
            "market_name": "Sticker | mousesports | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 63px; h 58.5px; background-position -793.5px -497.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYuLOrIQZz2v3YaDdD4d2lq4iEm_jLP7rDkW4fu5Mn3eqX992jjQ3lrkE_Z2mgLYSXcwY6ZAvW81jole3shpDp7ZzAwWwj5HfT_s4WXQ",
            "phase": "",
            "lower": 1250,
            "short_name": "Sticker | Ninjas in Pyjamas",
            "exterior": "Holo",
            "market_name": "Sticker | Ninjas in Pyjamas | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60px; h 61.5px; background-position -773.5px -557px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAY5b6oKh9f2_zEfgJO7c6xkc7TlfSlarrUkD9U7cYniLnCrNmk0VWwrhBvMmuncY7EewBrMA2D_lTt366x0kMT1ZjM",
            "phase": "",
            "lower": 1250,
            "short_name": "Sticker | 3DMAX",
            "exterior": "Holo",
            "market_name": "Sticker | 3DMAX | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60px; h 62.5px; background-position -666px -431.5px; background-size 1016.5px 621.5px"
        }],
        "1500": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJl5W0nPbmMrbummRD7fp9g-7J4bP5iUazrl1rY2DzddPEdwFsYgnSqwPqyey6hZ_qvM6dm3pnunFx4n2LmxTj1x9PcKUx0uHhTF2B",
            "phase": "",
            "lower": 1500,
            "short_name": "★ Karambit | Lore",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 79.5px; h 55px; background-position -503px -502.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWZU7Mxkh9bN9J7yjRri-xJlMGHwcIWTJ1A_Z12C_gO7lO65hJXvvcmcy3U2uylx4inezRK1n1gSOchgY33-",
            "phase": "",
            "lower": 1500,
            "short_name": "AK-47 | Wild Lotus",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Wild Lotus",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -267.5px -61.5px; background-size 1016.5px 621.5px"
        }],
        "1700": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLPr7Vn35c18lwmO7Eu9-s0AXs-RBkZmCmIoCQcQU3aVuCrFfrwee-gsO77s6bn3Bg6SF3t3bD30vgkAZ9U90",
            "phase": "",
            "lower": 1700,
            "short_name": "M4A4 | Howl",
            "exterior": "Well-Worn",
            "market_name": "M4A4 | Howl",
            "rarity": "Contraband",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -259.5px -109.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLnQhWJS18Jjj-zPyoPniVqzriwwOj6rYOnJI0RpNEbTr1S2wuvsjJG46ZTLmyBmvHYg5HePzRy00xwaP-Jo1_WYSlXLA6xBAuDcUV1SmWMa",
            "phase": "",
            "lower": 1700,
            "short_name": "★ Moto Gloves | Turtle",
            "exterior": "Factory New",
            "market_name": "★ Moto Gloves | Turtle",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -333.5px -483.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8jmNr_uhWdQ_cJ5nuzTyoD8j1yglB89IT6mOo-dJAZsZw6G-gLsw7i-hpO67pjOnydnuHQh5HjYmxzl1ElFbOxojaeACQLJ3-08_Xs",
            "phase": "",
            "lower": 1700,
            "short_name": "★ Hand Wraps | Slaughter",
            "exterior": "Factory New",
            "market_name": "★ Hand Wraps | Slaughter",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -288.5px -87px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-Igsj5aoTTl3Ju5Mpjj9bN_Iv9nGu4qgE7NnehINTDIwQ4NV3X-gW6xe660JLvvJnLzXZluiVz7X7dnBS-gREYP-c5m7XAHtWD61VD",
            "phase": "",
            "lower": 1700,
            "short_name": "★ M9 Bayonet | Lore",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82.5px; h 61px; background-position -61.5px -540px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zAaAJV6d6lq4yCkP_gDLfQhGxUppwj3r-Rpd3zjAy38xFsMGn0I9LGcA49Zw2B_VO5wL_r1Ja-vJrMySB9-n51NRRkGyg",
            "phase": "",
            "lower": 1700,
            "short_name": "★ Bayonet | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Bayonet | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 81.5px; h 60.5px; background-position -0.5px -498px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq5OEqOfhIavdk1Rd4cJ5ntbN9J7yjRrl-kU_Z2GhcoDEdlc9Yg7V_AW_wLzsh5a4tZzAzXBh63En7SnUnBawn1gSOc3pULhL",
            "phase": "",
            "lower": 1700,
            "short_name": "★ Butterfly Knife | Ultraviolet",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Ultraviolet",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 76px; h 61.5px; background-position -754px -174.5px; background-size 1016.5px 621.5px"
        }],
        "2000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWdY781lteXA54vwxgXn-0A5ZG-nJNeSdVdsYF7Uq1W4kOm-18e57c_InSEy7CFztiqImUepwUYbUpyroPk",
            "phase": "",
            "lower": 2000,
            "short_name": "AK-47 | Wild Lotus",
            "exterior": "Minimal Wear",
            "market_name": "AK-47 | Wild Lotus",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -358.5px -61.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJF-dKxmomZqPrxN7LEm1Rd6dd2j6eW8Yj0i1ax80JuNm7ycICXc1Q9aV-G_Qe-xOju0JW075TKmHY3sygn-z-DyM7wV19Y",
            "phase": "",
            "lower": 2000,
            "short_name": "AWP | Gungnir",
            "exterior": "Well-Worn",
            "market_name": "AWP | Gungnir",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -258.5px -214.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0gPL2IITdn2xZ_Pp9i_vG8MKj2Qbl_EdlZziiddOXdAY2YAvT-wW2xrjugJG_tcvNyyBn6SEm4XuMgVXp1n8qZn5H",
            "phase": "",
            "lower": 2000,
            "short_name": "★ Karambit | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -906.5px -180.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0PLGeC595MWJg4WJhMj4OrzZglRd6dd2j6eWp9qkjlfj-RA4Zz3xLdeVcARoN1jQ-lbok-_mgp_quprOnyE37nEn-z-DyM9TLdgb",
            "phase": "",
            "lower": 2000,
            "short_name": "★ Survival Knife | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Survival Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 75.5px; h 58.5px; background-position -0.5px -296.5px; background-size 1018px 616.5px"
        }],
        "2200": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot6-iFAR17PLGeDBH092jk7-HnvD8J4Tdl3lW7Yt32r2YpdugiwLg_ktrYjymIoHHclQ6ZlrV-Qe7yL3tg5e4v8ifmnZqpGB8shEE59-s",
            "phase": "",
            "lower": 2200,
            "short_name": "AUG | Akihabara Accept",
            "exterior": "Factory New",
            "market_name": "AUG | Akihabara Accept",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 89.5px; h 49.5px; background-position -0.5px -133px; background-size 1018px 616.5px"
        }],
        "2500": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDK_Dn2pf78l0tevN4InKhF2zowcDPzixc9OLclBqYFHQ8ljskLzngJa-uM_AzXdr7icq43qInRSy1R8YbuRo06GWTULeWfIJUakEYg",
            "phase": "",
            "lower": 2500,
            "short_name": "★ Moto Gloves | Cool Mint",
            "exterior": "Factory New",
            "market_name": "★ Moto Gloves | Cool Mint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -419px -483.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxuHbZC595MWJg4WJhMj4OrzZglRd6dd2j6eZpt323QXt_EptZ2_6ctfEdQA5NFqBqFS2w7rn0JHttMvLz3FiuCYl-z-DyMND8r0h",
            "phase": "",
            "lower": 2500,
            "short_name": "★ Ursus Knife | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Ursus Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 74.5px; h 56px; background-position -933.5px -197px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJF-dKxmomZqPrxN7LEm1Rd6dd2j6eW8Yj0i1ax80JuNm7ycICXc1Q9aV-G_Qe-xOju0JW075TKmHY3sygn-z-DyM7wV19Y",
            "phase": "",
            "lower": 2500,
            "short_name": "AWP | Gungnir",
            "exterior": "Field-Tested",
            "market_name": "AWP | Gungnir",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -258.5px -214.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdShR7eO3g5C0m_7zO6_ummpD78A_2rzCo4qgiwLjqkE6MT_0cIaRcAA9Zl3W8gPvw7-9h5PpuJmbm3Jr6T5iuyhpU6MIVQ",
            "phase": "",
            "lower": 2500,
            "short_name": "AWP | Medusa",
            "exterior": "Factory New",
            "market_name": "AWP | Medusa",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -818.5px -0.5px; background-size 1018px 616.5px"
        }],
        "3000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLP7LWnn9u5MRjjeyP9tqhiQ2yqEo6Mmn3doPBcwZqZQrRr1O-we_sgMO5tZ_BzCFr6ycltmGdwULa1vGJFg",
            "phase": "",
            "lower": 3000,
            "short_name": "M4A4 | Howl",
            "exterior": "Factory New",
            "market_name": "M4A4 | Howl",
            "rarity": "Contraband",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -259.5px -162px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLbYmH9u_Nd4i-fG-YnKhF2zowcDPzixc9OLJlQ-Y1uGrAC_x-fogZbq6M6dnyc3uyEgtyuJyhaxgh5LOOJsh6afS0LeWfKD9ED27A",
            "phase": "",
            "lower": 3000,
            "short_name": "★ Moto Gloves | Spearmint",
            "exterior": "Minimal Wear",
            "market_name": "★ Moto Gloves | Spearmint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -675.5px -484.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO0mJWOqOf9PbDummJW4NFOhujT8om72FC1_Bc_MD-ncYaRcAA2MFzS8ljvleq9g8W8vMzLyiNiuCRz433Zygv3308allD_ww",
            "phase": "",
            "lower": 3000,
            "short_name": "★ Sport Gloves | Vice",
            "exterior": "Minimal Wear",
            "market_name": "★ Sport Gloves | Vice",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -337px -437.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DfVlxgLQFFibKkJQN3wfLYYgJK7dKyg5KKh8j4NrrFnm5D8fp3i-vT_I_KilihriwvOCyveMX6Ll9pORy_pgD8lrvxgJfpvpWamnZn6XUl5SmJm0DjhhlFbedp1PWYH1jNVaUcSqOKBnuCtYczFntLO18msw",
            "phase": "",
            "lower": 3000,
            "short_name": "★ Hand Wraps | Cobalt Skulls",
            "exterior": "Factory New",
            "market_name": "★ Hand Wraps | Cobalt Skulls",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 71px; h 47.5px; background-position -360.5px -89.5px; background-size 1018px 616.5px"
        }],
        "3500": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfxPrMfipP7dezhr-DjsjjNrnCqWdY781lteXA54vwxgzj_hc-Nj31LNXEdwI-ZAnWrlPrx-i6gJK5uszNnHViuHMl4HfemxepwUYbFkoowQU",
            "phase": "",
            "lower": 3500,
            "short_name": "★ Talon Knife | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Talon Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 83px; h 58px; background-position -412px -304px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJegJL_9C3moS0kfv7IbrdqWdY781lteXA54vwxgXn-0A5ZG-nJNeSdVdsYF7Uq1W4kOm-18e57c_InSEy7CFztiqImUepwUYbUpyroPk",
            "phase": "",
            "lower": 3500,
            "short_name": "AK-47 | Wild Lotus",
            "exterior": "Factory New",
            "market_name": "AK-47 | Wild Lotus",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 47px; background-position -358.5px -61.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDKzUlHhu-sB1teXI8oTht1i1uRQ5fT_6LNKUelQ6Nw3XqwW5lOu70MW6tczPyCRh6Sgg43zczhGz1Bwfa-dxxavJ-wFPV5c",
            "phase": "",
            "lower": 3500,
            "short_name": "★ Specialist Gloves | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Specialist Gloves | Crimson Web",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -827px -246px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDL7ck3lQ5MFOnezDyoD8j1yglB89IT6mOobEIQNoM16F_wfvl-7ujZC87szNyyZj6SMh4nfemRzjgxhKOuM7hfOACQLJqRHb_i0",
            "phase": "",
            "lower": 3500,
            "short_name": "★ Specialist Gloves | Emerald Web",
            "exterior": "Factory New",
            "market_name": "★ Specialist Gloves | Emerald Web",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -434.5px -110px; background-size 1016.5px 621.5px"
        }],
        "4000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYoLO3PxJzw-HHTjVN4NOJmIGZkPK6Y7rSkD9VsJV137qYptTziQLnrUZpZ2HzIdLBdwI4ZwqDqwXqlL3ohIj84spKcl65cQ",
            "phase": "",
            "lower": 4000,
            "short_name": "Sticker | Virtus.Pro",
            "exterior": "Holo",
            "market_name": "Sticker | Virtus.Pro | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60px; h 61px; background-position -919px -553.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYur2nFA9v3_z3fTxQ69n4zYPbzqKtN7mHkD1Vu8Qnjr3Fp46g2w238kZrZW7xJ4fBcFM5YlDZ_E_-n7m71D5xOg",
            "phase": "",
            "lower": 4000,
            "short_name": "Sticker | LGB eSports",
            "exterior": "Holo",
            "market_name": "Sticker | LGB eSports | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 60px; h 61px; background-position -0.5px -538px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLPr7Vn35c18lwmO7Eu9-s0AXs-RBkZmCmIoCQcQU3aVuCrFfrwee-gsO77s6bn3Bg6SF3t3bD30vgkAZ9U90",
            "phase": "",
            "lower": 4000,
            "short_name": "StatTrak™ M4A4 | Howl",
            "exterior": "Field-Tested",
            "market_name": "StatTrak™ M4A4 | Howl",
            "rarity": "Contraband",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -259.5px -109.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv3--Y3nj1H6qBFvMWHyIo7Adw9raF6GrlK9lLi-jJO7tJ_JzyNh63F3sX_emUPkgQYMMLL2MDRAbQ",
            "phase": "",
            "lower": 4000,
            "short_name": "AWP | Dragon Lore",
            "exterior": "Minimal Wear",
            "market_name": "AWP | Dragon Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -909.5px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_NC3nYS0h-LmI7fUqWdY781lteXA54vwxgTn-kY-ZG-nddDDIA49aA3Q-QC3lOvrhsLvvMnNmHEy6HUl5HnUnRepwUYb5f1GGmY",
            "phase": "",
            "lower": 4000,
            "short_name": "★ Driver Gloves | Imperial Plaid",
            "exterior": "Factory New",
            "market_name": "★ Driver Gloves | Imperial Plaid",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -507px -324px; background-size 1016.5px 621.5px"
        }],
        "4500": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmgZKbm_LLP7LWnn9u5MRjjeyPoNr0jQG1r0RtYzzzIo_DcgI-NVDWqQDvxLi-1p-5vsudync36HUm7WGdwUJKXesLsw",
            "phase": "",
            "lower": 4500,
            "short_name": "★ Sport Gloves | Pandora's Box",
            "exterior": "Minimal Wear",
            "market_name": "★ Sport Gloves | Pandora's Box",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -420px -442px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpopb3wflFf0Ob3YjoXuY-JhoGHm-7LP7LWnn9u5MRjjeyPrNyhigKy_EM4MG6gLNDAcwY5NVqDrgO7kL290cK87sjPn3RrvHEhs2GdwUKariuTHQ",
            "phase": "",
            "lower": 4500,
            "short_name": "Souvenir SG 553 | Integrale",
            "exterior": "Factory New",
            "market_name": "Souvenir SG 553 | Integrale",
            "rarity": "Classified",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 48.5px; background-position -612.5px -60px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYu6O2Pw5r7PvHfTJ94N2kk4XFz6byMujUwz9UvMQpib_F9t6h21bn_xdrNj_xddCRcgY6aQyF_lPvwPCv28FW6D4Bsg",
            "phase": "",
            "lower": 4500,
            "short_name": "Sticker | Clan-Mystik",
            "exterior": "Holo",
            "market_name": "Sticker | Clan-Mystik | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 62px; h 60.5px; background-position -875px -437.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwPjNfThW49KJnJm0gPL2IITdn2xZ_Pp9i_vG8MKn3lHmr0VoYj-iJ9PHd1U4MFHQrAK9k7jsjMDqvMzOn3BjuSYlsHrbgVXp1klt3FsO",
            "phase": "",
            "lower": 4500,
            "short_name": "★ Skeleton Knife | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Skeleton Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 68px; h 48px; background-position -887.5px -89.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf0ebcZThQ6tCvq4iSqODxMajummJW4NFOhujT8om70FHnqkBqZWGiLICSelc6Mg3V_AO8x-nq1pC86JqcmnQyvSUk7X3azgv3309LA7AIOA",
            "phase": "",
            "lower": 4500,
            "short_name": "★ Butterfly Knife | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ Butterfly Knife | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 73px; h 47px; background-position -801px -449.5px; background-size 1016.5px 621.5px"
        }],
        "5000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYvr-pJxVh2uDNYy595NO6m7-HluXzNvXTl28Hv5co3bnE99yg2gC3qUBtZ2qicoKTJw83ZgzY-QO-yOnngMC0ot2XnnFgsbSN",
            "phase": "",
            "lower": 5000,
            "short_name": "Sticker | HellRaisers",
            "exterior": "Holo",
            "market_name": "Sticker | HellRaisers | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 60px; h 60.5px; background-position -254px -359.5px; background-size 1018px 616.5px"
        }, {
            "image": "/images/aksafari-hr.png",
            "phase": "",
            "lower": 5000,
            "short_name": "AK Safari Mesh | 4x Hellraisers Holo",
            "exterior": "Factory New",
            "market_name": "AK-47 | Safari Mesh 4x Hellraisers (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -432.5px -89.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszOeC9H_9mkhIWFg8j1OO-GqWlD6dN-teXI8oTht1i1uRQ5fWDwLYbAdVBqYVHRrwC2kO7rhpLq6J_IzXE2unFxs3-JmkG200ofZ-JxxavJKZiOt4k",
            "phase": "",
            "lower": 5000,
            "short_name": "StatTrak™ AK-47 | Fire Serpent",
            "exterior": "Factory New",
            "market_name": "StatTrak™ AK-47 | Fire Serpent",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -164px -480.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmm4mYmPnLNanekVRT5NB0tf7J_Jjwt1i9rBsoDDWiZtHAbFVtZVzY8wLskL3qjMC0vsmdm3Nr6Slz5nzczhy_004YauVph_LLHF6AR_sevt6vaXY",
            "phase": "",
            "lower": 5000,
            "short_name": "★ Sport Gloves | Amphibious",
            "exterior": "Factory New",
            "market_name": "★ Sport Gloves | Amphibious",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -505.5px -383.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO6nYeDg8j2P67UqWdY781lteXA54vwxlWw_EM-MW-hIIPHJwJqNVGGrwfswOe70Me-tJzAnyAyuCcit3jdnRepwUYbcIIuwIc",
            "phase": "",
            "lower": 5000,
            "short_name": "★ Sport Gloves | Superconductor",
            "exterior": "Factory New",
            "market_name": "★ Sport Gloves | Superconductor",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -503px -443px; background-size 1016.5px 621.5px"
        }],
        "5400": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FABz7PLfYQJF-dKxmomZqPv9NLPFqWdQ-sJ0xO-ZpY-n0AHt_0M6ZGygd9eQegE9YAzYrwDqx7y7jcTpvc7IwSdgsnI8pSGKcZwC8Qk",
            "phase": "",
            "lower": 5400,
            "short_name": "AWP | Gungnir",
            "exterior": "Factory New",
            "market_name": "AWP | Gungnir",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 89px; h 42px; background-position -348.5px -217px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv3--Y3nj1H6qBFvMWHyIo7Adw9raF6GrlK9lLi-jJO7tJ_JzyNh63F3sX_emUPkgQYMMLL2MDRAbQ",
            "phase": "",
            "lower": 5400,
            "short_name": "AWP | Dragon Lore",
            "exterior": "Factory New",
            "market_name": "AWP | Dragon Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -909.5px -0.5px; background-size 1018px 616.5px"
        }],
        "5600": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYuLuzIjho3P_HTjFD_tuz2oLSxqSsYe6Hwj8IupFzjL-V9NyniQ3g-UtkZ2r7LNKQcAQ7NFiF_FGggbC43DmLxxM",
            "phase": "",
            "lower": 5600,
            "short_name": "Sticker | Natus Vincere",
            "exterior": "Holo",
            "market_name": "Sticker | Natus Vincere | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 60.5px; h 61px; background-position -145px -540.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDLDYm2Rf5_p1g-jM-oLxm2umrhcDPzCkfML6Lld8Ng3O81G8lebmgZC-us_LwHI1vHYitCrelxOw1BpNaO1rgPCfQFuZAKFAFL7CWCTh-JuFUg",
            "phase": "",
            "lower": 5600,
            "short_name": "★ Specialist Gloves | Crimson Kimono",
            "exterior": "Factory New",
            "market_name": "★ Specialist Gloves | Crimson Kimono",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -517.5px -110px; background-size 1016.5px 621.5px"
        }, {
            "image": "/images/akredline-dignitas.png",
            "phase": "",
            "lower": 5600,
            "short_name": "AK Redline | 4x Dignitas Holo",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Redline 4x Dignitas (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -523.5px -89.5px; background-size 1018px 616.5px"
        }],
        "6000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOxhoWOmcj4OrzZglRd6dd2j6eSoNrzjgLm8kZoMm2nd4WRIVI_Nw3Sr1K3lOnv08Tuv8zKzXRruiYh-z-DyGOjExbS",
            "phase": "",
            "lower": 6000,
            "short_name": "★ Sport Gloves | Hedge Maze",
            "exterior": "Factory New",
            "market_name": "★ Sport Gloves | Hedge Maze",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -0.5px -417px; background-size 1018px 616.5px"
        }, {
            "image": "/images/stiletto-182.png",
            "phase": "",
            "lower": 6000,
            "short_name": "★ Stiletto Knife | Blue Gem",
            "exterior": "Field-Tested",
            "market_name": "★ Stiletto Knife | Case Hardened #182",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 80.5px; h 59px; background-position -166.5px -419px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1h3LAVbv6mxFABs3OXNYgJR_Nm1nYGHnuTgDL3Qkm5u5Mx2gv3--Y3nj1H68kBsa2mgJ4aVdldrYl6Bq1S8wbrngsDovM6cm3JnviYh53bVmxC00gYMMLKwQd_4eA",
            "phase": "",
            "lower": 6000,
            "short_name": "★ Specialist Gloves | Fade",
            "exterior": "Factory New",
            "market_name": "★ Specialist Gloves | Fade",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 57.5px; background-position -342px -260px; background-size 1016.5px 621.5px"
        }],
        "6500": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWdY781lteXA54vwxgG2rhFla2-hcYTGclBqYAnWrgXrx728hsC_up2fm3MyvnIl4nffnEGpwUYbLGuk_6Y",
            "phase": "",
            "lower": 6500,
            "short_name": "★ M9 Bayonet | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ M9 Bayonet | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -84px -102.5px; background-size 1016.5px 621.5px"
        }],
        "7000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYur6pKDho3P_HTjFD_tuz2oXaz6TyYOmElWhQsJQojL2S9t-l3gbs_0A4Z2HycNTGdVQ3YQyB-VKggbC4Lv0VwTc",
            "phase": "",
            "lower": 7000,
            "short_name": "Sticker | Team LDLC.com",
            "exterior": "Holo",
            "market_name": "Sticker | Team LDLC.com | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 64.5px; h 55px; background-position -787.5px -189.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYsrOiJQ500uD3eTJO4-O6lZKMkrn1Mr_QwDMFu5Ap2rnDoY6hi1K2-RY6YWD6ddTDdVA2YAmD_wLvwOzom9bi65HdQhdd",
            "phase": "",
            "lower": 7000,
            "short_name": "Sticker | Team Dignitas",
            "exterior": "Holo",
            "market_name": "Sticker | Team Dignitas | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60px; h 62.5px; background-position -712.5px -556.5px; background-size 1016.5px 621.5px"
        }, {
            "image": "/images/m9-601.png",
            "phase": "",
            "lower": 7000,
            "short_name": "★ M9 Bayonet | Blue Gem",
            "exterior": "Field-Tested",
            "market_name": "★ M9 Bayonet | Case Hardened #601",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 84px; h 64px; background-position -0.5px -0.5px; background-size 1016.5px 621.5px"
        }],
        "9000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwT09S5g4yCmfDLP7LWnn9u5MRjjeyP9tqhiQ2yqEo6Mmn3doPBcwZqZQrRr1O-we_sgMO5tZ_BzCFr6ycltmGdwULa1vGJFg",
            "phase": "",
            "lower": 9000,
            "short_name": "StatTrak™ M4A4 | Howl",
            "exterior": "Factory New",
            "market_name": "StatTrak™ M4A4 | Howl",
            "rarity": "Contraband",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 51.5px; background-position -259.5px -162px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYoLW9Lgpp3fzaTjVN4NOJmIGZkPK6NuzTzm9TscZ32uzCotmn0Aa1_UZrMjygLY6QcwU9MA6F_li3xu_v1oj84srlNTvhug",
            "phase": "",
            "lower": 9000,
            "short_name": "Sticker | Vox Eminor",
            "exterior": "Holo",
            "market_name": "Sticker | Vox Eminor | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 64.5px; h 59.5px; background-position -590px -324px; background-size 1016.5px 621.5px"
        }, {
            "image": "/images/akredline-ibp.png",
            "phase": "",
            "lower": 9000,
            "short_name": "AK Redline 4x IBP Holo",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Redline 4x IBP (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 89px; h 44.5px; background-position -90.5px -39px; background-size 1018px 616.5px"
        }],
        "10000": [{
            "image": "/images/karambit-902.png",
            "phase": "",
            "lower": 10000,
            "short_name": "★ Karambit | Blue Gem",
            "exterior": "Field-Tested",
            "market_name": "★ Karambit | Case Hardened #902",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 74.5px; h 54px; background-position -330px -189.5px; background-size 1018px 616.5px"
        }],
        "12000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu4MBwnPD--Y3nj1H68hE-NW_2JNPAdVNtYV_Q_wO6le7u1pS-7pWfzCFnvCEq7SyOnBzi0wYMMLK7E03aCQ",
            "phase": "",
            "lower": 12000,
            "short_name": "Souvenir AWP | Dragon Lore",
            "exterior": "Battle-Scarred",
            "market_name": "Souvenir AWP | Dragon Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -727.5px -0.5px; background-size 1018px 616.5px"
        }],
        "13000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DeXEl7NwdOtbagFABs3OXNYgJP48i5hoOSlPvxDLbYmH9u_Nd4i-fG-YnKhF2zowcDPzixc9OLJlQ-Y1uGrAC_x-fogZbq6M6dnyc3uyEgtyuJyhaxgh5LOOJsh6afS0LeWfKD9ED27A",
            "phase": "",
            "lower": 13000,
            "short_name": "★ Moto Gloves | Spearmint",
            "exterior": "Factory New",
            "market_name": "★ Moto Gloves | Spearmint",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 84.5px; h 60px; background-position -675.5px -484.5px; background-size 1018px 616.5px"
        }],
        "14000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYpL-kOAhu7PvHfTJ94N2kk4XFxPSnY-rXw28EuMF0j72Qpt2siQ3sqRJpNzr3d4XGJgE7Mw2C-1K9x_Cv28GjnGf3CQ",
            "phase": "",
            "lower": 14000,
            "short_name": "Sticker | Reason Gaming",
            "exterior": "Holo",
            "market_name": "Sticker | Reason Gaming | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 60px; h 60.5px; background-position -666px -495px; background-size 1016.5px 621.5px"
        }, {
            "image": "/images/ak661.png",
            "phase": "",
            "lower": 14000,
            "short_name": "AK | Blue Gem",
            "exterior": "Field-Tested",
            "market_name": "AK-47 | Scar Pattern",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -614.5px -89.5px; background-size 1018px 616.5px"
        }],
        "15000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eOmgZKbm_LLP7LWnn9u5MRjjeyPoNr0jQG1r0RtYzzzIo_DcgI-NVDWqQDvxLi-1p-5vsudync36HUm7WGdwUJKXesLsw",
            "phase": "",
            "lower": 15000,
            "short_name": "★ Sport Gloves | Pandora's Box",
            "exterior": "Factory New",
            "market_name": "★ Sport Gloves | Pandora's Box",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -420px -442px; background-size 1016.5px 621.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMyoD0mlOx5UM5ZWClcYCUdgU3Z1rQ_FK-xezngZO46MzOziQ1vSMmtCmIyxfkgx5SLrs4SgJFJKs",
            "phase": "",
            "lower": 15000,
            "short_name": "Souvenir AWP | Dragon Lore",
            "exterior": "Well-Worn",
            "market_name": "Souvenir AWP | Dragon Lore",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -85.5px -61.5px; background-size 1016.5px 621.5px"
        }],
        "16000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYv7iwMhdvxPbaTjVN4NOJmIGZkPK6au7TxjgA68Ek3e2VpNvx3Qzh8hZvYWulLNLDIw8-Y1vSrwDrwrq71Ij84soXoqT41g",
            "phase": "",
            "lower": 16000,
            "short_name": "Sticker | iBUYPOWER",
            "exterior": "Holo",
            "market_name": "Sticker | iBUYPOWER | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 62px; h 60px; background-position -834px -304.5px; background-size 1018px 616.5px"
        }, {
            "image": "/images/ak661-ibp.png",
            "phase": "",
            "lower": 16000,
            "short_name": "AK | Blue Gem 4x IBP Holo",
            "exterior": "Minimal Wear",
            "market_name": "AK-47 | Blue Gem 4x IBP (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -705.5px -89.5px; background-size 1018px 616.5px"
        }],
        "17000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAQ1JmMR1osbaqPQJz7ODYfi9W9eO0mJWOqOf9PbDummJW4NFOhujT8om72FC1_Bc_MD-ncYaRcAA2MFzS8ljvleq9g8W8vMzLyiNiuCRz433Zygv3308allD_ww",
            "phase": "",
            "lower": 17000,
            "short_name": "★ Sport Gloves | Vice",
            "exterior": "Factory New",
            "market_name": "★ Sport Gloves | Vice",
            "rarity": "Extraordinary",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -337px -437.5px; background-size 1016.5px 621.5px"
        }],
        "18000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DAX1R3LjtQurWzLhRfwP_BcjZ9_9K3n4WYnP76DKzZn39U18l4jeHVyoD0mlOx5RVqMmz3d4HEcVVoaFmFqQPrwb_ohJTu7p_Iy3Qx7HUl4inVmR21hE1SLrs4iE_5GvI",
            "phase": "",
            "lower": 18000,
            "short_name": "★ Driver Gloves | King Snake",
            "exterior": "Factory New",
            "market_name": "★ Driver Gloves | King Snake",
            "rarity": "Extraordinary",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 82px; h 58.5px; background-position -83.5px -419px; background-size 1018px 616.5px"
        }],
        "19000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5cB1g_zMyoD0mlOx5UM5ZWClcYCUdgU3Z1rQ_FK-xezngZO46MzOziQ1vSMmtCmIyxfkgx5SLrs4SgJFJKs",
            "phase": "",
            "lower": 19000,
            "short_name": "Souvenir AWP | Dragon Lore",
            "exterior": "Field-Tested",
            "market_name": "Souvenir AWP | Dragon Lore",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -85.5px -61.5px; background-size 1016.5px 621.5px"
        }],
        "20000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf3qr3czxb49KzgL-DjsjjNrnCqWdY781lteXA54vwxgG2rhFla2-hcYTGclBqYAnWrgXrx728hsC_up2fm3MyvnIl4nffnEGpwUYbLGuk_6Y",
            "phase": "",
            "lower": 20000,
            "short_name": "★ StatTrak™ M9 Bayonet | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ M9 Bayonet | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 83.5px; h 58.5px; background-position -84px -102.5px; background-size 1016.5px 621.5px"
        }],
        "22000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJnJm0gPL2IITdn2xZ_Pp9i_vG8MKj2Qbl_EdlZziiddOXdAY2YAvT-wW2xrjugJG_tcvNyyBn6SEm4XuMgVXp1n8qZn5H",
            "phase": "",
            "lower": 22000,
            "short_name": "★ StatTrak™ Karambit | Crimson Web",
            "exterior": "Factory New",
            "market_name": "★ StatTrak™ Karambit | Crimson Web",
            "rarity": "Covert",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 72.5px; h 50.5px; background-position -906.5px -180.5px; background-size 1016.5px 621.5px"
        }],
        "23000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQV_bRvCiwMbQVg8kdFAYorOxKglf2_zEfgJO7c6xkc6JkfL1YOuDwDgCvJcn3L_ApN2g2APtrhVpNjuiIYacdg9rM1uD-VG_366x0vI0nNfi",
            "phase": "",
            "lower": 23000,
            "short_name": "Sticker | Titan",
            "exterior": "Holo",
            "market_name": "Sticker | Titan | Katowice 2014",
            "rarity": "Remarkable",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 63.5px; h 62px; background-position -778px -548px; background-size 1018px 616.5px"
        }],
        "24000": [{
            "image": "/images/akrebel-vox.png",
            "phase": "",
            "lower": 24000,
            "short_name": "StatTrak™ AK | Wasteland Rebel 4x Vox Holo",
            "exterior": "Factory New",
            "market_name": "StatTrak™ AK-47 | Wasteland Rebel 4x Vox (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -796.5px -89.5px; background-size 1018px 616.5px"
        }],
        "25000": [{
            "image": "/images/ak661-ibp.png",
            "phase": "",
            "lower": 25000,
            "short_name": "StatTrak™ AK | Blue Gem 4x IBP Holo",
            "exterior": "Minimal Wear",
            "market_name": "StatTrak™ AK-47 | Blue Gem 4x IBP (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -705.5px -89.5px; background-size 1018px 616.5px"
        }],
        "35000": [{
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv3--Y3nj1H6qBFvMWHyIo7Adw9raF6GrlK9lLi-jJO7tJ_JzyNh63F3sX_emUPkgQYMMLL2MDRAbQ",
            "phase": "",
            "lower": 35000,
            "short_name": "Lowest Float Dragon Lore 0.00001337",
            "exterior": "Factory New",
            "market_name": "AWP Dragon Lore 0.0000133742069",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -909.5px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17P7NdTRH-t26q4SZlvD7PYTQgXtu5Mx2gv3--Y3nj1H6qBFvMWHyIo7Adw9raF6GrlK9lLi-jJO7tJ_JzyNh63F3sX_emUPkgQYMMLL2MDRAbQ",
            "phase": "",
            "lower": 35000,
            "short_name": "Souvenir AWP | Dragon Lore",
            "exterior": "Minimal Wear",
            "market_name": "Souvenir AWP | Dragon Lore",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 40px; background-position -909.5px -0.5px; background-size 1018px 616.5px"
        }],
        "45000": [{
            "image": "/images/aklotus-reason.png",
            "phase": "",
            "lower": 45000,
            "short_name": "AK | Wild Lotus 4x Reason Gaming Holo",
            "exterior": "Factory New",
            "market_name": "AK-47 | Wild Lotus 4x Reason Gaming (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -449.5px -61.5px; background-size 1016.5px 621.5px"
        }],
        "60000": [{
            "image": "/images/awpdlore-ibp.png",
            "phase": "",
            "lower": 60000,
            "short_name": "AWP | Dragon Lore 4x IBP Holo",
            "exterior": "Factory New",
            "market_name": "AWP | Dragon Lore 4x IBP (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 37.5px; background-position -0.5px -0.5px; background-size 1018px 616.5px"
        }, {
            "image": "/images/awpmedusa-titan.png",
            "phase": "",
            "lower": 60000,
            "short_name": "AWP | Medusa 4x Titan Holo",
            "exterior": "Factory New",
            "market_name": "AWP | Medusa 4x Titan (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 37.5px; background-position -91.5px -0.5px; background-size 1018px 616.5px"
        }],
        "70000": [{
            "image": "/images/ak661-titan.png",
            "phase": "",
            "lower": 70000,
            "short_name": "AK | Blue Gem 4x Titan Holo",
            "exterior": "Factory New",
            "market_name": "AK-47 | Case Hardened #661 4x Titan (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-2@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -350.5px -168.5px; background-size 1016.5px 621.5px"
        }],
        "90000": [{
            "image": "/images/ak661-ibp.png",
            "phase": "",
            "lower": 90000,
            "short_name": "AK | Blue Gem 4x IBP Holo",
            "exterior": "Factory New",
            "market_name": "AK-47 | Case Hardened #661 4x IBP (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 47.5px; background-position -705.5px -89.5px; background-size 1018px 616.5px"
        }],
        "95000": [{
            "image": "/images/karambit-387.png",
            "phase": "",
            "lower": 95000,
            "short_name": "★ Karambit | Blue Gem",
            "exterior": "Factory New",
            "market_name": "★ Karambit | Case Hardened #387",
            "rarity": "Covert",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 74.5px; h 54px; background-position -405.5px -189.5px; background-size 1018px 616.5px"
        }, {
            "image": "/images/awpdlore-titan.png",
            "phase": "",
            "lower": 95000,
            "short_name": "Souv AWP | Dragon Lore 4x Titan Holo",
            "exterior": "Factory New",
            "market_name": "Souvenir AWP | Dragon Lore 4x Titan (Holo)",
            "rarity": "Collection",
            "sheetRetina": "100-1@2x.png",
            "styleRetina": "w 90px; h 38px; background-position -182.5px -0.5px; background-size 1018px 616.5px"
        }]
    };;
    const skinKeys = Object.keys(_$skins_1).map(Number).sort(_$compare_34)
    var _$selectSkin_84 = function selectSkin({
        profit, x, i
    }) {
        var k = skinKeys.findIndex(k => k > profit)
        if (k === -1)
            k = skinKeys.length - 1
        if (k > 0)
            k -= 1
        const bucket = _$skins_1[skinKeys[k].toString()]
        const skin = bucket[(x * bucket.length + i | 0) % bucket.length]
        if (skin.lower >= 5000)
            skin.rarity = 'Collection'
        return skin
    };

    function rarity(r) {
        switch (r) {
            case 'Contraband':
                return '#FFB963'
            case 'Covert':
            case 'Extraordinary':
                return '#FF6566'
            case 'Classified':
            case 'Exotic':
                return '#FF8FD4'
            case 'Restricted':
            case 'Remarkable':
                return '#B088FF'
            case 'Mil-Spec Grade':
            case 'High Grade':
                return '#6F91FF'
            case 'Industrial Grade':
                return '#69D0FC'
            case 'Collection':
                return '#3c3637'
            case 'Base Grade':
            case 'Consumer Grade':
            default:
                return '#8D8EA0'
        }
    }

    function rarityHighlights(r) {
        if (r === 'Collection') {
            return _$sinUmd_43 `
      border: double 4px transparent;
      border-radius: 22px;
      background-image: linear-gradient(0deg, rgb(60, 54, 55), rgb(134, 104, 75)), linear-gradient(160deg, rgb(191, 149, 63), rgb(252, 246, 186), rgb(179, 135, 40), rgb(251, 245, 183), rgb(170, 119, 28));
      background-origin: padding-box, border-box;
      background-clip: padding-box, border-box;

      background-size: 100% 100%, 100% 200%;
      background-position: 0 0, 0 100%;

      animation 2s infinite alternate {
        to {
          background-position: 0 0, 0 0;
        }
      }
    `
        }
        return _$sinUmd_43 `
    border-color: ${rarity(r)};
    background-image: linear-gradient(0, ${rarity(r) + '3d'}, ${rarity(r) + '11'});
  `
    }
    var _$csgoUtils_17 = {
        rarity,
        rarityHighlights
    };;;;
    const {
        rarity: __rarity_80
    } = _$csgoUtils_17
    const __betItem_80 = ({
        wager, XRoulette
    }) => {
        const skin = wager && wager.win ? _$selectSkin_84({
            x: XRoulette.r,
            i: XRoulette.curI,
            profit: wager.profit / 100
        }) : null
        return () => _$sinUmd_43 `div.h-50.rounded.bg-gray-400.mb-20.p-15.flex.flex-row.align-center.text-gray-100.font-body.text-sm.font-medium
  mb 2px
  ${skin && skin.rarity === 'Collection' && `
        border: double 1 px transparent;
        background - image: linear - gradient(0 deg, rgb(98, 80, 66), rgb(98, 80, 66)), linear - gradient(160 deg, rgb(191, 149, 63), rgb(252, 246, 186), rgb(179, 135, 40), rgb(251, 245, 183), rgb(170, 119, 28));
        background - origin: padding - box, border - box;
        background - clip: padding - box, border - box;

        background - size: 100 % 100 % , 100 % 200 % ;
        background - position: 0 0, 0 100 % ;

        animation 2 s infinite alternate {
            to {
                background - position: 0 0, 0 0;
            }
        }
        `}
` ({
            style: wager == null ? '' : [skin == null && wager.you ? 'background-color: #3F4558;' : '', wager.win ? 'background-color: ' + __rarity_80(skin.rarity) + '33' : '', wager.win === false ? 'opacity: 0.5' : ''].join('')
        }, wager == null ? '' : __bet_80(wager, true), skin && showSkin(skin))
    }
    const __bet_80 = (wager, row = true) => [_$avatar_2 `.mr-10` ({
        src: wager.avatar || 'images/default-avatar.svg'
    }), _$sinUmd_43 `span.displayName.truncate.flex-1` ({}, [wager.displayName, wager.flags && wager.flags.includes('V') && _$icons_8.verified `.text-blue.inline-block;w 12;h 12;mb -1;ml 4`]), _$sinUmd_43 `span.multiplier.flex.ml-auto.whitespace-no-wrap.ml-10.font-numeric
  ` ({}, 'x ' + (wager.multiplier / 100).toFixed(2)), _$sinUmd_43 `span.wager.align-center.flex.flex-row.ml-5.mr-10` ([_$icons_8.coins `.text-yellow.inline-block
      h 12
      mr 8
      transform: scale(0.6315789474);
    `, _$sinUmd_43 `span.flex-1.font-numeric
    ` ({
        class: wager.win ? 'text-green' : ''
    }, ((wager.win ? wager.profit : wager.amount) / 100).toFixed(2))])]

    function showSkin(d) {
        return _$sinUmd_43 `.flex.align-center;margin: -15px; transform: scale(0.57)` (_$sinUmd_43 `.my-auto;filter: drop-shadow(0 6px 14px #1f1f1f);${d.styleRetina}` ({
            style: `background-image: url(/images/${d.sheetRetina});`
        }))
    }
    var _$csgoLeaderboard_80 = (wagers, XRoulette) => [_$sinUmd_43 `p.uppercase.text-gray-200.font-body.font-bold.text-sm.mb-10` ('Highest'), __betItem_80({
        wager: wagers.length ? wagers[0] : null,
        XRoulette
    }), _$sinUmd_43 `p.uppercase.text-gray-200.font-body.font-bold.text-sm.mb-10.mt-20` ('All'), _$sinUmd_43 `ol.overflow-y-scroll.flex-1` (wagers.slice(1).map(wager => __betItem_80({
        wager,
        XRoulette
    }))), _$sinUmd_43 `footer.font-body.pt-15.font-medium-text.text-base.text-gray-200` ([_$sinUmd_43 `span.mr-20` (['Playing: ', _$sinUmd_43 `span.text-gray-100.font-numeric` (new Set(wagers.map(w => w.ref)).size)]), _$sinUmd_43 `span` (['Coins: ', _$sinUmd_43 `span.text-gray-100.font-numeric` ((wagers.reduce((s, w) => s + w.amount, 0) / 100).toFixed(2))])])];;
    var _$wagerTile_88 = _$sinUmd_43((wager) => _$sinUmd_43 `div.rounded.bg-gray-500.h-120.overflow-hidden
  display: grid;
  grid-template-areas:
    'content chance'
    'payout payout';
  grid-template-rows: auto 30px;
  grid-template-columns: auto 50px;
` ({
        style: `opacity: ${wager.win === false ? '0.5' : '1'};`
    }, [_$sinUmd_43 `div.px-20.py-15
    grid-area content
  ` ([_$sinUmd_43 `span.text-sm.text-gray-200.font-bold.mr-5.uppercase` ('Bet '), _$sinUmd_43 `span.text-base.text-gray-100.font-medium.font-numeric` ('x ' + (wager.multiplier / 100).toFixed(2)), _$sinUmd_43 `br`, _$sinUmd_43 `div.inline-block.bg-gray-400.font-body.text-sm.text-gray-200.font-medium.leading-none.mt-10
      padding 3px 15px 2px 12px
      background: #1F2330;
      border-radius: 99px;
    ` ([_$icons_8.coins `.text-yellow.inline-block.font-numeric
        height: 22px;
        transform: scale(0.7);
        padding-right 8px
        vertical-align middle
      `, (wager.amount / 100).toFixed(2)])]), _$sinUmd_43 `div.font-body.text-xs.text-gray-100.font-medium.text-center.font-numeric
    line-height 90px
    grid-area chance
  ` ({
        style: `background: linear-gradient(to bottom, var(--color-gray-600), var(--color-gray-600) ${100 - chance(wager.multiplier) * 100}%, #357521 ${100 - chance(wager.multiplier) * 100}%, #357521);`
    }, formatChance(wager.multiplier)), _$sinUmd_43 `footer.bg-gray-400.font-body.text-sm.text-gray-200.font-medium.align-center.px-20
    line-height 30px
    grid-area payout
  ` (['Payout: ', _$sinUmd_43 `span.text-gray-100.font-numeric` ((Math.round((wager.multiplier * wager.amount) / 100) / 100).toFixed(2))])]))

    function formatChance(multiplier) {
        const c = chance(multiplier) * 100
        if (c < 0.001)
            return '< 0.001%'
        if (c < 10)
            return c.toFixed(3) + '%'
        return c.toPrecision(4) + '%'
    }

    function chance(multiplier) {
        return 95 / multiplier
    };
    var _$fastText_6 = fn => _$sinUmd_43((attrs) => _$sinUmd_43 `span` ({
        life(node) {
                var frame = window.requestAnimationFrame(update)
                var n = node.childNodes[0]

                function update() {
                    n.textContent = fn()
                    frame = window.requestAnimationFrame(update)
                }
                return () => {
                    window.cancelAnimationFrame(frame)
                }
            },
            ...attrs
    }, fn()))
    var _$howToPlay_81 = {};;
    const {
        buttonGreen: __buttonGreen_81
    } = _$button_4;
    const HowToPlay = _$howToPlay_81 = {
        show: false,
        view: () => HowToPlay.show !== true ? '' : _$modal_10({
            className: 'py-50 px-80',
            onclose() {
                HowToPlay.show = false
            }
        }, [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-50` ('How to play X-Roulette'), _$sinUmd_43 `.steps.flex.flex-row` ([_$sinUmd_43 `.m-20.text-center.w-200` ([_$sinUmd_43 `img.mb-20` ({
            src: 'images/how-to-play-step-1.svg'
        }), _$sinUmd_43 `p.font-body.leading-normal.text-base.text-gray-200` ('Pick a multiplier between 1.01 and 1,000,000.00')]), _$sinUmd_43 `.m-20.text-center.w-200` ([_$sinUmd_43 `img.mb-20` ({
            src: 'images/how-to-play-step-2.svg'
        }), _$sinUmd_43 `p.font-body.leading-normal.text-base.text-gray-200` ('Place one or more coins with the amount of your choice.')]), _$sinUmd_43 `.m-20.text-center.w-200` ([_$sinUmd_43 `img.mb-20` ({
            src: 'images/how-to-play-step-3.svg'
        }), _$sinUmd_43 `p.font-body.leading-normal.text-base.text-gray-200` ('If the result is lower than your multiplier, you lose.')]), _$sinUmd_43 `.m-20.text-center.w-200` ([_$sinUmd_43 `img.mb-20` ({
            src: 'images/how-to-play-step-4.svg'
        }), _$sinUmd_43 `p.font-body.leading-normal.text-base.text-gray-200` ('If the result is higher than your multiplier, your coin amount is multiplied by your guess.')])]), __buttonGreen_81.large `.w-200.uppercase.mt-20` ({
            onclick() {
                HowToPlay.show = false
            }
        }, 'Got it')])
    };
    var _$toggle_12 = _$sinUmd_43(({
        id, ...attrs
    }) => _$sinUmd_43 `; position relative; d inline-block
    input:checked + label::before {
      bc #4CC914
    }

    input:checked + label::after {
      left 18
    }
  ` ([_$sinUmd_43 `input; d none` ({
        type: 'checkbox',
        id,
        ...attrs
    }), _$sinUmd_43 `label.switch-label; d block; w 32; h 16; br 8; clip rect(0 0 0 0); text-indent -150%; c transparent; user-select none;
    ::before, ::after {
      d block
      position absolute
      cursor pointer
      content ""
    }

    ::before {
      w 100%
      h 100%
      bc #464C5F
      br 9999em
      transition background-color 250ms ease
    }

    ::after {
      t 2
      l 2
      w 12
      h 12
      br 50%
      bc #141722
      transition left 250ms ease
    }
  ` ({
        for: id
    })]))
    "use strict"

    function compileSearch(funcName, predicate, reversed, extraArgs, earlyOut) {
        var code = ["function ", funcName, "(a,l,h,", extraArgs.join(","), "){", earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"), ";while(l<=h){var m=(l+h)>>>1,x=a[m]"]
        if (earlyOut) {
            if (predicate.indexOf("c") < 0) {
                code.push(";if(x===y){return m}else if(x<=y){")
            } else {
                code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){")
            }
        } else {
            code.push(";if(", predicate, "){i=m;")
        }
        if (reversed) {
            code.push("l=m+1}else{h=m-1}")
        } else {
            code.push("h=m-1}else{l=m+1}")
        }
        code.push("}")
        if (earlyOut) {
            code.push("return -1};")
        } else {
            code.push("return i};")
        }
        return code.join("")
    }

    function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
        var result = new Function([compileSearch("A", "x" + predicate + "y", reversed, ["y"], earlyOut), compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], earlyOut), "function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(typeof(c)==='function'){\
return P(a,(l===void 0)?0:l|0,(h===void 0)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===void 0)?0:c|0,(l===void 0)?a.length-1:l|0,y)\
}}\
return dispatchBsearch", suffix].join(""))
        return result()
    }
    var _$searchBounds_32 = {
        ge: compileBoundsSearch(">=", false, "GE"),
        gt: compileBoundsSearch(">", false, "GT"),
        lt: compileBoundsSearch("<", true, "LT"),
        le: compileBoundsSearch("<=", true, "LE"),
        eq: compileBoundsSearch("-", true, "EQ", true)
    };;

    function cmp(a, b) {
        return _$compare_34(a.multiplier, b.multiplier)
    }
    class WagersCumulative extends Array {
        constructor(elements = []) {
            super()
            for (var i = 0; i < elements.length; i++) {
                this.set(elements[i])
            }
        }
        set(wager) {
            var idx = _$searchBounds_32.le(this, wager, cmp)
            if (idx < 0) {
                idx = 0
                this.unshift({
                    multiplier: wager.multiplier,
                    amount: wager.amount,
                    profit: wager.profit
                })
                for (let i = idx + 1; i < this.length; i++) {
                    this[i].amount += wager.amount
                    this[i].profit += wager.profit
                }
                return this
            }
            if (wager.multiplier !== this[idx].multiplier) {
                this.splice(idx + 1, 0, {
                    multiplier: wager.multiplier,
                    amount: this[idx].amount + wager.amount,
                    profit: this[idx].profit + wager.profit
                })
                idx++
                for (let i = idx + 1; i < this.length; i++) {
                    this[i].amount += wager.amount
                    this[i].profit += wager.profit
                }
                return this
            }
            const deltaAmount = wager.amount - (this[idx].amount - (idx === 0 ? 0 : this[idx - 1].amount))
            const deltaProfit = wager.profit - (this[idx].profit - (idx === 0 ? 0 : this[idx - 1].profit))
            for (let i = idx; i < this.length; i++) {
                this[i].amount += deltaAmount
                this[i].profit += deltaProfit
            }
            return this
        }
        cumsum(multiplier) {
            const idx = _$searchBounds_32.le(this, {
                multiplier
            }, cmp)
            if (idx < 0)
                return null
            return this[idx]
        }
    }
    var _$WagersCumulative_20 = WagersCumulative
    const compareWin = function(a, b) {
        if (a.win == null)
            return 0
        if (a.win === true && b.win === true)
            return 0
        if (b.win === false && a.win === false)
            return 0
        if (b.win === false && a.win === true)
            return -1
        return 1
    }
    const compareMultiplier = function(a, b) {
        if (a.multiplier === b.multiplier)
            return 0
        if (a.multiplier > b.multiplier)
            return -1
        return 1
    }
    const compareAmount = function(a, b) {
        if (a.amount === b.amount)
            return 0
        if (a.amount > b.amount)
            return -1
        return 1
    }
    var _$wagerSort_19 = function(l, r) {
        const w = compareWin(l, r)
        if (w !== 0)
            return w
        const a = compareAmount(l, r)
        if (a !== 0)
            return a
        const m = compareMultiplier(l, r)
        return m
    }
    var _$xRoulette_29 = {};;;;;;;
    const ROLL_TIME_MS = 5000
    const WAIT_TIME_MS = 20000
    const RESULT_TIME_MS = 2500
    const ELMS = 31
    _$xRoulette_29 = function XRoulette(socket) {
        const state = {
            socket,
            shouldAnimate: true,
                howToPlay: false,
                _csgoMode: null,
                get csgoMode() {
                    if (state._csgoMode == null)
                        state._csgoMode = window.localStorage.getItem('csgoMode') !== 'false'
                    return state._csgoMode
                },
                set csgoMode(v) {
                    state._csgoMode = v
                    window.localStorage.setItem('csgoMode', v.toString())
                },
                winListeners: [],
                listenWin(listener) {
                    state.winListeners.push(listener)
                    return function() {
                        var idx = state.winListeners.indexOf(listener)
                        if (idx < 0)
                            return
                        state.winListeners.splice(idx, 1)
                    }
                },
                openListeners: [],
                listenOpen(listener) {
                    state.openListeners.push(listener)
                    return function() {
                        var idx = state.openListeners.indexOf(listener)
                        if (idx < 0)
                            return
                        state.openListeners.splice(idx, 1)
                    }
                },
                drift: new _$CappedArray_16(11),
                ping: new _$CappedArray_16(11),
                rollsInView: new _$CappedArray_16(ELMS * 3),
                previousResults: new _$CappedArray_16(16),
                status: null,
                wagers: new WagerList(),
                wagersCumsum: new _$WagersCumulative_20(),
                rolledAt: 0,
                round: {
                    result: 0,
                    hash: '',
                    next: [],
                    currentTimestamp: 0,
                    openTimestamp: 0,
                    closeTimestamp: 0
                },
                rolling: false,
                get timeToRoll() {
                    return Math.max(0, state.round.closeTimestamp - now())
                },
                get waitProgress() {
                    return __clamp_29((WAIT_TIME_MS - state.timeToRoll) / (WAIT_TIME_MS))
                },
                get timeToResult() {
                    return (state.rolledAt + ROLL_TIME_MS) - now()
                },
                get rollProgress() {
                    return 1 - __clamp_29((state.timeToResult) / (ROLL_TIME_MS))
                },
                offset: 0,
                idx: -ELMS,
                i: 0,
                timer: null,
                r: 0
        }
        state.drift.delta = 0
        socket.listen('x-roulette-history', (rounds) => {
            state.previousResults = new _$CappedArray_16(10)
            state.previousResults.push(...rounds.map(r => r.result).reverse())
            state.rollsInView = new _$CappedArray_16(ELMS * 3)
            const tiles = [...rounds.flatMap(round => [{
                key: 'roll-' + state.i++,
                multiplier: round.result,
                result: true,
                x: round.x,
                i: state.i
            }, ...round.next.map(multiplier => ({
                key: 'roll-' + state.i++,
                multiplier,
                x: round.x,
                i: state.i
            }))])]
            state.idx = 0
            state.offset = state.rollsInView.push(...tiles) - (tiles.length - ELMS)
            state.r = 0
            if (rounds.length) {
                state.round = rounds[rounds.length - 1]
                state.rolledAt = state.round.closeTimestamp
            }
        })
        socket.listen('x-roulette-wagers-history', (wagers) => {
            state.wagers = new WagerList()
            state.wagersCumsum = new _$WagersCumulative_20()
            wagers.forEach(w => {
                state.wagers.push(w)
                if (w.you)
                    state.wagersCumsum.set(w)
            })
            _$sinUmd_43.redraw()
        })
        socket.listen('x-roulette-wagers', (wager) => {
            state.wagers.push(wager)
            if (wager.you)
                state.wagersCumsum.set(wager)
            _$sinUmd_43.redraw()
        })
        setInterval(function() {
            const sent = Date.now()
            socket.send('sync', '', function(ch, server) {
                const recv = Date.now()
                const ping = (recv - sent) / 2
                const drift = recv - server
                state.ping.push(ping)
                state.drift.push(drift + ping)
                const driftStats = stats(state.drift)
                const pingStats = stats(state.ping)
                if (window.debug)
                    console.log('Ping', pingStats.median, 'Drift', driftStats.median)
                state.drift.delta = driftStats.median
            }, true)
        }, 2500)

        function stats(list) {
            const avg = list.reduce((s, n) => s + n, 0) / list.length
            const stdev = Math.sqrt(list.map(n => Math.pow(n - avg, 2)).reduce((s, n) => s + n, 0) / list.length)
            const valid = list.filter((n) => {
                return n > avg - stdev && n < avg + stdev
            }).sort(_$compare_34)
            const median = valid[valid.length / 2 | 0] || list[0]
            return {
                avg,
                stdev,
                median
            }
        }
        socket.listen('x-roulette', (round) => {
            const roundI = state.i++
                var newTiles = [{
                    key: 'roll-' + roundI,
                    multiplier: round.result,
                    result: true,
                    x: round.x,
                    i: roundI
                }, ...round.next.map(multiplier => ({
                    key: 'roll-' + state.i++,
                    multiplier,
                    x: round.x,
                    i: state.i
                }))]
            state.idx += newTiles.length
            state.offset += state.rollsInView.push(...newTiles)
            state.r = round.x
            state.curI = roundI
            state.status = 'rolling'
            state.rolledAt = state.round.closeTimestamp
            clearTimeout(state.timer)
            state.timer = timerAt(() => {
                const win = state.wagersCumsum.cumsum(Math.round(round.result * 100))
                state.status = win != null ? 'win' : 'loss'
                if (win != null) {
                    for (var i = 0; i < state.winListeners.length; i++)
                        state.winListeners[i]({
                            x: round.x,
                            i: roundI,
                            profit: win.profit
                        })
                }
                state.wagers.forEach(w => {
                    w.win = w.multiplier <= round.result * 100
                })
                state.wagers.sort(_$wagerSort_19)
                state.round = round
                state.previousResults.unshift(round.result)
                _$sinUmd_43.redraw()
                state.timer = timerAt(() => {
                    state.status = 'waiting'
                    const previousWagers = state.wagers.filter(w => w.you)
                    state.wagers = new WagerList()
                    state.wagersCumsum = new _$WagersCumulative_20()
                    for (var i = 0; i < state.openListeners.length; i++)
                        state.openListeners[i](previousWagers)
                    _$sinUmd_43.redraw()
                    state.timer = timerAt(() => {
                        _$sinUmd_43.redraw()
                    }, round.closeTimestamp)
                }, round.openTimestamp)
            }, state.round.closeTimestamp + ROLL_TIME_MS)
            _$sinUmd_43.redraw()
        })
        document.addEventListener('visibilitychange', (e) => {
            _$sinUmd_43.redraw.sync()
        })
        return state

        function now() {
            return Date.now() - state.drift.delta
        }

        function timerAt(fn, ts) {
            var delta = ts - now()
            if (delta <= 0)
                return fn()
            return setTimeout(fn, delta)
        }
    }
    _$xRoulette_29.previousRounds = []
    _$xRoulette_29.nonces = ("0000000000000000000cb464f3754abe8fc939728f34e173a8d259e4ef0ab37e,00000000000000000006d5e0870fcbd52c44e4f991fee97b2e849e2a37c8de3a").split(',').map(n => n.slice(-48))
    _$xRoulette_29.loadPreviousRounds = async() => {
        _$xRoulette_29.previousRounds = await _$sinUmd_43.request({
            method: 'GET',
            url: "https://api.rollbit.com" + '/x-roulette/rounds'
        })
    }

    function __clamp_29(n) {
        if (n > 1)
            return 1
        if (n < 0)
            return 0
        return n
    };
    class WagerList extends Array {
        push(wager) {
            if (_$auth_21.profile)
                wager.you = _$auth_21.profile.ref === wager.ref
            const w = super.find(w => w.multiplier === wager.multiplier && w.ref === wager.ref)
            if (w == null) {
                super.push(wager)
                super.sort(_$wagerSort_19)
                return this.length
            }
            w.amount = Math.max(wager.amount, w.amount)
            w.profit = Math.max(wager.profit, w.profit)
            super.sort(_$wagerSort_19)
            return this.length
        }
    }
    var _$domOnce_18 = function(target, type, listener, useCapture) {
        target.addEventListener(type, onceHandler, useCapture)
        return cleanup

        function cleanup() {
            target.removeEventListener(type, onceHandler)
        }

        function onceHandler(e) {
            cleanup()
            listener.apply(this, arguments)
        }
    };;;
    const {
        rarityHighlights: __rarityHighlights_89
    } = _$csgoUtils_17
    var _$winModal_89 = _$sinUmd_43(({
        amount, d, onclose
    }) => _$sinUmd_43 `.flex.flex-col.items-center.absolute.m-auto.inset-0.z-20.w-260.h-330.bg-gray-600.p-10
  br 12

  o 1
  top 3%
  box-shadow:
    0 3px 0 0 #212637,
    0 20px 40px 0 rgba(0,0,0,0.40),
    inset 0 1px 0 0 #383E51;

  animation 250ms ease-in {
    from {
      o 0
      top -3%
    }

    50% {
      o 0
      top -3%
    }
  }
` ({
        life() {
            const onclick = _$domOnce_18(window, 'click', function() {
                onclose()
            })

            function cleanup() {
                onclick()
            }
            return cleanup
        }
    }, [__rarityHighlights_89(d.rarity)
        `.w-240.h-260.flex.flex-col.items-center.p-20; br 10` ([_$sinUmd_43 `span.uppercase.text-gray-200.text-xs.font-bold.mb-10` (d.exterior), _$sinUmd_43 `span.text-gray-100.text-base.font-medium.text-center` (d.market_name), _$sinUmd_43 `img.my-auto.w-160;filter: drop-shadow(0 6px 14px #1f1f1f);` ({
            src: d.image
        }), _$sinUmd_43 `div.wager.flex.items-center.flex-row.justify-end.mt-auto.h-20` ([_$icons_8.coins({
            className: 'text-yellow',
            style: 'transform: scale(0.7); margin-right: 4px'
        }), _$sinUmd_43 `span.text-base.font-medium.text-gray-100` ((amount / 100).toFixed(2))])]), _$sinUmd_43 `p.my-auto.font-medium.text-base.text-gray-200` ('Your balance has been credited')
    ]));;;;
    const {
        buttonYellow: __buttonYellow_87,
        buttonFlat: __buttonFlat_87
    } = _$button_4;;;

    function allowedKeys(e) {
        return e.metaKey || ['Tab', 'Enter', 'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key) || /[0-9.]/.test(e.key)
    }
    var _$wagerForm_87 = ({
        XRoulette
    }) => _$sinUmd_43(() => {
        const WagerForm = {
            get canPlay() {
                return _$auth_21.profile && _$auth_21.profile.active === true
            },
            value: 0,
            multiplier: 1.01,
            autobet: false,
            fixupValue() {
                if (typeof WagerForm.value === 'string')
                    WagerForm.value = parseFloat(WagerForm.value)
                if (Number.isNaN(WagerForm.value))
                    WagerForm.value = 0
                WagerForm.value = clamp(0, 1e9, Math.round(WagerForm.value * 100) / 100)
                wagerError = ''
            },
            fixupMultiplier() {
                if (typeof WagerForm.multiplier === 'string')
                    WagerForm.multiplier = parseFloat(WagerForm.multiplier)
                if (Number.isNaN(WagerForm.multiplier))
                    WagerForm.multiplier = 1.01
                WagerForm.multiplier = clamp(1.01, 1e6, Math.round(WagerForm.multiplier * 100) / 100)
                multiplierError = ''
            },
            increment(n, base) {
                WagerForm.value = clamp(0, _$balance_22.balance / 100, Math.round((WagerForm.value * base + n) * 100) / (100 * base))
            },
            multiply(x) {
                WagerForm.value = clamp(0, _$balance_22.balance / 100, Math.round(WagerForm.value * Math.max(x, 0) * 100) / 100)
            }
        }
        var multiplierError = ''
        var wagerError = ''
        var inflight = 0
        XRoulette.listenWin(() => {
            inflight = 0
        })

        function wager({
            multiplier, wager
        }) {
            if (typeof wager !== 'number')
                wager = parseFloat(wager)
            if (typeof multiplier !== 'number')
                multiplier = parseFloat(multiplier)
            if (Number.isNaN(wager))
                return wagerError = 'Invalid wager'
            if (Number.isNaN(multiplier))
                return multiplierError = 'Invalid multiplier'
            if (multiplier < 1.01)
                return multiplierError = 'Multiplier too low'
            if (multiplier > 1e6)
                return multiplierError = 'Multiplier too high'
            if (wager < 0.01)
                return wagerError = 'Wagered amount too low'
            if (wager > _$balance_22.balance)
                return wagerError = 'Wagered amount exceeds balance'
            const potentialWin = XRoulette.wagersCumsum.cumsum(1e6)
            if (((potentialWin ? potentialWin.profit : 0) + wager * multiplier * 100 + inflight) > 10000000)
                return multiplierError = 'Your maximum win can’t exceed 100,000 coins'
            wagerError = ''
            multiplierError = ''
            _$balance_22.balance -= Math.round(wager * 100)
            if (_$balance_22.balance < 0) {
                _$balance_22.balance += Math.round(wager * 100)
                return wagerError = 'Wagered amount exceeds balance'
            }
            inflight += Math.round(multiplier + wager * 100)
            var completed = XRoulette.socket.send('x-roulette', {
                round: XRoulette.round.hash.slice(0, 8),
                multiplier: Math.round(multiplier * 100),
                amount: Math.round(wager * 100)
            }, function(ch, r) {
                inflight -= Math.round(multiplier + wager * 100)
                if (r.error) {
                    _$balance_22.balance += Math.round(wager * 100)
                }
                _$sinUmd_43.redraw()
            }, true)
            if (completed === false) {
                inflight -= Math.round(multiplier + wager * 100)
                _$balance_22.balance += Math.round(wager * 100)
                return wagerError = 'Lost connection'
            }
        }

        function clamp(min, max, v) {
            v = Math.abs(v)
            if (v > max)
                return max
            if (v < min)
                return min
            return v
        }

        function autoWager(amount, multiplier) {
            const err = wager({
                wager: amount / 100,
                multiplier: multiplier / 100
            })
            if (err) {
                WagerForm.value = amount / 100
                WagerForm.multiplier = multiplier / 100
                return false
            }
        }
        var repeatBets = []
        return () => _$sinUmd_43 `form.wager.bg-gray-500.m-30.rounded.p-30.items-center
    display: grid;
    grid-template-columns: auto 150px 140px 1fr auto;
    grid-template-areas:
      'label1 input1 input1 input1 input1'
      'label2 input2 button autobet rules'
      'label3 repeat repeat repeat repeat';
    grid-gap: 20px 20px;
  ` ({
            life() {
                    return XRoulette.listenOpen((prev) => {
                        if (WagerForm.autobet !== true) {
                            repeatBets = prev.slice().concat(repeatBets).filter((b, i, a) => a.findIndex(b2 => b.multiplier === b2.multiplier) === i).slice(0, 10)
                            return
                        }
                        for (var i = 0; i < prev.length; i++) {
                            const w = prev[i]
                            if (autoWager(w.amount, w.multiplier) === false)
                                break
                        }
                        repeatBets = prev.slice(i).concat(repeatBets).filter((b, i, a) => a.findIndex(b2 => b.multiplier === b2.multiplier) === i).slice(0, 10)
                    })
                },
                onsubmit(ev) {
                    ev.preventDefault()
                    wager({
                        multiplier: WagerForm.multiplier,
                        wager: WagerForm.value
                    })
                }
        }, [_$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Coins'), _$sinUmd_43 `div.relative
      grid-area: input1;
    ` ([_$sinUmd_43 `input.w-1.bg-gray-700.border.h-50.p-16.pl-40.text-gray-100.font-body.text-sm.font-medium.focus:outline-none.rounded
        font-variant-numeric: tabular-nums;
      ` ({
            className: wagerError ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
            tabindex: 10,
            inputmode: 'decimal',
            value: typeof WagerForm.value === 'number' ? WagerForm.value.toFixed(2) : WagerForm.value,
            disabled: WagerForm.canPlay !== true,
            onkeydown: allowedKeys,
            oninput: (e) => {
                WagerForm.value = e.target.value
            },
            onblur: (e) => {
                WagerForm.fixupValue()
            }
        }), _$icons_8.coins({
            className: 'absolute inset-y-auto text-yellow top-0 bottom-0 m-auto',
            style: 'height: 20px; transform: scale(0.7); left: 16px'
        }), _$sinUmd_43 `div.absolute.bottom-0.flex
        top: 10px;
        right: 5px;
        z-index: 1;
      ` ([tinyButton({
            type: 'reset',
            onclick(e) {
                WagerForm.multiply(0)
                e.preventDefault()
            }
        }, 'Clear'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.increment(100000, 10000000)
                e.preventDefault()
            }
        }, '0.01'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.increment(100000, 1000000)
                e.preventDefault()
            }
        }, '0.10'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.increment(100000, 100000)
                e.preventDefault()
            }
        }, '+1'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.increment(100000, 10000)
                e.preventDefault()
            }
        }, '+10'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.increment(100000, 1000)
                e.preventDefault()
            }
        }, '+100'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.multiply(0.5)
                e.preventDefault()
            }
        }, '1/2'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.multiply(2)
                e.preventDefault()
            }
        }, 'x2'), tinyButton({
            type: 'button',
            onclick(e) {
                WagerForm.increment(Infinity, 1)
                e.preventDefault()
            }
        }, 'Max')]), wagerError && _$tooltip_13 `.z-10.whitespace-no-wrap.text-red; left: 80px; transform: translateX(-50%) translateY(7px);` (wagerError)]), _$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Multiplier'), _$sinUmd_43 `.relative` ([_$sinUmd_43 `input.bg-gray-700.border.h-50.p-16.text-gray-100.font-body.font-medium.text-base.focus:outline-none.rounded.font-numeric.w-1
        padding-left:31px;
        background-image: url('/icons/multiplier-x.svg');
        background-repeat: no-repeat;
        background-position: 20px center;
      ` ({
            className: multiplierError ? 'border-red focus:border-red' : 'border-gray-400 focus:border-yellow',
            tabindex: 11,
            inputmode: 'decimal',
            disabled: WagerForm.canPlay !== true,
            value: typeof WagerForm.multiplier === 'number' ? WagerForm.multiplier.toFixed(2) : WagerForm.multiplier,
            onkeydown: allowedKeys,
            oninput: (e) => {
                WagerForm.multiplier = e.target.value
            },
            onblur: (e) => {
                WagerForm.fixupMultiplier()
            }
        }), multiplierError && _$tooltip_13 `.z-10.whitespace-no-wrap.text-red; left: 80px; transform: translateX(-50%) translateY(7px);` (multiplierError)]), __buttonYellow_87.large `.uppercase` ({
            tabindex: 12,
            type: 'submit',
            disabled: XRoulette.status !== 'waiting' || WagerForm.canPlay !== true
        }, 'Place'), _$sinUmd_43 `label.uppercase.text-sm.font-bold.text-gray-200.whitespace-no-wrap.ml-10.flex.items-center.mr-auto` ([_$checkbox_5 `.mr-15;mt -2` ({
            checked: WagerForm.autobet,
            oninput(e) {
                WagerForm.autobet = e.target.checked
            }
        }), 'Repeat']), _$sinUmd_43 `a.font-body.text-sm.font-bold.text-yellow.uppercase.ml-auto.whitespace-no-wrap` ({
            href: '#',
            onclick() {
                _$howToPlay_81.show = true
            }
        }, 'How to play'), _$sinUmd_43 `label.uppercase.text-gray-200.font-body.font-bold.text-sm` ('Quick Play'), _$sinUmd_43 `.flex.flex-row.overflow-x-hidden.h-40.items-center; grid-area: repeat;` (repeatBets.length === 0 ? _$sinUmd_43 `span.italic.text-gray-200.text-sm` ('Start placing coins to activate quick play') : repeatBets.map(w => __buttonFlat_87.medium `.px-15.mr-10` ({
            disabled: XRoulette.status !== 'waiting' || WagerForm.canPlay !== true,
            onclick(e) {
                e.preventDefault()
                if (autoWager(w.amount, w.multiplier) !== false)
                    repeatBets.splice(repeatBets.indexOf(w), 1)
            }
        }, [_$icons_8.coins `.text-yellow.mr-5; h 20; transform scale(0.63)` (), _$sinUmd_43 `span.font-medium.mr-5` ((w.amount / 100).toFixed(2)), _$sinUmd_43 `span.font-medium.text-gray-200.whitespace-no-wrap` ('x ' + (w.multiplier / 100).toFixed(2))])))])
    })
    const tinyButton = __buttonFlat_87.small `.mr-5
  fw 500
`
    var _$normal_86 = {};;;
    _$normal_86 = ({
        key, result, multiplier
    }) => {
        return _$sinUmd_43 `div.tile.w-110.h-160.flex.flex-none.items-center.justify-center.bg-gray-400.border.font-body.font-medium.text-lg.text-gray-200
    border: 2px solid var(--color-gray-700);
    box-shadow: inset 0 1px 0 0 #383E51;
    border-radius: 20px;
  ` ({
            key,
            className: result ? 'result' : ''
        }, 'x ' + multiplier.toFixed(2))
    }
    _$normal_86.win = ({
        key, result, multiplier, amount, profit
    }) => {
        return _$sinUmd_43 `div.tile.w-110.h-160.flex.flex-none.items-center.justify-center.bg-gray-500.border.font-body.font-medium.text-lg.text-green-text
    border: 2px solid var(--color-gray-700);
    box-shadow: inset 0 1px 0 0 #383E51;
    background-image: linear-gradient(180deg, rgba(68,201,9,0.00) 0%, rgba(68, 201, 9, 0.20) 100%);
    background-blend-mode: linear;
    border-radius: 20px;
  ` ({
            key,
            className: result ? 'result' : ''
        }, ['x ' + multiplier.toFixed(2), _$sinUmd_43 `div.wager.flex.items-center.flex-row.absolute
      bottom: 20px;

      animation 125ms ease-out {
        from {
          transform: translateY(10px);
          opacity: 0;
        }

        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    ` ([_$icons_8.coins({
            className: 'text-yellow',
            style: 'transform: scale(0.7); margin-right: 4px'
        }), _$sinUmd_43 `span.text-sm.font-body.font-medium
        color #DEE2FD
      ` ((profit / 100).toFixed(2))])])
    }
    var _$csgo_85 = {};;;
    const {
        rarity: __rarity_85
    } = _$csgoUtils_17
    _$sinUmd_43.bss.global `
div.tile.Collection {
  w 106
  m 0 2px
  border: double 4px transparent;
  border-radius: 22px;
  background-image: linear-gradient(0deg, rgb(60, 54, 55), rgb(134, 104, 75)), linear-gradient(160deg, rgb(191, 149, 63), rgb(252, 246, 186), rgb(179, 135, 40), rgb(251, 245, 183), rgb(170, 119, 28));
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;

  background-size: 100% 100%, 100% 200%;
  background-position: 0 0, 0 100%;

  animation 2s infinite alternate {
    to {
      background-position: 0 0, 0 0;
    }
  }
}
`
    _$csgo_85 = ({
        key, result, multiplier, d
    }) => {
        return _$sinUmd_43 `.tile.w-110.h-180.flex.flex-col.flex-none.items-center.bg-gray-400.border.font-body.font-medium.text-lg.text-gray-100.py-10
    border: 2px solid var(--color-gray-700);
    box-shadow: inset 0 1px 0 0 #383E51;
    border-radius: 20px;
    position: relative;
    background-color: #1F2330;
    background-image: linear-gradient(0, ${__rarity_85(d.rarity) + '3d'}, ${__rarity_85(d.rarity) + '12'});
  ` ({
            key,
            className: d.rarity + (result ? ' result' : '')
        }, [_$sinUmd_43 `.justify-start` ('x ' + multiplier.toFixed(2)), _$sinUmd_43 `.flex.align-center;h 75` (_$sinUmd_43 `.my-auto.z-10;filter: drop-shadow(0 6px 14px #1f1f1f);${d.styleRetina}` ({
            style: `background-image: url(/images/${d.sheetRetina});`
        })), _$sinUmd_43 `.text-gray-100.text-xs.text-center.mx-10.font-medium.leading-tight.mt-10;o 0.7` (d.short_name), _$sinUmd_43 `div.h-20.mt-auto` ()])
    }
    _$csgo_85.chicken = ({
        key, result, multiplier
    }) => {
        return _$sinUmd_43 `.tile.w-110.h-180.flex.flex-col.flex-none.items-center.bg-gray-400.border.font-body.font-medium.text-lg.text-gray-100.py-10
    border: 2px solid var(--color-gray-700) !important;
    box-shadow: inset 0 1px 0 0 #383E51;
    border-radius: 20px;
    position: relative;
    background-color: #1F2330;
  ` ({
            key,
            className: result ? 'result' : ''
        }, [_$sinUmd_43 `.justify-start` ('x ' + multiplier.toFixed(2)), _$sinUmd_43 `.flex.align-center.mt-20;h 75` (_$sinUmd_43 `img.my-auto.z-10;w 56;filter: drop-shadow(0 6px 14px #1f1f1f);` ({
            src: '/images/chicken-small.png'
        }))])
    }
    _$csgo_85.win = ({
        key, result, multiplier, amount, profit, d
    }) => {
        return _$sinUmd_43 `.tile.w-110.h-180.flex.flex-col.flex-none.items-center.bg-gray-400.border.font-body.font-medium.text-lg.text-gray-100.py-5
    border: 2px solid var(--color-gray-700);
    box-shadow: inset 0 1px 0 0 #383E51;
    border-radius: 20px;
    position: relative;
    background-color: #1F2330;
    background-image: linear-gradient(0, ${__rarity_85(d.rarity) + '3d'}, ${__rarity_85(d.rarity) + '12'});
  ` ({
            key,
            className: d.rarity + (result ? ' result' : '')
        }, [_$sinUmd_43 `.justify-start` ('x ' + multiplier.toFixed(2)), _$sinUmd_43 `.flex.align-center;h 75` (_$sinUmd_43 `.my-auto.z-10;filter: drop-shadow(0 6px 14px #1f1f1f);${d.styleRetina}` ({
            style: `background-image: url(/images/${d.sheetRetina});`
        })), _$sinUmd_43 `.text-gray-100.text-xs.text-center.mx-10.font-medium.leading-tight.mt-10;o 0.7` (d.short_name), _$sinUmd_43 `div.wager.flex.items-center.flex-row.justify-end.mt-auto.h-20

      animation 125ms ease-out {
        from {
          transform: translateY(10px);
          opacity: 0;
        }

        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    ` ([_$icons_8.coins({
            className: 'text-yellow',
            style: 'transform: scale(0.7); margin-right: 4px'
        }), _$sinUmd_43 `span.text-sm.font-body.font-medium
      ` ((profit / 100).toFixed(2))])])
    };
    var _$table_49 = _$sinUmd_43((attrs, children) => _$sinUmd_43 `div.p-10.rounded.bg-gray-500.font-body` (_$sinUmd_43 `table.w-1` ([_$sinUmd_43 `thead.font-bold.text-gray-200.text-xs.uppercase.text-left.leading-none` (attrs.headers.map(h => _$sinUmd_43 `th.pl-10.pt-5.pb-15.whitespace-no-wrap` (h))), _$sinUmd_43 `tbody` (children)])))
    var _$referral_26 = {};;
    const Referral = _$referral_26 = {
        error: false,
        code: '',
        codeInput: '',
        commissions: [],
        stats: {
            totalWagered: 0,
            totalCommission: 0,
            availableCommission: 0
        },
        async update(codeInput) {
            const {
                error, success, code
            } = await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/referrals/code',
                withCredentials: true,
                body: {
                    code: codeInput
                }
            })
            if (success) {
                Referral.code = code
                Referral.codeInput = code
            } else {
                Referral.codeInput = error
            }
        },
        async refresh() {
            const {
                code
            } = await _$sinUmd_43.request({
                method: 'GET',
                url: "https://api.rollbit.com" + '/referrals/code',
                withCredentials: true
            })
            Referral.code = code
            Referral.codeInput = code
        },
        async list() {
            const {
                commissions, stats
            } = await _$sinUmd_43.request({
                method: 'GET',
                url: "https://api.rollbit.com" + '/referrals/list',
                withCredentials: true
            })
            if (stats)
                Referral.stats = stats
            if (commissions)
                Referral.commissions = commissions
        },
        async claim() {
            const {
                commissions, stats
            } = await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/referrals/claim',
                withCredentials: true
            })
            Referral.stats = stats
            Referral.commissions = commissions
        }
    }
    var _$qrcode_39 = {
        exports: {}
    };

    function QR8bitByte(data) {
        this.mode = QRMode.MODE_8BIT_BYTE;
        this.data = data;
        this.parsedData = [];
        for (var i = 0, l = this.data.length; i < l; i++) {
            var byteArray = [];
            var code = this.data.charCodeAt(i);
            if (code > 0x10000) {
                byteArray[0] = 0xF0 | ((code & 0x1C0000) >>> 18);
                byteArray[1] = 0x80 | ((code & 0x3F000) >>> 12);
                byteArray[2] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[3] = 0x80 | (code & 0x3F);
            } else if (code > 0x800) {
                byteArray[0] = 0xE0 | ((code & 0xF000) >>> 12);
                byteArray[1] = 0x80 | ((code & 0xFC0) >>> 6);
                byteArray[2] = 0x80 | (code & 0x3F);
            } else if (code > 0x80) {
                byteArray[0] = 0xC0 | ((code & 0x7C0) >>> 6);
                byteArray[1] = 0x80 | (code & 0x3F);
            } else {
                byteArray[0] = code;
            }
            this.parsedData.push(byteArray);
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData);
        if (this.parsedData.length != this.data.length) {
            this.parsedData.unshift(191);
            this.parsedData.unshift(187);
            this.parsedData.unshift(239);
        }
    }
    QR8bitByte.prototype = {
        getLength: function(buffer) {
            return this.parsedData.length;
        },
        write: function(buffer) {
            for (var i = 0, l = this.parsedData.length; i < l; i++) {
                buffer.put(this.parsedData[i], 8);
            }
        }
    };

    function QRCodeModel(typeNumber, errorCorrectLevel) {
        this.typeNumber = typeNumber;
        this.errorCorrectLevel = errorCorrectLevel;
        this.modules = null;
        this.moduleCount = 0;
        this.dataCache = null;
        this.dataList = [];
    }
    QRCodeModel.prototype = {
        addData: function(data) {
            var newData = new QR8bitByte(data);
            this.dataList.push(newData);
            this.dataCache = null;
        },
        isDark: function(row, col) {
            if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
                throw new Error(row + "," + col);
            }
            return this.modules[row][col];
        },
        getModuleCount: function() {
            return this.moduleCount;
        },
        make: function() {
            this.makeImpl(false, this.getBestMaskPattern());
        },
        makeImpl: function(test, maskPattern) {
            this.moduleCount = this.typeNumber * 4 + 17;
            this.modules = new Array(this.moduleCount);
            for (var row = 0; row < this.moduleCount; row++) {
                this.modules[row] = new Array(this.moduleCount);
                for (var col = 0; col < this.moduleCount; col++) {
                    this.modules[row][col] = null;
                }
            }
            this.setupPositionProbePattern(0, 0);
            this.setupPositionProbePattern(this.moduleCount - 7, 0);
            this.setupPositionProbePattern(0, this.moduleCount - 7);
            this.setupPositionAdjustPattern();
            this.setupTimingPattern();
            this.setupTypeInfo(test, maskPattern);
            if (this.typeNumber >= 7) {
                this.setupTypeNumber(test);
            }
            if (this.dataCache == null) {
                this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
            }
            this.mapData(this.dataCache, maskPattern);
        },
        setupPositionProbePattern: function(row, col) {
            for (var r = -1; r <= 7; r++) {
                if (row + r <= -1 || this.moduleCount <= row + r)
                    continue;
                for (var c = -1; c <= 7; c++) {
                    if (col + c <= -1 || this.moduleCount <= col + c)
                        continue;
                    if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                        this.modules[row + r][col + c] = true;
                    } else {
                        this.modules[row + r][col + c] = false;
                    }
                }
            }
        },
        getBestMaskPattern: function() {
            var minLostPoint = 0;
            var pattern = 0;
            for (var i = 0; i < 8; i++) {
                this.makeImpl(true, i);
                var lostPoint = QRUtil.getLostPoint(this);
                if (i == 0 || minLostPoint > lostPoint) {
                    minLostPoint = lostPoint;
                    pattern = i;
                }
            }
            return pattern;
        },
        createMovieClip: function(target_mc, instance_name, depth) {
            var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
            var cs = 1;
            this.make();
            for (var row = 0; row < this.modules.length; row++) {
                var y = row * cs;
                for (var col = 0; col < this.modules[row].length; col++) {
                    var x = col * cs;
                    var dark = this.modules[row][col];
                    if (dark) {
                        qr_mc.beginFill(0, 100);
                        qr_mc.moveTo(x, y);
                        qr_mc.lineTo(x + cs, y);
                        qr_mc.lineTo(x + cs, y + cs);
                        qr_mc.lineTo(x, y + cs);
                        qr_mc.endFill();
                    }
                }
            }
            return qr_mc;
        },
        setupTimingPattern: function() {
            for (var r = 8; r < this.moduleCount - 8; r++) {
                if (this.modules[r][6] != null) {
                    continue;
                }
                this.modules[r][6] = (r % 2 == 0);
            }
            for (var c = 8; c < this.moduleCount - 8; c++) {
                if (this.modules[6][c] != null) {
                    continue;
                }
                this.modules[6][c] = (c % 2 == 0);
            }
        },
        setupPositionAdjustPattern: function() {
            var pos = QRUtil.getPatternPosition(this.typeNumber);
            for (var i = 0; i < pos.length; i++) {
                for (var j = 0; j < pos.length; j++) {
                    var row = pos[i];
                    var col = pos[j];
                    if (this.modules[row][col] != null) {
                        continue;
                    }
                    for (var r = -2; r <= 2; r++) {
                        for (var c = -2; c <= 2; c++) {
                            if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                                this.modules[row + r][col + c] = true;
                            } else {
                                this.modules[row + r][col + c] = false;
                            }
                        }
                    }
                }
            }
        },
        setupTypeNumber: function(test) {
            var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
            for (var i = 0; i < 18; i++) {
                var mod = (!test && ((bits >> i) & 1) == 1);
                this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
            }
            for (var i = 0; i < 18; i++) {
                var mod = (!test && ((bits >> i) & 1) == 1);
                this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
            }
        },
        setupTypeInfo: function(test, maskPattern) {
            var data = (this.errorCorrectLevel << 3) | maskPattern;
            var bits = QRUtil.getBCHTypeInfo(data);
            for (var i = 0; i < 15; i++) {
                var mod = (!test && ((bits >> i) & 1) == 1);
                if (i < 6) {
                    this.modules[i][8] = mod;
                } else if (i < 8) {
                    this.modules[i + 1][8] = mod;
                } else {
                    this.modules[this.moduleCount - 15 + i][8] = mod;
                }
            }
            for (var i = 0; i < 15; i++) {
                var mod = (!test && ((bits >> i) & 1) == 1);
                if (i < 8) {
                    this.modules[8][this.moduleCount - i - 1] = mod;
                } else if (i < 9) {
                    this.modules[8][15 - i - 1 + 1] = mod;
                } else {
                    this.modules[8][15 - i - 1] = mod;
                }
            }
            this.modules[this.moduleCount - 8][8] = (!test);
        },
        mapData: function(data, maskPattern) {
            var inc = -1;
            var row = this.moduleCount - 1;
            var bitIndex = 7;
            var byteIndex = 0;
            for (var col = this.moduleCount - 1; col > 0; col -= 2) {
                if (col == 6)
                    col--;
                while (true) {
                    for (var c = 0; c < 2; c++) {
                        if (this.modules[row][col - c] == null) {
                            var dark = false;
                            if (byteIndex < data.length) {
                                dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                            }
                            var mask = QRUtil.getMask(maskPattern, row, col - c);
                            if (mask) {
                                dark = !dark;
                            }
                            this.modules[row][col - c] = dark;
                            bitIndex--;
                            if (bitIndex == -1) {
                                byteIndex++;
                                bitIndex = 7;
                            }
                        }
                    }
                    row += inc;
                    if (row < 0 || this.moduleCount <= row) {
                        row -= inc;
                        inc = -inc;
                        break;
                    }
                }
            }
        }
    };
    QRCodeModel.PAD0 = 0xEC;
    QRCodeModel.PAD1 = 0x11;
    QRCodeModel.createData = function(typeNumber, errorCorrectLevel, dataList) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
        var buffer = new QRBitBuffer();
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
        }
        var totalDataCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
        }
        if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 != 0) {
            buffer.putBit(false);
        }
        while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
            }
            buffer.put(QRCodeModel.PAD0, 8);
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
            }
            buffer.put(QRCodeModel.PAD1, 8);
        }
        return QRCodeModel.createBytes(buffer, rsBlocks);
    };
    QRCodeModel.createBytes = function(buffer, rsBlocks) {
        var offset = 0;
        var maxDcCount = 0;
        var maxEcCount = 0;
        var dcdata = new Array(rsBlocks.length);
        var ecdata = new Array(rsBlocks.length);
        for (var r = 0; r < rsBlocks.length; r++) {
            var dcCount = rsBlocks[r].dataCount;
            var ecCount = rsBlocks[r].totalCount - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);
            dcdata[r] = new Array(dcCount);
            for (var i = 0; i < dcdata[r].length; i++) {
                dcdata[r][i] = 0xff & buffer.buffer[i + offset];
            }
            offset += dcCount;
            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);
            for (var i = 0; i < ecdata[r].length; i++) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
            }
        }
        var totalCodeCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) {
            totalCodeCount += rsBlocks[i].totalCount;
        }
        var data = new Array(totalCodeCount);
        var index = 0;
        for (var i = 0; i < maxDcCount; i++) {
            for (var r = 0; r < rsBlocks.length; r++) {
                if (i < dcdata[r].length) {
                    data[index++] = dcdata[r][i];
                }
            }
        }
        for (var i = 0; i < maxEcCount; i++) {
            for (var r = 0; r < rsBlocks.length; r++) {
                if (i < ecdata[r].length) {
                    data[index++] = ecdata[r][i];
                }
            }
        }
        return data;
    };
    var QRMode = {
        MODE_NUMBER: 1 << 0,
        MODE_ALPHA_NUM: 1 << 1,
        MODE_8BIT_BYTE: 1 << 2,
        MODE_KANJI: 1 << 3
    };
    var QRErrorCorrectLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
    };
    var QRMaskPattern = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
    };
    var QRUtil = {
        PATTERN_POSITION_TABLE: [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170]
        ],
        G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
        G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
        G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
        getBCHTypeInfo: function(data) {
            var d = data << 10;
            while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
                d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
            }
            return ((data << 10) | d) ^ QRUtil.G15_MASK;
        },
        getBCHTypeNumber: function(data) {
            var d = data << 12;
            while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
                d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18)));
            }
            return (data << 12) | d;
        },
        getBCHDigit: function(data) {
            var digit = 0;
            while (data != 0) {
                digit++;
                data >>>= 1;
            }
            return digit;
        },
        getPatternPosition: function(typeNumber) {
            return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
        },
        getMask: function(maskPattern, i, j) {
            switch (maskPattern) {
                case QRMaskPattern.PATTERN000:
                    return (i + j) % 2 == 0;
                case QRMaskPattern.PATTERN001:
                    return i % 2 == 0;
                case QRMaskPattern.PATTERN010:
                    return j % 3 == 0;
                case QRMaskPattern.PATTERN011:
                    return (i + j) % 3 == 0;
                case QRMaskPattern.PATTERN100:
                    return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
                case QRMaskPattern.PATTERN101:
                    return (i * j) % 2 + (i * j) % 3 == 0;
                case QRMaskPattern.PATTERN110:
                    return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
                case QRMaskPattern.PATTERN111:
                    return ((i * j) % 3 + (i + j) % 2) % 2 == 0;
                default:
                    throw new Error("bad maskPattern:" + maskPattern);
            }
        },
        getErrorCorrectPolynomial: function(errorCorrectLength) {
            var a = new QRPolynomial([1], 0);
            for (var i = 0; i < errorCorrectLength; i++) {
                a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
            }
            return a;
        },
        getLengthInBits: function(mode, type) {
            if (1 <= type && type < 10) {
                switch (mode) {
                    case QRMode.MODE_NUMBER:
                        return 10;
                    case QRMode.MODE_ALPHA_NUM:
                        return 9;
                    case QRMode.MODE_8BIT_BYTE:
                        return 8;
                    case QRMode.MODE_KANJI:
                        return 8;
                    default:
                        throw new Error("mode:" + mode);
                }
            } else if (type < 27) {
                switch (mode) {
                    case QRMode.MODE_NUMBER:
                        return 12;
                    case QRMode.MODE_ALPHA_NUM:
                        return 11;
                    case QRMode.MODE_8BIT_BYTE:
                        return 16;
                    case QRMode.MODE_KANJI:
                        return 10;
                    default:
                        throw new Error("mode:" + mode);
                }
            } else if (type < 41) {
                switch (mode) {
                    case QRMode.MODE_NUMBER:
                        return 14;
                    case QRMode.MODE_ALPHA_NUM:
                        return 13;
                    case QRMode.MODE_8BIT_BYTE:
                        return 16;
                    case QRMode.MODE_KANJI:
                        return 12;
                    default:
                        throw new Error("mode:" + mode);
                }
            } else {
                throw new Error("type:" + type);
            }
        },
        getLostPoint: function(qrCode) {
            var moduleCount = qrCode.getModuleCount();
            var lostPoint = 0;
            for (var row = 0; row < moduleCount; row++) {
                for (var col = 0; col < moduleCount; col++) {
                    var sameCount = 0;
                    var dark = qrCode.isDark(row, col);
                    for (var r = -1; r <= 1; r++) {
                        if (row + r < 0 || moduleCount <= row + r) {
                            continue;
                        }
                        for (var c = -1; c <= 1; c++) {
                            if (col + c < 0 || moduleCount <= col + c) {
                                continue;
                            }
                            if (r == 0 && c == 0) {
                                continue;
                            }
                            if (dark == qrCode.isDark(row + r, col + c)) {
                                sameCount++;
                            }
                        }
                    }
                    if (sameCount > 5) {
                        lostPoint += (3 + sameCount - 5);
                    }
                }
            }
            for (var row = 0; row < moduleCount - 1; row++) {
                for (var col = 0; col < moduleCount - 1; col++) {
                    var count = 0;
                    if (qrCode.isDark(row, col))
                        count++;
                    if (qrCode.isDark(row + 1, col))
                        count++;
                    if (qrCode.isDark(row, col + 1))
                        count++;
                    if (qrCode.isDark(row + 1, col + 1))
                        count++;
                    if (count == 0 || count == 4) {
                        lostPoint += 3;
                    }
                }
            }
            for (var row = 0; row < moduleCount; row++) {
                for (var col = 0; col < moduleCount - 6; col++) {
                    if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
                        lostPoint += 40;
                    }
                }
            }
            for (var col = 0; col < moduleCount; col++) {
                for (var row = 0; row < moduleCount - 6; row++) {
                    if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
                        lostPoint += 40;
                    }
                }
            }
            var darkCount = 0;
            for (var col = 0; col < moduleCount; col++) {
                for (var row = 0; row < moduleCount; row++) {
                    if (qrCode.isDark(row, col)) {
                        darkCount++;
                    }
                }
            }
            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            lostPoint += ratio * 10;
            return lostPoint;
        }
    };
    var QRMath = {
        glog: function(n) {
            if (n < 1) {
                throw new Error("glog(" + n + ")");
            }
            return QRMath.LOG_TABLE[n];
        },
        gexp: function(n) {
            while (n < 0) {
                n += 255;
            }
            while (n >= 256) {
                n -= 255;
            }
            return QRMath.EXP_TABLE[n];
        },
        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256)
    };
    for (var __i_39 = 0; __i_39 < 8; __i_39++) {
        QRMath.EXP_TABLE[__i_39] = 1 << __i_39;
    }
    for (var __i_39 = 8; __i_39 < 256; __i_39++) {
        QRMath.EXP_TABLE[__i_39] = QRMath.EXP_TABLE[__i_39 - 4] ^ QRMath.EXP_TABLE[__i_39 - 5] ^ QRMath.EXP_TABLE[__i_39 - 6] ^ QRMath.EXP_TABLE[__i_39 - 8];
    }
    for (var __i_39 = 0; __i_39 < 255; __i_39++) {
        QRMath.LOG_TABLE[QRMath.EXP_TABLE[__i_39]] = __i_39;
    }

    function QRPolynomial(num, shift) {
        if (num.length == undefined) {
            throw new Error(num.length + "/" + shift);
        }
        var offset = 0;
        while (offset < num.length && num[offset] == 0) {
            offset++;
        }
        this.num = new Array(num.length - offset + shift);
        for (var i = 0; i < num.length - offset; i++) {
            this.num[i] = num[i + offset];
        }
    }
    QRPolynomial.prototype = {
        get: function(index) {
            return this.num[index];
        },
        getLength: function() {
            return this.num.length;
        },
        multiply: function(e) {
            var num = new Array(this.getLength() + e.getLength() - 1);
            for (var i = 0; i < this.getLength(); i++) {
                for (var j = 0; j < e.getLength(); j++) {
                    num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
                }
            }
            return new QRPolynomial(num, 0);
        },
        mod: function(e) {
            if (this.getLength() - e.getLength() < 0) {
                return this;
            }
            var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
            var num = new Array(this.getLength());
            for (var i = 0; i < this.getLength(); i++) {
                num[i] = this.get(i);
            }
            for (var i = 0; i < e.getLength(); i++) {
                num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
            }
            return new QRPolynomial(num, 0).mod(e);
        }
    };

    function QRRSBlock(totalCount, dataCount) {
        this.totalCount = totalCount;
        this.dataCount = dataCount;
    }
    QRRSBlock.RS_BLOCK_TABLE = [
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12],
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16]
    ];
    QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
        var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
        if (rsBlock == undefined) {
            throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
        }
        var length = rsBlock.length / 3;
        var list = [];
        for (var i = 0; i < length; i++) {
            var count = rsBlock[i * 3 + 0];
            var totalCount = rsBlock[i * 3 + 1];
            var dataCount = rsBlock[i * 3 + 2];
            for (var j = 0; j < count; j++) {
                list.push(new QRRSBlock(totalCount, dataCount));
            }
        }
        return list;
    };
    QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {
        switch (errorCorrectLevel) {
            case QRErrorCorrectLevel.L:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
            case QRErrorCorrectLevel.M:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
            case QRErrorCorrectLevel.Q:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
            case QRErrorCorrectLevel.H:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
            default:
                return undefined;
        }
    };

    function QRBitBuffer() {
        this.buffer = [];
        this.length = 0;
    }
    QRBitBuffer.prototype = {
        get: function(index) {
            var bufIndex = Math.floor(index / 8);
            return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) == 1;
        },
        put: function(num, length) {
            for (var i = 0; i < length; i++) {
                this.putBit(((num >>> (length - i - 1)) & 1) == 1);
            }
        },
        getLengthInBits: function() {
            return this.length;
        },
        putBit: function(bit) {
            var bufIndex = Math.floor(this.length / 8);
            if (this.buffer.length <= bufIndex) {
                this.buffer.push(0);
            }
            if (bit) {
                this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
            }
            this.length++;
        }
    };
    var QRCodeLimitLength = [
        [17, 14, 11, 7],
        [32, 26, 20, 14],
        [53, 42, 32, 24],
        [78, 62, 46, 34],
        [106, 84, 60, 44],
        [134, 106, 74, 58],
        [154, 122, 86, 64],
        [192, 152, 108, 84],
        [230, 180, 130, 98],
        [271, 213, 151, 119],
        [321, 251, 177, 137],
        [367, 287, 203, 155],
        [425, 331, 241, 177],
        [458, 362, 258, 194],
        [520, 412, 292, 220],
        [586, 450, 322, 250],
        [644, 504, 364, 280],
        [718, 560, 394, 310],
        [792, 624, 442, 338],
        [858, 666, 482, 382],
        [929, 711, 509, 403],
        [1003, 779, 565, 439],
        [1091, 857, 611, 461],
        [1171, 911, 661, 511],
        [1273, 997, 715, 535],
        [1367, 1059, 751, 593],
        [1465, 1125, 805, 625],
        [1528, 1190, 868, 658],
        [1628, 1264, 908, 698],
        [1732, 1370, 982, 742],
        [1840, 1452, 1030, 790],
        [1952, 1538, 1112, 842],
        [2068, 1628, 1168, 898],
        [2188, 1722, 1228, 958],
        [2303, 1809, 1283, 983],
        [2431, 1911, 1351, 1051],
        [2563, 1989, 1423, 1093],
        [2699, 2099, 1499, 1139],
        [2809, 2213, 1579, 1219],
        [2953, 2331, 1663, 1273]
    ];

    function QRCode(options) {
        var instance = this;
        this.options = {
            padding: 4,
            width: 256,
            height: 256,
            typeNumber: 4,
            color: "#000000",
            background: "#ffffff",
            ecl: "M"
        };
        if (typeof options === 'string') {
            options = {
                content: options
            };
        }
        if (options) {
            for (var i in options) {
                this.options[i] = options[i];
            }
        }
        if (typeof this.options.content !== 'string') {
            throw new Error("Expected 'content' as string!");
        }
        if (this.options.content.length === 0) {
            throw new Error("Expected 'content' to be non-empty!");
        }
        if (!(this.options.padding >= 0)) {
            throw new Error("Expected 'padding' value to be non-negative!");
        }
        if (!(this.options.width > 0) || !(this.options.height > 0)) {
            throw new Error("Expected 'width' or 'height' value to be higher than zero!");
        }

        function _getErrorCorrectLevel(ecl) {
            switch (ecl) {
                case "L":
                    return QRErrorCorrectLevel.L;
                case "M":
                    return QRErrorCorrectLevel.M;
                case "Q":
                    return QRErrorCorrectLevel.Q;
                case "H":
                    return QRErrorCorrectLevel.H;
                default:
                    throw new Error("Unknwon error correction level: " + ecl);
            }
        }

        function _getTypeNumber(content, ecl) {
            var length = _getUTF8Length(content);
            var type = 1;
            var limit = 0;
            for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
                var table = QRCodeLimitLength[i];
                if (!table) {
                    throw new Error("Content too long: expected " + limit + " but got " + length);
                }
                switch (ecl) {
                    case "L":
                        limit = table[0];
                        break;
                    case "M":
                        limit = table[1];
                        break;
                    case "Q":
                        limit = table[2];
                        break;
                    case "H":
                        limit = table[3];
                        break;
                    default:
                        throw new Error("Unknwon error correction level: " + ecl);
                }
                if (length <= limit) {
                    break;
                }
                type++;
            }
            if (type > QRCodeLimitLength.length) {
                throw new Error("Content too long");
            }
            return type;
        }

        function _getUTF8Length(content) {
            var result = encodeURI(content).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
            return result.length + (result.length != content ? 3 : 0);
        }
        var content = this.options.content;
        var type = _getTypeNumber(content, this.options.ecl);
        var ecl = _getErrorCorrectLevel(this.options.ecl);
        this.qrcode = new QRCodeModel(type, ecl);
        this.qrcode.addData(content);
        this.qrcode.make();
    }
    QRCode.prototype.svg = function(opt) {
        var options = this.options || {};
        var modules = this.qrcode.modules;
        if (typeof opt == "undefined") {
            opt = {
                container: options.container || "svg"
            };
        }
        var pretty = typeof options.pretty != "undefined" ? !!options.pretty : true;
        var indent = pretty ? '  ' : '';
        var EOL = pretty ? '\r\n' : '';
        var width = options.width;
        var height = options.height;
        var length = modules.length;
        var xsize = width / (length + 2 * options.padding);
        var ysize = height / (length + 2 * options.padding);
        var join = typeof options.join != "undefined" ? !!options.join : false;
        var swap = typeof options.swap != "undefined" ? !!options.swap : false;
        var xmlDeclaration = typeof options.xmlDeclaration != "undefined" ? !!options.xmlDeclaration : true;
        var predefined = typeof options.predefined != "undefined" ? !!options.predefined : false;
        var defs = predefined ? indent + '<defs><path id="qrmodule" d="M0 0 h' + ysize + ' v' + xsize + ' H0 z" style="fill:' + options.color + ';shape-rendering:crispEdges;" /></defs>' + EOL : '';
        var bgrect = indent + '<rect x="0" y="0" width="' + width + '" height="' + height + '" style="fill:' + options.background + ';shape-rendering:crispEdges;"/>' + EOL;
        var modrect = '';
        var pathdata = '';
        for (var y = 0; y < length; y++) {
            for (var x = 0; x < length; x++) {
                var module = modules[x][y];
                if (module) {
                    var px = (x * xsize + options.padding * xsize);
                    var py = (y * ysize + options.padding * ysize);
                    if (swap) {
                        var t = px;
                        px = py;
                        py = t;
                    }
                    if (join) {
                        var w = xsize + px
                        var h = ysize + py
                        px = (Number.isInteger(px)) ? Number(px) : px.toFixed(2);
                        py = (Number.isInteger(py)) ? Number(py) : py.toFixed(2);
                        w = (Number.isInteger(w)) ? Number(w) : w.toFixed(2);
                        h = (Number.isInteger(h)) ? Number(h) : h.toFixed(2);
                        pathdata += ('M' + px + ',' + py + ' V' + h + ' H' + w + ' V' + py + ' H' + px + ' Z ');
                    } else if (predefined) {
                        modrect += indent + '<use x="' + px.toString() + '" y="' + py.toString() + '" href="#qrmodule" />' + EOL;
                    } else {
                        modrect += indent + '<rect x="' + px.toString() + '" y="' + py.toString() + '" width="' + xsize + '" height="' + ysize + '" style="fill:' + options.color + ';shape-rendering:crispEdges;"/>' + EOL;
                    }
                }
            }
        }
        if (join) {
            modrect = indent + '<path x="0" y="0" style="fill:' + options.color + ';shape-rendering:crispEdges;" d="' + pathdata + '" />';
        }
        var svg = "";
        switch (opt.container) {
            case "svg":
                if (xmlDeclaration) {
                    svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
                }
                svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">' + EOL;
                svg += defs + bgrect + modrect;
                svg += '</svg>';
                break;
            case "svg-viewbox":
                if (xmlDeclaration) {
                    svg += '<?xml version="1.0" standalone="yes"?>' + EOL;
                }
                svg += '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' + width + ' ' + height + '">' + EOL;
                svg += defs + bgrect + modrect;
                svg += '</svg>';
                break;
            case "g":
                svg += '<g width="' + width + '" height="' + height + '">' + EOL;
                svg += defs + bgrect + modrect;
                svg += '</g>';
                break;
            default:
                svg += (defs + bgrect + modrect).replace(/^\s+/, "");
                break;
        }
        return svg;
    };
    QRCode.prototype.save = function(file, callback) {
        var data = this.svg();
        if (typeof callback != "function") {
            callback = function(error, result) {};
        }
        try {
            var fs = _$_empty_33({});
            fs.writeFile(file, data, callback);
        } catch (e) {
            callback(e);
        }
    };
    if ("object" != "undefined") {
        _$qrcode_39.exports = QRCode;
    }
    _$qrcode_39 = _$qrcode_39.exports
    var _$punycode_37 = {
        exports: {}
    };
    (function(global) {
        /*!https://mths.be/punycode v1.4.1 by @mathias*/
        ;
        (function(root) {
            var freeExports = typeof _$punycode_37.exports == 'object' && _$punycode_37.exports && !_$punycode_37.exports.nodeType && _$punycode_37.exports;
            var freeModule = "object" == 'object' && _$punycode_37 && !_$punycode_37.nodeType && _$punycode_37;
            var freeGlobal = typeof global == 'object' && global;
            if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
                root = freeGlobal;
            }
            var punycode, maxInt = 2147483647,
                base = 36,
                tMin = 1,
                tMax = 26,
                skew = 38,
                damp = 700,
                initialBias = 72,
                initialN = 128,
                delimiter = '-',
                regexPunycode = /^xn--/,
                regexNonASCII = /[^\x20-\x7E]/,
                regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
                errors = {
                    'overflow': 'Overflow: input needs wider integers to process',
                    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                    'invalid-input': 'Invalid input'
                },
                baseMinusTMin = base - tMin,
                floor = Math.floor,
                stringFromCharCode = String.fromCharCode,
                key;

            function error(type) {
                throw new RangeError(errors[type]);
            }

            function map(array, fn) {
                var length = array.length;
                var result = [];
                while (length--) {
                    result[length] = fn(array[length]);
                }
                return result;
            }

            function mapDomain(string, fn) {
                var parts = string.split('@');
                var result = '';
                if (parts.length > 1) {
                    result = parts[0] + '@';
                    string = parts[1];
                }
                string = string.replace(regexSeparators, '\x2E');
                var labels = string.split('.');
                var encoded = map(labels, fn).join('.');
                return result + encoded;
            }

            function ucs2decode(string) {
                var output = [],
                    counter = 0,
                    length = string.length,
                    value, extra;
                while (counter < length) {
                    value = string.charCodeAt(counter++);
                    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                        extra = string.charCodeAt(counter++);
                        if ((extra & 0xFC00) == 0xDC00) {
                            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                        } else {
                            output.push(value);
                            counter--;
                        }
                    } else {
                        output.push(value);
                    }
                }
                return output;
            }

            function ucs2encode(array) {
                return map(array, function(value) {
                    var output = '';
                    if (value > 0xFFFF) {
                        value -= 0x10000;
                        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                        value = 0xDC00 | value & 0x3FF;
                    }
                    output += stringFromCharCode(value);
                    return output;
                }).join('');
            }

            function basicToDigit(codePoint) {
                if (codePoint - 48 < 10) {
                    return codePoint - 22;
                }
                if (codePoint - 65 < 26) {
                    return codePoint - 65;
                }
                if (codePoint - 97 < 26) {
                    return codePoint - 97;
                }
                return base;
            }

            function digitToBasic(digit, flag) {
                return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
            }

            function adapt(delta, numPoints, firstTime) {
                var k = 0;
                delta = firstTime ? floor(delta / damp) : delta >> 1;
                delta += floor(delta / numPoints);
                for (; delta > baseMinusTMin * tMax >> 1; k += base) {
                    delta = floor(delta / baseMinusTMin);
                }
                return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
            }

            function decode(input) {
                var output = [],
                    inputLength = input.length,
                    out, i = 0,
                    n = initialN,
                    bias = initialBias,
                    basic, j, index, oldi, w, k, digit, t, baseMinusT;
                basic = input.lastIndexOf(delimiter);
                if (basic < 0) {
                    basic = 0;
                }
                for (j = 0; j < basic; ++j) {
                    if (input.charCodeAt(j) >= 0x80) {
                        error('not-basic');
                    }
                    output.push(input.charCodeAt(j));
                }
                for (index = basic > 0 ? basic + 1 : 0; index < inputLength;) {
                    for (oldi = i,
                        w = 1,
                        k = base;; k += base) {
                        if (index >= inputLength) {
                            error('invalid-input');
                        }
                        digit = basicToDigit(input.charCodeAt(index++));
                        if (digit >= base || digit > floor((maxInt - i) / w)) {
                            error('overflow');
                        }
                        i += digit * w;
                        t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                        if (digit < t) {
                            break;
                        }
                        baseMinusT = base - t;
                        if (w > floor(maxInt / baseMinusT)) {
                            error('overflow');
                        }
                        w *= baseMinusT;
                    }
                    out = output.length + 1;
                    bias = adapt(i - oldi, out, oldi == 0);
                    if (floor(i / out) > maxInt - n) {
                        error('overflow');
                    }
                    n += floor(i / out);
                    i %= out;
                    output.splice(i++, 0, n);
                }
                return ucs2encode(output);
            }

            function encode(input) {
                var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [],
                    inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
                input = ucs2decode(input);
                inputLength = input.length;
                n = initialN;
                delta = 0;
                bias = initialBias;
                for (j = 0; j < inputLength; ++j) {
                    currentValue = input[j];
                    if (currentValue < 0x80) {
                        output.push(stringFromCharCode(currentValue));
                    }
                }
                handledCPCount = basicLength = output.length;
                if (basicLength) {
                    output.push(delimiter);
                }
                while (handledCPCount < inputLength) {
                    for (m = maxInt,
                        j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue >= n && currentValue < m) {
                            m = currentValue;
                        }
                    }
                    handledCPCountPlusOne = handledCPCount + 1;
                    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                        error('overflow');
                    }
                    delta += (m - n) * handledCPCountPlusOne;
                    n = m;
                    for (j = 0; j < inputLength; ++j) {
                        currentValue = input[j];
                        if (currentValue < n && ++delta > maxInt) {
                            error('overflow');
                        }
                        if (currentValue == n) {
                            for (q = delta,
                                k = base;; k += base) {
                                t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                                if (q < t) {
                                    break;
                                }
                                qMinusT = q - t;
                                baseMinusT = base - t;
                                output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                                q = floor(qMinusT / baseMinusT);
                            }
                            output.push(stringFromCharCode(digitToBasic(q, 0)));
                            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                            delta = 0;
                            ++handledCPCount;
                        }
                    }
                    ++delta;
                    ++n;
                }
                return output.join('');
            }

            function toUnicode(input) {
                return mapDomain(input, function(string) {
                    return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                });
            }

            function toASCII(input) {
                return mapDomain(input, function(string) {
                    return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
                });
            }
            punycode = {
                'version': '1.4.1',
                'ucs2': {
                    'decode': ucs2decode,
                    'encode': ucs2encode
                },
                'decode': decode,
                'encode': encode,
                'toASCII': toASCII,
                'toUnicode': toUnicode
            };
            if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
                define('punycode', function() {
                    return punycode;
                });
            } else if (freeExports && freeModule) {
                if (_$punycode_37.exports == freeExports) {
                    freeModule.exports = punycode;
                } else {
                    for (key in punycode) {
                        punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
                    }
                }
            } else {
                root.punycode = punycode;
            }
        }(this));
    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    _$punycode_37 = _$punycode_37.exports 'use strict';
    var _$util_47 = {
        isString: function(arg) {
            return typeof(arg) === 'string';
        },
        isObject: function(arg) {
            return typeof(arg) === 'object' && arg !== null;
        },
        isNull: function(arg) {
            return arg === null;
        },
        isNullOrUndefined: function(arg) {
            return arg == null;
        }
    };
    'use strict';

    function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    var _$decode_40 = function(qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};
        if (typeof qs !== 'string' || qs.length === 0) {
            return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
            maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
            len = maxKeys;
        }
        for (var i = 0; i < len; ++i) {
            var x = qs[i].replace(regexp, '%20'),
                idx = x.indexOf(eq),
                kstr, vstr, k, v;
            if (idx >= 0) {
                kstr = x.substr(0, idx);
                vstr = x.substr(idx + 1);
            } else {
                kstr = x;
                vstr = '';
            }
            k = decodeURIComponent(kstr);
            v = decodeURIComponent(vstr);
            if (!hasOwnProperty(obj, k)) {
                obj[k] = v;
            } else if (isArray(obj[k])) {
                obj[k].push(v);
            } else {
                obj[k] = [obj[k], v];
            }
        }
        return obj;
    };
    var isArray = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
    };
    'use strict';
    var stringifyPrimitive = function(v) {
        switch (typeof v) {
            case 'string':
                return v;
            case 'boolean':
                return v ? 'true' : 'false';
            case 'number':
                return isFinite(v) ? v : '';
            default:
                return '';
        }
    };
    var _$encode_41 = function(obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
            obj = undefined;
        }
        if (typeof obj === 'object') {
            return map(objectKeys(obj), function(k) {
                var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                if (__isArray_41(obj[k])) {
                    return map(obj[k], function(v) {
                        return ks + encodeURIComponent(stringifyPrimitive(v));
                    }).join(sep);
                } else {
                    return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                }
            }).join(sep);
        }
        if (!name)
            return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
    };
    var __isArray_41 = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
    };

    function map(xs, f) {
        if (xs.map)
            return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
            res.push(f(xs[i], i));
        }
        return res;
    }
    var objectKeys = Object.keys || function(obj) {
        var res = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
                res.push(key);
        }
        return res;
    };
    var _$querystringEs3_42 = {};
    'use strict';
    _$querystringEs3_42.decode = _$querystringEs3_42.parse = _$decode_40;
    _$querystringEs3_42.encode = _$querystringEs3_42.stringify = _$encode_41;
    var _$url_46 = {};
    'use strict';;;
    _$url_46.parse = urlParse;
    _$url_46.resolve = urlResolve;
    _$url_46.resolveObject = urlResolveObject;
    _$url_46.format = urlFormat;
    _$url_46.Url = Url;

    function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
    }
    var protocolPattern = /^([a-z0-9.+-]+:)/i,
        portPattern = /:[0-9]*$/,
        simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
        delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
        unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
        autoEscape = ['\''].concat(unwise),
        nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
        hostEndingChars = ['/', '?', '#'],
        hostnameMaxLen = 255,
        hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
        hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
        unsafeProtocol = {
            'javascript': true,
            'javascript:': true
        },
        hostlessProtocol = {
            'javascript': true,
            'javascript:': true
        },
        slashedProtocol = {
            'http': true,
            'https': true,
            'ftp': true,
            'gopher': true,
            'file': true,
            'http:': true,
            'https:': true,
            'ftp:': true,
            'gopher:': true,
            'file:': true
        };

    function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && _$util_47.isObject(url) && url instanceof Url)
            return url;
        var u = new Url;
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
    }
    Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!_$util_47.isString(url)) {
            throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
        var queryIndex = url.indexOf('?'),
            splitter = (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
            uSplit = url.split(splitter),
            slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, '/');
        url = uSplit.join(splitter);
        var rest = url;
        rest = rest.trim();
        if (!slashesDenoteHost && url.split('#').length === 1) {
            var simplePath = simplePathPattern.exec(rest);
            if (simplePath) {
                this.path = rest;
                this.href = rest;
                this.pathname = simplePath[1];
                if (simplePath[2]) {
                    this.search = simplePath[2];
                    if (parseQueryString) {
                        this.query = _$querystringEs3_42.parse(this.search.substr(1));
                    } else {
                        this.query = this.search.substr(1);
                    }
                } else if (parseQueryString) {
                    this.search = '';
                    this.query = {};
                }
                return this;
            }
        }
        var proto = protocolPattern.exec(rest);
        if (proto) {
            proto = proto[0];
            var lowerProto = proto.toLowerCase();
            this.protocol = lowerProto;
            rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
            var slashes = rest.substr(0, 2) === '//';
            if (slashes && !(proto && hostlessProtocol[proto])) {
                rest = rest.substr(2);
                this.slashes = true;
            }
        }
        if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {
            var hostEnd = -1;
            for (var i = 0; i < hostEndingChars.length; i++) {
                var hec = rest.indexOf(hostEndingChars[i]);
                if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                    hostEnd = hec;
            }
            var auth, atSign;
            if (hostEnd === -1) {
                atSign = rest.lastIndexOf('@');
            } else {
                atSign = rest.lastIndexOf('@', hostEnd);
            }
            if (atSign !== -1) {
                auth = rest.slice(0, atSign);
                rest = rest.slice(atSign + 1);
                this.auth = decodeURIComponent(auth);
            }
            hostEnd = -1;
            for (var i = 0; i < nonHostChars.length; i++) {
                var hec = rest.indexOf(nonHostChars[i]);
                if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
                    hostEnd = hec;
            }
            if (hostEnd === -1)
                hostEnd = rest.length;
            this.host = rest.slice(0, hostEnd);
            rest = rest.slice(hostEnd);
            this.parseHost();
            this.hostname = this.hostname || '';
            var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';
            if (!ipv6Hostname) {
                var hostparts = this.hostname.split(/\./);
                for (var i = 0, l = hostparts.length; i < l; i++) {
                    var part = hostparts[i];
                    if (!part)
                        continue;
                    if (!part.match(hostnamePartPattern)) {
                        var newpart = '';
                        for (var j = 0, k = part.length; j < k; j++) {
                            if (part.charCodeAt(j) > 127) {
                                newpart += 'x';
                            } else {
                                newpart += part[j];
                            }
                        }
                        if (!newpart.match(hostnamePartPattern)) {
                            var validParts = hostparts.slice(0, i);
                            var notHost = hostparts.slice(i + 1);
                            var bit = part.match(hostnamePartStart);
                            if (bit) {
                                validParts.push(bit[1]);
                                notHost.unshift(bit[2]);
                            }
                            if (notHost.length) {
                                rest = '/' + notHost.join('.') + rest;
                            }
                            this.hostname = validParts.join('.');
                            break;
                        }
                    }
                }
            }
            if (this.hostname.length > hostnameMaxLen) {
                this.hostname = '';
            } else {
                this.hostname = this.hostname.toLowerCase();
            }
            if (!ipv6Hostname) {
                this.hostname = _$punycode_37.toASCII(this.hostname);
            }
            var p = this.port ? ':' + this.port : '';
            var h = this.hostname || '';
            this.host = h + p;
            this.href += this.host;
            if (ipv6Hostname) {
                this.hostname = this.hostname.substr(1, this.hostname.length - 2);
                if (rest[0] !== '/') {
                    rest = '/' + rest;
                }
            }
        }
        if (!unsafeProtocol[lowerProto]) {
            for (var i = 0, l = autoEscape.length; i < l; i++) {
                var ae = autoEscape[i];
                if (rest.indexOf(ae) === -1)
                    continue;
                var esc = encodeURIComponent(ae);
                if (esc === ae) {
                    esc = escape(ae);
                }
                rest = rest.split(ae).join(esc);
            }
        }
        var hash = rest.indexOf('#');
        if (hash !== -1) {
            this.hash = rest.substr(hash);
            rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf('?');
        if (qm !== -1) {
            this.search = rest.substr(qm);
            this.query = rest.substr(qm + 1);
            if (parseQueryString) {
                this.query = _$querystringEs3_42.parse(this.query);
            }
            rest = rest.slice(0, qm);
        } else if (parseQueryString) {
            this.search = '';
            this.query = {};
        }
        if (rest)
            this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
            this.pathname = '/';
        }
        if (this.pathname || this.search) {
            var p = this.pathname || '';
            var s = this.search || '';
            this.path = p + s;
        }
        this.href = this.format();
        return this;
    };

    function urlFormat(obj) {
        if (_$util_47.isString(obj))
            obj = urlParse(obj);
        if (!(obj instanceof Url))
            return Url.prototype.format.call(obj);
        return obj.format();
    }
    Url.prototype.format = function() {
        var auth = this.auth || '';
        if (auth) {
            auth = encodeURIComponent(auth);
            auth = auth.replace(/%3A/i, ':');
            auth += '@';
        }
        var protocol = this.protocol || '',
            pathname = this.pathname || '',
            hash = this.hash || '',
            host = false,
            query = '';
        if (this.host) {
            host = auth + this.host;
        } else if (this.hostname) {
            host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
            if (this.port) {
                host += ':' + this.port;
            }
        }
        if (this.query && _$util_47.isObject(this.query) && Object.keys(this.query).length) {
            query = _$querystringEs3_42.stringify(this.query);
        }
        var search = this.search || (query && ('?' + query)) || '';
        if (protocol && protocol.substr(-1) !== ':')
            protocol += ':';
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
            host = '//' + (host || '');
            if (pathname && pathname.charAt(0) !== '/')
                pathname = '/' + pathname;
        } else if (!host) {
            host = '';
        }
        if (hash && hash.charAt(0) !== '#')
            hash = '#' + hash;
        if (search && search.charAt(0) !== '?')
            search = '?' + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
            return encodeURIComponent(match);
        });
        search = search.replace('#', '%23');
        return protocol + host + pathname + search + hash;
    };

    function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
    }
    Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
    };

    function urlResolveObject(source, relative) {
        if (!source)
            return relative;
        return urlParse(source, false, true).resolveObject(relative);
    }
    Url.prototype.resolveObject = function(relative) {
        if (_$util_47.isString(relative)) {
            var rel = new Url();
            rel.parse(relative, false, true);
            relative = rel;
        }
        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
            var tkey = tkeys[tk];
            result[tkey] = this[tkey];
        }
        result.hash = relative.hash;
        if (relative.href === '') {
            result.href = result.format();
            return result;
        }
        if (relative.slashes && !relative.protocol) {
            var rkeys = Object.keys(relative);
            for (var rk = 0; rk < rkeys.length; rk++) {
                var rkey = rkeys[rk];
                if (rkey !== 'protocol')
                    result[rkey] = relative[rkey];
            }
            if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
                result.path = result.pathname = '/';
            }
            result.href = result.format();
            return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
            if (!slashedProtocol[relative.protocol]) {
                var keys = Object.keys(relative);
                for (var v = 0; v < keys.length; v++) {
                    var k = keys[v];
                    result[k] = relative[k];
                }
                result.href = result.format();
                return result;
            }
            result.protocol = relative.protocol;
            if (!relative.host && !hostlessProtocol[relative.protocol]) {
                var relPath = (relative.pathname || '').split('/');
                while (relPath.length && !(relative.host = relPath.shift()))
                ;
                if (!relative.host)
                    relative.host = '';
                if (!relative.hostname)
                    relative.hostname = '';
                if (relPath[0] !== '')
                    relPath.unshift('');
                if (relPath.length < 2)
                    relPath.unshift('');
                result.pathname = relPath.join('/');
            } else {
                result.pathname = relative.pathname;
            }
            result.search = relative.search;
            result.query = relative.query;
            result.host = relative.host || '';
            result.auth = relative.auth;
            result.hostname = relative.hostname || relative.host;
            result.port = relative.port;
            if (result.pathname || result.search) {
                var p = result.pathname || '';
                var s = result.search || '';
                result.path = p + s;
            }
            result.slashes = result.slashes || relative.slashes;
            result.href = result.format();
            return result;
        }
        var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
            isRelAbs = (relative.host || relative.pathname && relative.pathname.charAt(0) === '/'),
            mustEndAbs = (isRelAbs || isSourceAbs || (result.host && relative.pathname)),
            removeAllDots = mustEndAbs,
            srcPath = result.pathname && result.pathname.split('/') || [],
            relPath = relative.pathname && relative.pathname.split('/') || [],
            psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
            result.hostname = '';
            result.port = null;
            if (result.host) {
                if (srcPath[0] === '')
                    srcPath[0] = result.host;
                else
                    srcPath.unshift(result.host);
            }
            result.host = '';
            if (relative.protocol) {
                relative.hostname = null;
                relative.port = null;
                if (relative.host) {
                    if (relPath[0] === '')
                        relPath[0] = relative.host;
                    else
                        relPath.unshift(relative.host);
                }
                relative.host = null;
            }
            mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
        }
        if (isRelAbs) {
            result.host = (relative.host || relative.host === '') ? relative.host : result.host;
            result.hostname = (relative.hostname || relative.hostname === '') ? relative.hostname : result.hostname;
            result.search = relative.search;
            result.query = relative.query;
            srcPath = relPath;
        } else if (relPath.length) {
            if (!srcPath)
                srcPath = [];
            srcPath.pop();
            srcPath = srcPath.concat(relPath);
            result.search = relative.search;
            result.query = relative.query;
        } else if (!_$util_47.isNullOrUndefined(relative.search)) {
            if (psychotic) {
                result.hostname = result.host = srcPath.shift();
                var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
                if (authInHost) {
                    result.auth = authInHost.shift();
                    result.host = result.hostname = authInHost.shift();
                }
            }
            result.search = relative.search;
            result.query = relative.query;
            if (!_$util_47.isNull(result.pathname) || !_$util_47.isNull(result.search)) {
                result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
            }
            result.href = result.format();
            return result;
        }
        if (!srcPath.length) {
            result.pathname = null;
            if (result.search) {
                result.path = '/' + result.search;
            } else {
                result.path = null;
            }
            result.href = result.format();
            return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = ((result.host || relative.host || srcPath.length > 1) && (last === '.' || last === '..') || last === '');
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
            last = srcPath[i];
            if (last === '.') {
                srcPath.splice(i, 1);
            } else if (last === '..') {
                srcPath.splice(i, 1);
                up++;
            } else if (up) {
                srcPath.splice(i, 1);
                up--;
            }
        }
        if (!mustEndAbs && !removeAllDots) {
            for (; up--; up) {
                srcPath.unshift('..');
            }
        }
        if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
            srcPath.unshift('');
        }
        if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
            srcPath.push('');
        }
        var isAbsolute = srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/');
        if (psychotic) {
            result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
            var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
            if (authInHost) {
                result.auth = authInHost.shift();
                result.host = result.hostname = authInHost.shift();
            }
        }
        mustEndAbs = mustEndAbs || (result.host && srcPath.length);
        if (mustEndAbs && !isAbsolute) {
            srcPath.unshift('');
        }
        if (!srcPath.length) {
            result.pathname = null;
            result.path = null;
        } else {
            result.pathname = srcPath.join('/');
        }
        if (!_$util_47.isNull(result.pathname) || !_$util_47.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
    };
    Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
            port = port[0];
            if (port !== ':') {
                this.port = port.substr(1);
            }
            host = host.substr(0, host.length - port.length);
        }
        if (host)
            this.hostname = host;
    };;

    function bitcoin({
        address, amount, label, message, lightning
    }) {
        const uri = {
            protocol: 'bitcoin',
            hostname: address,
            pathname: '',
            query: {}
        }
        if (amount != null)
            uri.query.amount = amount
        if (label != null)
            uri.query.label = label
        if (message != null)
            uri.query.message = message
        if (lightning != null)
            uri.query.lightning = lightning
        return _$url_46.format(uri)
    }

    function ethereum({
        address, functionName = '', args = {}, amount, gas, gasLimit, gasPrice, chainId
    }) {
        const uri = {
            protocol: 'ethereum',
            username: chainId,
            hostname: address,
            pathname: functionName,
            query: {
                ...args
            }
        }
        if (amount != null)
            uri.query.value = amount.toExponential()
        if (gas != null)
            uri.query.gas = gas
        if (gasLimit != null)
            uri.query.gasLimit = gasLimit
        if (gasPrice != null)
            uri.query.gasPrice = gasPrice
        return _$url_46.format(uri)
    }
    var _$cryptoPaymentUrl_30 = {
        bitcoin,
        ethereum
    };;
    var _$qrcode_31 = {
        bitcoin: wrap(_$cryptoPaymentUrl_30.bitcoin),
        ethereum: wrap(_$cryptoPaymentUrl_30.ethereum)
    }

    function wrap(fn) {
        return function(coinOpts, qrOpts = {}) {
            var url = fn(coinOpts)
            return {
                qrcode: new _$qrcode_39({
                    content: url,
                    width: 256,
                    height: 256,
                    ecl: 'L',
                    join: true,
                    pretty: false,
                    xmlDeclaration: false,
                    container: 'svg-viewbox',
                    predefined: true,
                    ...qrOpts
                }).svg(),
                url
            }
        }
    };;
    const {
        buttonGreen: __buttonGreen_71
    } = _$button_4
    var _$steamModal_71 = (onsuccess, onclose) => _$sinUmd_43(() => {
        var tradeUrl = ''
        var apiKey = ''
        var loading = false
        var tradeUrlValid = null
        var apiKeyValid = null
        var errorMessage = ''
        async
        function onsubmit(e) {
            e.preventDefault()
            loading = true
            const res = await _$sinUmd_43.request({
                method: 'POST',
                url: "https://api.rollbit.com" + '/steam/trade-info',
                withCredentials: true,
                body: {
                    tradeUrl, apiKey
                }
            })
            loading = false
            if (res.success === true)
                return onsuccess()
            if (res.validKey === false)
                apiKeyValid = false
            if (res.validTradeUrl === false)
                tradeUrlValid = false
            if (res.canTrade === false)
                errorMessage = 'You are not eligible to trade. Steam Guard Authenticator must be enabled for at least 15 days and your inventory must be public'
        }
        return () => _$modal_10({
            onclose
        }, _$sinUmd_43 `fieldset` ({
            disabled: loading
        }, _$sinUmd_43 `.flex.flex-row` ([_$sinUmd_43 `img.object-cover; br 16 0 0 16` ({
            src: '/images/steam-bokeh.png',
            srcset: '/images/steam-bokeh.png, /images/steam-bokeh@2x.png 2x'
        }), _$sinUmd_43 `div.m-40` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.leading-none.uppercase.mb-20` ('Steam Trade URL'), _$sinUmd_43 `p.text-gray-100.text-base.mb-20` ('Please enter your Steam trade URL. You can find it ', _$sinUmd_43 `a.text-yellow.hover:underline` ({
            href: 'https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url',
            target: '_blank',
            rel: 'noreferrer'
        }, 'here')), _$sinUmd_43 `label.font-bold.text-xs.text-gray-200.mb-5.block.uppercase` ('Steam Trade URL'), _$sinUmd_43 `input.bg-gray-700.font-body.font-medium.text-gray-200.rounded.w-1.px-20.text-base.focus:outline-none.border
      line-height: 50px;
      ::placeholder {
        color: var(--color-gray-300);
      }
      ` ({
            className: tradeUrlValid === false ? 'border-red focus:border-red' : 'border-gray-700 focus:border-yellow',
            placeholder: 'https://steamcommunity.com/tradeoffer/…',
            value: tradeUrl,
            inputmode: 'url',
            oninput() {
                tradeUrl = this.value;
                tradeUrlValid = /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=[0-9]{1,10}&token=[0-9A-Za-z_-]{8}$/.test(tradeUrl)
            }
        }), _$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.leading-none.uppercase.mb-20.mt-40` ('Steam Web API'), _$sinUmd_43 `p.text-gray-100.text-base.mb-20` ('Please enter your Steam API key. You can generate it ', _$sinUmd_43 `a.text-yellow.hover:underline` ({
            href: 'https://steamcommunity.com/dev/apikey',
            target: '_blank',
            rel: 'noreferrer'
        }, 'here')), _$sinUmd_43 `label.font-bold.text-xs.text-gray-200.mb-5.block.uppercase` ('Steam Web API'), _$sinUmd_43 `input.bg-gray-700.font-body.font-medium.text-gray-200.rounded.w-1.px-20.text-base.focus:outline-none.border
      line-height: 50px;
      ::placeholder {
        color: var(--color-gray-300);
      }
      ` ({
            className: apiKeyValid === false ? 'border-red focus:border-red' : 'border-gray-700 focus:border-yellow',
            value: apiKey,
            type: 'password',
            oninput() {
                apiKey = this.value;
                apiKeyValid = /^[A-F0-9]{32}$/.test(apiKey)
            }
        }), _$sinUmd_43 `p.text-gray-200.text-sm.mb-20.word-wrap.w-340.mt-5` ('Domain can be any value you like, eg. localhost. Do not share this API key with anyone else. Our staff will never ask you for it. Do not revoke or change your API key during a trade as you may lose your items and coins'), __buttonGreen_71.large `.uppercase.w-200.mt-40` ({
            disabled: !(tradeUrlValid && apiKeyValid),
            onclick(e) {
                onsubmit(e)
            }
        }, 'Confirm'), errorMessage && _$sinUmd_43 `p.text-red.font-medium.text-base.mt-30.w-320` (errorMessage)])])))
    });;
    var _$itemCard_67 = _$sinUmd_43(({
        onclick, item, key
    }) => _$sinUmd_43 `div.rounded.relative.bg-gray-400.flex.flex-row.p-10.mb-10.transition.duration-75.ease-in-out` ({
        className: onclick && 'hover:bg-gray-300 cursor-pointer',
        key,
        onclick
    }, [_$sinUmd_43 `div.flex.mr-15.w-60.flex-none.relative` ([_$sinUmd_43 `img.m-auto.self-center.z-20` ({
        src: `https://steamcommunity-a.akamaihd.net/economy/image/${item.image}/200x200`,
        alt: item.weapon + ' | ' + item.skin,
        width: 54
    })]), _$sinUmd_43 `div.font-medium.text-base.leading-tight.text-gray-100.flex.flex-col.justify-between.flex-1;  min-width: 0` ([_$sinUmd_43 `p.font-bold.text-xs.text-gray-200.uppercase` (item.exterior || _$sinUmd_43.trust('&nbsp;')), _$sinUmd_43 `.my-10.leading-tight` (item.skin ? item.weapon : '', _$sinUmd_43 `span.text-gray-200` (item.skin ? ' | ' : ''), item.skin == null ? item.weapon : item.skin), _$sinUmd_43 `div.font-medium.text-sm.text-gray-100` ([_$icons_8.coins `.inline-block.mr-10.text-yellow; w 12; h 14; transform scale(0.6)`, (item.price * (1 + item.markup / 100)).toFixed(2), item.markup && item.markup !== 0 ? _$sinUmd_43 `span.text-gray-200` (` (${Math.sign(item.markup) > 0 ? '+' : ''}${item.markup}%)`) : ''])]), !item.disabled && onclick && _$icons_8.close `.absolute.cursor-pointer.text-gray-200.hover:text-gray-100; t 8; r 8;`]));;;
    const {
        buttonGreen: __buttonGreen_66,
        buttonGray: __buttonGray_66
    } = _$button_4
    var _$editPriceModal_66 = (item, onsubmit) => _$sinUmd_43(() => {
        var prevMarkup = item.markup
        return () => _$modal_10({
            onclose: onsubmit,
            darkMode: true,
            style: 'box-shadow: 0 3px 0 0 #171A25, 0 20px 40px 0 rgba(0,0,0,0.40), inset 0 1px 0 0 #272C3B;'
        }, _$sinUmd_43 `div.p-40.w-420.flex.flex-col.items-center` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-gray-100.leading-none.uppercase.mb-20` ('Edit price'), _$sinUmd_43 `p.text-gray-100.text-base.mb-20` ('Add or remove up to 10% of the item market price'), _$itemCard_67 `.w-240` ({
            item
        }), _$sinUmd_43 `div.relative.mt-20.mb-40` (_$sinUmd_43 `div.text-gray-100.font-medium.text-base.text-center
      ` ((Math.sign(item.markup) > 0 ? '+' : '') + item.markup + '%'), _$sinUmd_43 `input.appearance-none.h-5.w-240.outline-none
          p 0
          bc var(--color-gray-800)
          br 2.5

        ::-webkit-slider-thumb {
          -webkit-appearance: none;
          box-sizing: content-box;
          w 16
          h 16
          br 8
          background: #E3E6EC;
          box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
        }
      ` ({
            type: 'range',
            min: -10,
            max: 10,
            step: 1,
            value: item.markup,
            style: `background-image: linear-gradient(to ${item.markup > 0 ? 'right' : 'left'}, var(--color-gray-800), var(--color-gray-800) 50%, var(--color-yellow) 50%, var(--color-yellow) ${Math.abs(item.markup / 10 * 50) + 50}%, var(--color-gray-800) ${Math.abs(item.markup / 10 * 50) + 50}%, var(--color-gray-800))`,
            oninput() {
                item.markup = this.value
            }
        })), _$sinUmd_43 `div.grid.grid-cols-2.w-1; gap 20` (__buttonGray_66.large({
            onclick() {
                item.markup = prevMarkup;
                onsubmit()
            }
        }, 'Cancel'), __buttonGreen_66.large({
            onclick: onsubmit
        }, 'Confirm'))]))
    });
    var _$spinner_11 = _$sinUmd_43(() => _$sinUmd_43 `div.inline-block.relative; w 16; h 16` (_$sinUmd_43 `svg
  animation 2s linear infinite {
    from { transform rotateZ(0deg) }
    to { transform rotateZ(360deg) }
  }
  ` ({
        viewBox: '0 0 20 20'
    }, _$sinUmd_43 `circle
    fill: transparent;
    stroke: #72F238;
    stroke-linecap: square;
    stroke-dasharray: 50;
    stroke-dashoffset: 16;
    stroke-width: 0.15rem;
    vector-effect: non-scaling-size;
    transform-origin: 50% 50%;
    animation 3s cubic-bezier(0.5, 0, 0.5, 1) infinite both {
      0%, 25% {
        stroke-dashoffset: 50;
        transform: rotateZ(0);
      }

      50%, 75% {
        stroke-dashoffset: 3;
        transform: rotateZ(45deg);
      }

      100% {
        stroke-dashoffset: 50;
        transform: rotateZ(360deg);
      }
    }
  ` ({
        cx: 10,
        cy: 10,
        r: 8
    }))));;
    const {
        buttonGreen: __buttonGreen_72,
        buttonLink: __buttonLink_72
    } = _$button_4;;;
    var _$tradeReadyModal_72 = (deposit, onclose) => _$sinUmd_43(() => {
        return () => {
            if (deposit.state !== 'accepted') {
                onclose()
                return _$sinUmd_43 ``
            }
            return _$modal_10({
                onclose,
                darkMode: true
            }, _$sinUmd_43 `div.w-420.m-40.flex.flex-col.items-center` ([_$sinUmd_43 `h1.text-2xl.font-extrabold.text-green-text.leading-none.uppercase.mb-20.mx-auto` ('Your Trade is ready'), _$sinUmd_43(async() => {
                const {
                    trade
                } = await _$depositsModel_64.tradeDetails(deposit)
                return () => [_$sinUmd_43 `p.text-gray-100.text-base.mb-20.font-medium` ('Please create your trade and confirm with Steam Guard App.'), _$sinUmd_43 `.flex.flex-col.mb-30
          background: url(/images/trade-arrows.svg) no-repeat left bottom 15px;
          ` (_$itemCard_67 `.w-240.mb-15` ({
                    item: trade.items[0]
                }), _$sinUmd_43 `.rounded.w-180.text-gray-100.font-medium.text-base.flex.flex-row.items-center.p-15.self-end; bc #2B4132` ([_$sinUmd_43 `img.rounded-sm.w-20.h-20` ({
                    src: trade.buyerImage,
                    alt: trade.buyerName
                }), _$sinUmd_43 `p.ml-10.truncate` (trade.buyerName)])), _$sinUmd_43 `.rounded.p-20.bg-gray-700.text-sm.text-gray-200.mb-30` (['Verify the user’s Steam registration date matches ', _$sinUmd_43 `span.text-gray-100.font-medium` (new Date(trade.buyerCreatedAt).toLocaleDateString(undefined, {
                    dateStyle: 'short'
                })), ' and ', _$sinUmd_43 `span.text-gray-100.font-medium` ('Steam Level ', trade.buyerLevel)]), _$sinUmd_43 `.mb-10.font-medium.text-sm.text-gray-100` ('You have ', _$fastText_6(() => formatWithdrawExpire(deposit))
                    `span.ml-auto.font-numeric`, ' to send the trade'), progressWithdraw(deposit), __buttonGreen_72.large `.uppercase.w-200.mt-30.mx-auto` ({
                    onclick(e) {
                        window.open(trade.tradeUrl, '_blank', 'noreferrer')
                    }
                }, 'Create Trade'), __buttonLink_72.large `.uppercase.w-200.mt-10.mx-auto` ({
                    onclick(e) {
                        _$depositsModel_64.cancel(deposit);
                        onclose()
                    }
                }, 'Cancel Trade')]
            }, _$sinUmd_43 `h1.text-xl.font-extrabold.text-gray-200.uppercase.mx-auto.my-30` ('Loading...'))]))
        }
    })

    function progressWithdraw(deposit) {
        const delta = Date.parse(deposit.confirmExpireAt) - Date.parse(deposit.acceptedAt)
        const progress = Date.parse(deposit.confirmExpireAt) - Date.now()
        return _$sinUmd_43((deposit) => _$sinUmd_43 `div.progress.w-140.h-5.bg-gray-800.mb-5.overflow-hidden; br 3` (_$sinUmd_43 `div.progress.h-5.bg-green.w-1
      br 3
      transform scaleX(0)
      transform-origin 0
      animation ${delta}ms -${delta - progress}ms linear {
        from {
          transform scaleX(1)
        }
      }
    `))
    }

    function formatWithdrawExpire(item) {
        return new Date(Math.max(0, Date.parse(item.confirmExpireAt) - Date.now())).toISOString().substr(14, 5)
    };;;;;
    const {
        buttonGreen: __buttonGreen_65,
        buttonLink: __buttonLink_65
    } = _$button_4;;
    var _$depositsSidebar_65 = _$sinUmd_43(() => {
        const modals = []

        function opendetails(deposit) {
            const self = _$tradeReadyModal_72(deposit, () => {
                modals.splice(modals.indexOf(self), 1)
            })
            modals.push(self)
        }
        return () => _$sinUmd_43 `section.bg-gray-600.w-280.flex.flex-col.flex-none.sticky
    top 60
    height calc(100vh - 60px)
  ` ({}, [modals, _$sinUmd_43 `header.h-50.px-20.font-body.font-medium.text-sm.text-gray-100.bg-gray-500.items-center.flex` ({}, [`Deposits (${_$depositsModel_64.deposits.length})`, () => {
            if (_$depositsModel_64.deposits.some(depo => depo.state === 'withdrawn')) {
                return _$sinUmd_43 `.text-green-text.font-bold.uppercase.ml-auto.flex.flex-row.items-center` ('Confirm Trade', _$icons_8.attention `.ml-10.mb-px;w 14;h 14`)
            }
            if (_$depositsModel_64.deposits.some(depo => depo.state === 'expired')) {
                return _$sinUmd_43 `.text-red.font-bold.uppercase.ml-auto.flex.flex-row.items-center` ('Expired', _$icons_8.attention `.ml-10.mb-px;w 14;h 14`)
            }
        }]), _$sinUmd_43 `section.p-20.overflow-y-scroll.flex.flex-col
      flex: 1;
    ` (_$sinUmd_43(async() => {
            await _$depositsModel_64.load()
            return () => {
                if (_$depositsModel_64.deposits.length === 0)
                    return _$sinUmd_43 `.m-auto.self-center.text-center.font-bold.text-gray-200.text-sm.uppercase` ({
                        key: 'no-key'
                    }, [_$icons_8.lightning `.inline-block`, _$sinUmd_43 `` ('No active trades')])
                return _$depositsModel_64.deposits.map((deposit) => [_$sinUmd_43 `div.border-b.border-gray-400.mb-20
            :last-child {
              border none
            }
          ` ({
                    key: 'withdrawed:item-card:' + deposit.ref
                }, listing(deposit))])
            }
        }, _$sinUmd_43 `.m-auto.self-center.text-center.font-bold.text-gray-200.text-sm.uppercase` ({
            key: 'no-key'
        }, 'Loading...')))])

        function listing(deposit) {
            switch (deposit.state) {
                case 'listed':
                    return [_$itemCard_67({
                        onclick() {
                                deposit.disabled = true
                                _$depositsModel_64.cancel(deposit)
                            },
                            item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-row.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$spinner_11 `.mr-10`, 'Waiting for buyer...', _$fastText_6(() => formatDepositedWait(deposit))
                        `span.ml-auto.font-numeric`
                    ])]
                case 'withdrawn':
                    return _$sinUmd_43(({
                        opening = false
                    }) => () => [_$itemCard_67({
                        item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-15.font-medium.text-base.text-gray-100` ('Ready to start the trade?'), __buttonGreen_65.large `.w-1.uppercase.mb-20` ({
                        disabled: opening,
                        onclick() {
                            opening = true;
                            _$depositsModel_64.accept(deposit).then(() => {
                                opening = false;
                                opendetails(deposit)
                            })
                        }
                    }, 'Yes, I\'m ready'), _$sinUmd_43 `.mb-10.font-medium.text-sm.text-gray-100` ('Expires in ', _$fastText_6(() => formatAcceptExpire(deposit))
                        `span.ml-auto.font-numeric`), progressAccept(deposit), __buttonLink_65.medium `.w-1.uppercase` ({
                        onclick() {
                            _$depositsModel_64.cancel(deposit)
                        }
                    }, 'Cancel Trade')])])
                case 'confirmed':
                    return [_$itemCard_67({
                        item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-10.font-medium.text-sm.text-gray-200` ('The buyer has ', _$fastText_6(() => formatCompleteExpire(deposit))
                        `span.ml-auto.font-numeric.text-gray-100`, ' to accept the trade'), progressComplete(deposit)])]
                case 'accepted':
                    return [_$itemCard_67({
                        onclick() {
                                deposit.disabled = true
                                _$depositsModel_64.cancel(deposit)
                            },
                            item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-15.font-medium.text-base.text-gray-100` ('Ready to start the trade?'), __buttonGreen_65.large `.w-1.uppercase.mb-20` ({
                        onclick() {
                            opendetails(deposit)
                        }
                    }, 'See trade details'), _$sinUmd_43 `.mb-10.font-medium.text-sm.text-gray-100` ('Expires in ', _$fastText_6(() => formatConfirmExpire(deposit))
                        `span.ml-auto.font-numeric`), progressConfirm(deposit), __buttonLink_65.medium `.w-1.uppercase` ({
                        onclick() {
                            _$depositsModel_64.cancel(deposit)
                        }
                    }, 'Cancel Trade')])]
                case 'buyer_cancelled':
                    return [_$itemCard_67({
                        onclick() {
                                _$depositsModel_64.ack(deposit)
                            },
                            item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('Buyer cancelled the trade'), __buttonLink_65.medium `.w-1.uppercase` ({
                        onclick() {
                            _$depositsModel_64.ack(deposit)
                        }
                    }, 'Dismiss')])]
                case 'cancelled':
                    return [_$itemCard_67({
                        onclick() {
                                _$depositsModel_64.ack(deposit)
                            },
                            item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('Your trade was cancelled on Steam'), __buttonLink_65.medium `.w-1.uppercase` ({
                        onclick() {
                            _$depositsModel_64.ack(deposit)
                        }
                    }, 'Dismiss')])]
                case 'seller_cancelled':
                    return [_$itemCard_67({
                        onclick() {
                                _$depositsModel_64.ack(deposit)
                            },
                            item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('You cancelled your trade'), __buttonLink_65.medium `.w-1.uppercase` ({
                        onclick() {
                            _$depositsModel_64.ack(deposit)
                        }
                    }, 'Dismiss')])]
                case 'completed':
                    return [_$itemCard_67({
                        onclick() {
                                _$depositsModel_64.ack(deposit)
                            },
                            item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('The trade completed'), __buttonLink_65.medium `.w-1.uppercase` ({
                        onclick() {
                            _$depositsModel_64.ack(deposit)
                        }
                    }, 'Dismiss')])]
                case 'expired':
                    return [_$itemCard_67({
                        onclick() {
                                _$depositsModel_64.ack(deposit)
                            },
                            item: deposit.items[0]
                    }), _$sinUmd_43 `p.flex.flex-col.items-center.text-gray-200.text-sm.font-medium.my-15` ([_$sinUmd_43 `.mb-5.font-medium.text-base.text-gray-100` ('The trade expired'), __buttonLink_65.medium `.w-1.uppercase` ({
                        onclick() {
                            _$depositsModel_64.ack(deposit)
                        }
                    }, 'Dismiss')])]
            }
        }
    })

    function progressAccept(deposit) {
        const delta = Date.parse(deposit.acceptExpireAt) - Date.parse(deposit.withdrawnAt)
        const progress = Date.parse(deposit.acceptExpireAt) - Date.now()
        return _$sinUmd_43((deposit) => _$sinUmd_43 `div.progress.w-140.h-5.bg-gray-800.mb-15.overflow-hidden; br 3` (_$sinUmd_43 `div.progress.h-5.bg-green.w-1
      br 3
      transform scaleX(0)
      transform-origin 0
      animation ${delta}ms -${delta - progress}ms linear {
        from {
          transform scaleX(1)
        }
      }
    `))
    }

    function progressConfirm(deposit) {
        const delta = Date.parse(deposit.confirmExpireAt) - Date.parse(deposit.acceptedAt)
        const progress = Date.parse(deposit.confirmExpireAt) - Date.now()
        return _$sinUmd_43((deposit) => _$sinUmd_43 `div.progress.w-140.h-5.bg-gray-800.mb-15.overflow-hidden; br 3` (_$sinUmd_43 `div.progress.h-5.bg-green.w-1
      br 3
      transform scaleX(0)
      transform-origin 0
      animation ${delta}ms -${delta - progress}ms linear {
        from {
          transform scaleX(1)
        }
      }
    `))
    }

    function progressComplete(deposit) {
        const delta = Date.parse(deposit.completedExpireAt) - Date.parse(deposit.confirmedAt)
        const progress = Date.parse(deposit.completedExpireAt) - Date.now()
        return _$sinUmd_43((deposit) => _$sinUmd_43 `div.progress.w-140.h-5.bg-gray-800.mb-15.overflow-hidden; br 3` (_$sinUmd_43 `div.progress.h-5.bg-green.w-1
      br 3
      transform scaleX(0)
      transform-origin 0
      animation ${delta}ms -${delta - progress}ms linear {
        from {
          transform scaleX(1)
        }
      }
    `))
    }

    function formatAcceptExpire(item) {
        return new Date(Math.max(0, Date.parse(item.acceptExpireAt) - Date.now())).toISOString().substr(14, 5)
    }

    function formatConfirmExpire(item) {
        return new Date(Math.max(0, Date.parse(item.confirmExpireAt) - Date.now())).toISOString().substr(14, 5)
    }

    function formatCompleteExpire(item) {
        return new Date(Math.max(0, Date.parse(item.completedExpireAt) - Date.now())).toISOString().substr(14, 5)
    }

    function formatDepositedWait(item) {
        const delta = new Date() - Date.parse(item.depositedAt)
        if (delta >= 1000 * 60 * 60)
            return new Date(delta).toISOString().substr(11, 8)
        return new Date(delta).toISOString().substr(14, 5)
    }

    function filterPriceFn(range) {
        const {
            min, max
        } = filterPriceQuery(range)
        return function(item) {
            const price = item.price
            return price < max && price >= min
        }
    }

    function filterPriceQuery(range) {
        var min, max
        switch (range) {
            case '-1':
                min = 0;
                max = 0xffffffff;
                break
            case '0':
                min = 0;
                max = 5;
                break
            case '5':
                min = 5;
                max = 25;
                break
            case '25':
                min = 25;
                max = 100;
                break
            case '100':
                min = 100;
                max = 500;
                break
            case '500':
                min = 500;
                max = 0xffffffff;
                break
        }
        return {
            min,
            max
        }
    }
    var _$utils_73 = {
        filterPriceFn,
        filterPriceQuery
    };;
    const {
        buttonYellow: __buttonYellow_68
    } = _$button_4;
    var _$p2pDepositModal_68 = _$sinUmd_43(({
        open
    }) => {
        function onclose(e) {
            e.stopPropagation()
            open = false
        }
        let value = window.localStorage.getItem('steam:deposit:modal') === 'true'
        return () => {
            open = open != null ? open : window.localStorage.getItem('steam:deposit:modal') !== 'true'
            if (open === false)
                return ''
            return _$modal_10({
                onclose,
                className: 'p-40 pb-30 text-gray-200',
                    style: {
                        width: '500px'
                    }
            }, [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-30.flex.self-start` ('P2P Deposits'), _$sinUmd_43 `form.flex.flex-col.items-center.w-1` ({
                onsubmit(e) {
                    e.preventDefault();
                    window.localStorage.setItem('steam:deposit:modal', value);
                    onclose(e)
                }
            }, [_$sinUmd_43 `p.mb-20` ('You can deposit CS:GO items on this page.', _$sinUmd_43 `ul.list-disc.pl-20.my-5` (_$sinUmd_43 `li` ('CS:GO skin deposit and withdraw is completely P2P. Rollbit does not operate any bots'), _$sinUmd_43 `li` ('When your item is withdrawn, you will have 60 seconds to state you\'re ready.'), _$sinUmd_43 `li` ('Please make sure to verify the withdrawer\'s Steam registration date and level.'), _$sinUmd_43 `li` ('You should never receive offers from the withdrawer, including counter offers.'), _$sinUmd_43 `li` ('If a deposit expires or is cancelled, you can relist the item by dismissing it from the sidebar.'), _$sinUmd_43 `li` ('You should only create a single offer for each item you need to send and only send the exact item for that trade.'), _$sinUmd_43 `li` ('Do not change or revoke your API key during P2P trades.'))), _$sinUmd_43 `label.uppercase.text-sm.font-bold.text-gray-200.whitespace-no-wrap.mx-auto.flex.items-center.mt-10.mb-20` ([_$checkbox_5 `.mr-15;mt -2` ({
                checked: value,
                oninput(e) {
                    value = this.checked
                }
            }), 'Don\'t show again']), __buttonYellow_68.large `.px-20.uppercase` ({
                type: 'submit'
            }, 'Understood')])])
        }
    });;
    const {
        buttonYellow: __buttonYellow_69
    } = _$button_4;
    var _$p2pWithdrawModal_69 = _$sinUmd_43(({
        open
    }) => {
        function onclose(e) {
            e.stopPropagation()
            open = false
        }
        let value = window.localStorage.getItem('steam:withdraw:modal') === 'true'
        return () => {
            open = open != null ? open : window.localStorage.getItem('steam:withdraw:modal') !== 'true'
            if (open === false)
                return ''
            return _$modal_10({
                onclose,
                className: 'p-40 pb-30 text-gray-200',
                    style: {
                        width: '500px'
                    }
            }, [_$sinUmd_43 `h1.uppercase.text-xl.font-extrabold.text-gray-100.font-body.mb-30.flex.self-start` ('P2P Withdrawals'), _$sinUmd_43 `form.flex.flex-col.items-center.w-1` ({
                onsubmit(e) {
                    e.preventDefault();
                    window.localStorage.setItem('steam:withdraw:modal', value);
                    onclose(e)
                }
            }, [_$sinUmd_43 `p.mb-20` ('You can withdraw CS:GO items on this page.', _$sinUmd_43 `ul.list-disc.pl-20.my-5` (_$sinUmd_43 `li` ('CS:GO skin deposit and withdraw is completely P2P. Rollbit does not operate any bots'), _$sinUmd_43 `li` ('The depositor will send you a trade offer when they\'re ready.'), _$sinUmd_43 `li` ('Please only access the trade offer from this page, we\'ll let you know when it\'s ready.'), _$sinUmd_43 `li` ('You should never send a depositor an offer for their item, this includes counter offers.'), _$sinUmd_43 `li` ('Doing so can result in a ban from Rollbit\'s P2P system.'), _$sinUmd_43 `li` ('Do not change or revoke your API key during P2P trades.'))), _$sinUmd_43 `label.uppercase.text-sm.font-bold.text-gray-200.whitespace-no-wrap.mx-auto.flex.items-center.mt-10.mb-20` ([_$checkbox_5 `.mr-15;mt -2` ({
                checked: value,
                oninput(e) {
                    value = this.checked
                }
            }), 'Don\'t show again']), __buttonYellow_69.large `.px-20.uppercase` ({
                type: 'submit'
            }, 'Understood')])])
        }
    })
    var _$uiDeploy_15 = {};;;;;;
    document.body.style.margin = '0'
    document.body.style.backgroundColor = '#1A1C27'
    console.log('%cStop', 'font: 4em sans-serif; color: red; -webkit-text-stroke: 1px black;')
    console.log('%cThis is a browser feature intended for developers. Do not post anything unless you know what you are doing.', 'font: 2em sans-serif;')
    console.log('%cRunning any scripts here may lead to you being hacked, losing your funds or worse', 'font: 2em sans-serif; color: red;');;
    const Notifications = _$Notifications_24(_$websocket_28)
    _$balance_22.connect(_$websocket_28);;;;;;
    _$auth_21.setSocket(_$websocket_28)
    _$depositsModel_64.setSocket(_$websocket_28)
    _$websocket_28.connect()
    _$sinUmd_43.mount(({
        route
    }) => _$sinUmd_43 `main.font-body.antialiased.bg-gray-700.w-1
    mh 100vh

    display: grid;
    grid-template-areas:
      'header header'
      'chat body'
      'chat footer';
    grid-template-columns: 280px auto;
    grid-template-rows: 60px auto auto;
  ` ({}, [_$header_53({
        route
    }), _$chat_51, _$sinUmd_43 `section.body
      grid-area: body;
    ` (route({
        '/': _$xRoulette_82({}),
        '/x-roulette': () => route('/'),
        '/privacy-policy': _$privacyPolicy_76({}),
        '/terms-and-conditions': _$termsAndConditions_79({}),
        '/support': _$support_78({}),
        '/faq/api-key': _$apiKeyFaq_50({}),
        '/provably-fair': _$provablyFair_77({}),
        '/account': __guard_15(_$auth_21.profile != null, route, _$account_48({})),
        '/deposit': __guard_15(_$auth_21.profile != null, route, _$deposit_60({})),
        '/withdraw': __guard_15(_$auth_21.profile != null, route, _$withdraw_75({})(_$websocket_28)),
        '/r/:code': _$sinUmd_43(({
            code
        }) => () => {
            const prefix = window.location.protocol === 'https:' ? '__Secure-' : ''
            document.cookie = `${prefix}RollbitReferrer=${code};path=/`
            _$freeCoins_54.code = decodeURIComponent(code)
            route('/')
            return _$sinUmd_43 `div` ()
        })
    })), _$footer_52({
        route
    }), _$sinUmd_43 `div.notifications
      position absolute
      b 1rem
      r 1rem
    ` ({}, [...Notifications.notifications.map(n => _$sinUmd_43 `p

      ` ({}, n.message))]), _$tos_58.view, _$tip_57.view, _$tipSteam_56.view, _$mute_55.view]))

    function __guard_15(prop, route, view) {
        if (prop === false)
            return () => route('/', {
                replace: true
            })
        return view
    }
}());