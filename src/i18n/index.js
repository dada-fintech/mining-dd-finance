export default {
    en: {
        translation: {
            common: {
                connectWallet: 'Connect Wallet',
                walletConnected: 'Wallet Connected',
                viewAll: 'View All',
                apy: 'APY',
                invest: 'Invest',
                description: 'Description',
                editDescription: 'Edit Description',
                votes: 'Votes',
                next: 'Next',
                back: 'Back',
                pay: 'Pay',
                confirmInfo: 'Confirm',
                gasFeeHint: 'Please confirm the above information carefully,<br />you cannot modify the information after confirmation<br />It will cost a certain amount of gas fee to create.',
                upload: 'Upload',
                projectList: 'Project List',
                readTheDoc: 'Read the Docs',
                createNewProject: 'Create a New Project',
                toReadMore: 'View Projects',
                toLearnMore: 'To Learn More',
                participateGov: 'Participate in Governance',
                submitted: 'Submitted',
                approve: 'Approve',
                sureToDelete: 'Are you sure to delete?',
                confirm: 'Confirm',
                pass: 'Pass',
                reject: 'Reject',
                agree: 'Agree',
                disagree: 'Disagree',
                yourBalance: 'Your balance',
                yourBill: 'Your Bill',
                detail: 'Detail',
                joinNow: 'Join Now',
                viewProject: 'View project',
                startTime: 'Start Time',
                endTime: 'End Time',
                fundStartTime: 'Start Time',
                fundEndTime: 'End Time',
                redemption: 'Redemption',
                repaymentModel: 'Repayment Model',
                fundSize: 'Fund Size',
                softCap: 'Softcap',
                currentStage: 'Current Stage',
                nextStage: 'Next Stage',
                currentRaised: 'Current Raised',
                role: 'Role',
                changePlan: 'Change Plan',
                rulesBelow: 'Enter rules below',
                pdfRequired: '*Please upload in PDF format. The file will be displayed in the project details page. ',
                billHint1: 'You will be paying 0.5% of the hard cap in DADA for the auditing and verification fee. The fee is nonrefundable. ',
                billHint2: 'Creating smart contracts will cost a certain amount of Gas.  ',
                maxValue: 'Max value',
                standard: 'Static',
                customizable: 'Dynamic',
                days: 'd',
                hours: 'h',
                minutes: 'min',
                seconds: 'sec',
                noProcess: 'No processes yet.',
                notSameDay: 'You can not choose the same day',
            },
            template: {
                title: 'Choose a Governing Template',
                select: 'Select this template',
                fundraisingRules: 'Fundraising',
                unlockRules: 'Unlock',
                redemptionRules: 'Redemption',
                open: {
                    desc: 'Flexibly customize your project in multiple links such as fundraising, voting, redemption, etc.',
                    1: 'After approval, you can start fundraising',
                    2: '*Choose one of the two: Conditional, set voting conditions. Unconditional, you can ask for money after fundraising is completed',
                    3: 'After the fundraising is completed, set the method and time for repayment of principal and interest'
                },
                close: {
                    desc: 'Use standardized templates to create projects more easily',
                    1: 'Set the fundraising start date (5 days are reserved for review, fundraising will start after 5 days at the earliest)',
                    2: 'Set unlock time and voting period',
                    3: 'Pre-set the payment date'
                }
            },
            hint: {
                projectsEmpty: 'New project is in preparation, stay tuned.',
                pleaseInputEmail: 'Please enter your email address',
                subscribeSuccess: 'Subscribed!',
                lockAmount: 'Please enter lock amount',
                approve: 'Please approve before action',
                leaveComment: 'Please leave comment',
                actionSuccess: 'Success',
                detailHint: 'Please do not use your centralized exchange address to make transfers to the above address, it may lead  to some unpredictable results.',

            },
            modal: {
                repayTitle: 'Repay',
                youNeedPay: 'You need to pay',
                payInsurance: 'Pay Insurance',
                insuranceHint: `
                Your project is about to start, you need to pay 10% of the raised amount of DADA as the project deposit. <br />After the project is completed, 25% of the cost will be charged as insurance expenses, and the remaining 75% of the deposit will be returned.`,
                confirmVoting: 'Confirm voting',
                confirmChangeVoting: 'Confirm Change Voting',
                auditTitle: 'Auditing Reviews ',
                auditHint: `
                Please evaluate the project on the information provided. <br/>
                Projects that passed the audit will be insured by SAFD. <br/>
                Projects that did not pass the audit will be canceled. 
                `,

            },
            homepage: {
                subtitle: 'Decentralized Platform for Mining Ecosystem',
                banner: {
                    feature: {
                        1: 'Decentralized Autonomous Organization ',
                        2: 'Funds locked in Smart Contract',
                        3: 'Integrate Off-chain Resources ',
                        4: 'Establish a DID Reputation Network',
                        5: 'Transparency in Logistics',
                        6: 'Bridging Crypto Mining with the Traditional World'
                    }
                },
                inFundraisingTitle: 'Ongoing Projects',
                inFundraising: {
                    1: 'Select High-Quality Projects',
                    2: 'Conduct Thorough Due Diligence',
                    3: 'Verification based on unique IDs',
                    4: 'Endorsement from the DID Reputation Network',
                    5: 'Comprehensive Project Business Strategy',
                    6: 'High ROI with Easy Onboarding'
                },
                onGoingTitle: 'Fund Release',
                onGoing: {
                    1: 'Autonomous Governance via Voting throughout the Processes ',
                    2: 'Decentralized Participation in the Project Decision-Making',
                    3: 'Easy Transfer of Project’s Participation Right',
                    4: 'Safe Asset Custody via Multisig wallets',
                    5: 'Project Transparency',
                },
                safd: {
                    title: 'About SAFD',
                    subtitle: 'SAFD is DADA’s settlement system designed to ensure investors’ principals.  We set up a treasury reserve to protect your investment. ',
                    slogan: {
                        1: 'We Safeguard and Facilitate the',
                        2: 'Community-driven DID Reputation Network.  ',
                    }
                },
                contact: {
                    title: 'Contact Us',
                    desc: `Interested in learning more about what we do or working together? Please feel free to contact us or fill out the form. Our team is ready to help you every step of the way.`,
                    thanks: 'Thank you for your support!',
                    form: {
                        lastName: 'Last Name',
                        firstName: 'First Name',
                        email: 'Email',
                        message: 'Message',
                        checkHint: 'Check to receive project updates '
                    }
                },
                footer: {
                    documentation: 'Documentation',
                    explore: 'Explore',
                }
            },
            sidebar: {
                myShare: 'My Share',
                allShare: 'All the Shares',
                investment: 'Investment ',
                return: 'Return',
                redemption: 'Redemption Date',
                cycle: 'Project Cycle',
                gains: 'Accrued Gains',
                redeemable: 'Redeemable',
                documents: 'Documents',
                months: 'Months',
                subscribe: 'Subscribe',
                enterEmail: 'Please enter email address',
                bonus: 'Bonus',
                cryptoMining: 'Crypto Mining',
                miningSwap: 'Mining Swap',
                dashboard: 'Dashboard',
                overview: 'Overview',
                quickSwap: 'Quick Swap',
                governance: 'Governance',
                create: 'Create Project',
                blog: 'Blog',
            },
            banner: {
                title: 'Mining Ecosystem Aggregator',
                subtitle: 'DADA Community Selects the Best Project for You'
            },
            feature: {
                1: {
                    title: 'Create A Project',
                    desc: 'Create a high-quality project for the investors'
                },
                2: {
                    title: 'Participate in the Investment',
                    desc: 'Find a good project will win you more profit!'
                },
                3: {
                    title: 'Governance Voting',
                    desc: 'Vote for the project you support and participate in the governing to move the project forward.  '
                }
            },
            onGoingProjects: 'The On-going Projects',
            project: {
                progress: 'Progress',
                details: 'Details',
                vote: 'Vote',
                comments: 'Comments',
                votePeriod: 'Vote Period',
                unlockingAmount: 'Unlocking Amount',
                unlockingPercent: 'Unlocking Percent',
                unlockingTime: 'Unlocking Time',
                voteTime: 'Vote Time',
                event: 'Event',
                voteResult: 'Vote Result',
                approve: 'Approve',
                object: 'Object',
                fundRaised: 'Fund Raised',
                hardCap: 'Hard Cap',
                status: 'Status',
                roles: 'Roles',
                launchTime: 'Launch Time',
                name: 'Project Name',
                role: {
                    manager: 'Fund Manager',
                    supporter: 'Fund Constituent',
                    committee: 'Committee Member',
                    visitor: 'Visitor',
                },
                category: {
                    ongoing: 'On-going',
                    completed: 'Completed',
                    open: 'Available',
                    announced: 'Announced - in audit'
                },
                action: {
                    committeeReviews: 'Committee Reviews',
                    security: 'Pay Deposit',
                    lock: 'Lock',
                    change: 'Initiate Voting to Change the Process',
                    repay: 'Repay',
                    invest: 'Invest',
                }

            },
            createProject: {
                hint: `<div class="h1">Create a New Project</div>
                Next, we will guide you through filling in the project information and governance rules. We will create a new smart contract using the information you submitted. <br/><br/>
                Please make sure the information is authentic. Once filled in, it is unchangeable.<br /><br /><br/>
                <div class="hint-block">
                Notice: set aside 0.5% of funds raised in DADA token to pay for the auditing fees to the community. <br/>
                After the fundraise completes, contribute 10% of the hard cap fund size in DADA token to the security deposit. We will return a major part of your security fund after the project completes. 
                </div>
                `,
                closeGovernRule: `
                <div>You have filled in the basic information. <br/>
                Next, we guide you through setting the <span class="red">governance rules</span> for the project. </div>
                <br/>
                <div>
                <strong>First, here is a template for the core steps: </strong><br/>
                1.Auditing Phase: All submitted projects need to be approved by the professional committee before moving to the next stage (within 5 days after creation).<br/>
                2.Fundraising Phase: Within 3 days after the fundraise completes, 10% of the hard cap should be paid in DADA before moving on to the next phase.<br/>
                3.Governance Phase: According to the rules on capital unlock, you need to get over 50% approval votes (abstaining from voting is considered as approval by default) in order to move to the next phase.<br/>
                </div>
                <img class="govern-rule-img" src="/govern-rule-img-en.svg"/>
                <div>
                <strong>Next: you need to set certain important dates: </strong><br/>
                    1.tarting date of the fundraise: it needs to be 5 days after the date that the project is created. <br/>
                    2.Ending date of the fundraise: as soon as the fundraise ends, the calculation of the profits starts. <br/>
                    3.Voting Dates: the first capital unlock does not require voting. <br/>
                    4.Voting Dates for Unlocking the Capitals: preset the first capital unlock date; the following capital unlocks occur after the voting ends.<br/>
                    5.Redemption Date: send the principal and profits to the smart contract address, so that the investors can redeem their assets. <br/>
                </div>
            `,
                openGovernRule: `
            <div>You have filled in the basic information. <br/>
            Next, we guide you through setting the <span class="red">governance rules</span> for the project. </div>
            <br/>
            <div>
            <strong>First, here is a template for the core steps: </strong><br/>
            1.Auditing Phase: All submitted projects need to be approved by the professional committee before moving to the next stage (within 5 days after creation).<br/>
            2.Fundraising Phase: Within 3 days after the fundraise completes, 10% of the hard cap should be paid in DADA before moving on to the next phase.<br/>
            3.Governance Phase: According to the rules on capital unlock, you need to get over 50% approval votes (abstaining from voting is considered as approval by default) in order to move to the next phase.<br/>
            </div>
            <img class="govern-rule-img" src="/govern-rule-img-en.svg"/>
            <div>
            <strong>Next: you need to set certain important dates:</strong><br/>
            1.tarting date of the fundraise: it needs to be 5 days after the date that the project is created. <br/>
            2.Ending date of the fundraise: as soon as the fundraise ends, the calculation of the profits starts. <br/>
            3.Redemption Date: send the principal and profits to the smart contract address, so that the investors can redeem their assets. <br/>
            </div>
            `,
                step1Hint: 'This form will be displayed on the project details page. All the information below is required. Please fill in your Business Plan and upload it as a PDF. ',
                step2Hint: `
                This form configures the token representing the proof of stake of your project. You could obtain this token through fundraising. <br />
                This protocol endows the project investors with the majority of governance authority, to protect their rights and interests. <br />
                The voting for change of the process must be initiated by the fund managers or members of the board of directors.  
                `,
                step3Hint: `
                This setting configures the project’s stage goals and unlock rules. Please fill in the unlock plan by stages according to the business plan. <br/>
                Fill in the time period for voting and unlock date. You could only add changes to plans in the middle of the process. Please budget time for it. This is a critical part of governance.  
                `,
                step4Hint: `
                This setting configures the basic information of the project and determines the total supply of the Proof of Stake token on our platform. All the fee is calculated using the hard cap fund size as the parameter.  
                `,
                contractAddress: 'Contract Address',
                projectName: 'Project Name',
                projectNameHint: '*Create an eye-catching name for people to find it easily ',
                projectIntro: 'Project Introduction',
                projectIntroHint: '*Briefly introduce your project and its advantages, etc. ',
                within140: 'Within 140 words',
                projectEmail: 'Project Subscription Email',
                projectEmailHint: '*Fill in a verifiable email to receive notifications from the platform throughout the project. ',
                managerName: 'Fund Manager Name',
                managerNameHint: 'Please feel in your legal name. This information will be recorded in the DID Credential Network.',
                managerBio: 'Fund Manager Bio',
                projectDetails: 'Project Details',
                projectDetailsHint: 'Put in project description in details',
                projectStrategy: 'Project Strategy ',
                projectStrategyHint: 'Please introduce the revenue strategy in detail. ',
                uploadPlan: 'Upload the Business Plan ',
                whitepaper: 'Whitepaper',
                nameOfToken: 'Project Token Name',
                addWallet: 'Add the Wallet Address for Holding the Fund',
                addWalletHint: 'This is your only address for holding the Fund.',
                profitAddr: 'Profit Address',
                profitAddrHint: 'This is your only address for holding the Fund.',
                boardMembers: 'Members of the Board of Directors',
                boardMembersHint: 'Add no more than 3 addresses, or leave it blank. This address has the authority to create voting to change the project processes and upload attachments for the projects. ',
                managerAddress: 'Fund Manager Wallet Address (Multisig)',
                managerAddressHint: '*This address is the only depositing address assigned for this project. Our smart contract deposits funds raised into this address according to the rules. Once submitted, this address cannot be changed.',
                profitAddress: 'Mining Profits Wallet Address (Multisig) ',
                profitAddressHint: '*This is the address for depositing the mining profits. Please fill in a verifiable multisig wallet. It cannot be changed once submitted. ',
                sureToDelete: 'Are you sure to delete?',
                fundraisingPeriod: 'Fundraising Period',
                fundraisingPeriodHint1: 'Please confirm the starting and ending date of your fundraising ',
                fundraisingPeriodHint2: '*The Project Committee auditing period takes 5 days. The fundraising kick-start date should be 5 calendar days after the project is created.  ',
                fundraisingGoal: 'Fundraising Goal',
                fundraisingGoalHint: ' This is the soft cap of the fund raised for this project.',
                fundraisingLimit: 'Fundraising Limit',
                fundraisingLimitHint: 'This is the hard cap of this fundraising campaign.',
                fundraisingLimitHint2: '*The auditing fee and security deposit are based on the hard cap fund size. ',
                softCap: 'Soft Cap',
                softCapHover: 'The minimum amount of funds needed to kick start the project. ',
                redemptionDate: 'Redemption Date',
                redemptionDateHint: '*Redemption date is the day principal and profits withdrawal is open for the users. Please complete the payback before the redemption date.',
                redemptionDateHover: 'interest bearing period = redemption date - fundraise end date',
                assetsRuleHint: 'Set the unlock rules according to your fundraising plans. ',
                unlockDate: 'Unlock date',
                unlockDateHover: 'This date is the unlock date for the contract to release funds for this stage',
                shares: 'Shares',
                sharesHover: 'The released amount for this stage ',
                votingDate: 'Voting Date',
                votingDateHover: 'This is the time frame for voting. As soon as the voting ends, the fund for this stage will be released. ',
                additionalDoc: 'Additional Documents',
                additionalDocHint: "Please upload other relevant documents, including the whitepaper, photos, manager's portfolio, etc. ",
                projectInfo: 'Project Info',
                tokenName: 'Token Name',
                fundAddress: 'Fund Holding Address',
                councilAddress: 'Council Member Address',
                confirm1: 'Basic Information on the Project',
                confirm2: 'Governance Information on the Project ',
                confirm3: 'Capital Unlock Rules ',
                // payHint: 'Buy DADA amounts to 0.5% of your total funds needed for the fundraising, and submit the proposal to the DADA DAO Committee for approval and verification. ',
                backHome: 'Home',
                paySuccess: 'Success',
                paySuccessHint: `
                Your project has been uploaded to the Ethereum network. Allow one to 10 minutes for the contracts to be generated. <br/><br/>
                An email will be delivered to your mailbox after the contract is created. 
                `,
                payFailed: 'Failed',
                payFailedHint: `
                Please check your transaction history to find the reason.
                `,
                selectFundraisingMethod: 'Select a Fundraising Method',
                setFundraiseDate: 'Set the Fundraise Date',
                setFundraiseTimeframe: ' Set the Fundraise Timeframe',
                selectFundraisingMethodHint1: 'Once confirmed, the date can not be changed.',
                selectFundraisingMethodHint2: 'Once confirmed，it will start automatically after auditing.',
                selectRedemptionMethod: 'Select a Redemption Method ',
                selectRedemptionMethodValue1: 'Repay capital with interest on the set date',
                selectRepaymentMethod: 'Select a Repayment Method ',
                selectRepaymentMethodHint: 'Redeem as the Fund Manager Repays',
                selectRepaymentMethodHint2: '*A full loan is triggered after the deposit is paid within 3 days of the fundraising. Regular fundraising: The deposit is paid within 3 days after the fundraising is completed, and the full amount is released after 3 days.',
                conditionalRedemption: 'Conditional redemption',
                unconditionalRedemption : 'Unconditional redemption ',
            },
            createVote: {
                hint: `<div class="h1">Create a Voting On a Change in the Process</div>
                Next, we will guide you through editing the project’s governance rules. We will create a new voting poll using the information you submitted. <br/><br/>
                Please make sure the information is authentic. Once filled in, it is unchangeable. <br/><br/><br/>
                <div class="hint-block">
                Notice: elaborate on the reasons when creating a voting poll on changing the project’s process. The change will only take place when you obtain over ⅔ votes in support <strong>(Those who abstained from voting are counted as opponents)</strong>.<br/>
                Notice: Your voting poll on changing the project’s process will take one day for the announcement. Please make sure to set the voting time before the next step starts, or the smart contract may fail to launch.   
                </div>
                `,
                step1Hint: `
                This setting configures the project’s stage goals and unlock rules. Please edit the unlock plan according to the business plan. <br/>
                *The Voting to Change the Plan takes four days. (One day for the announcement, three days for the voting period.) Plans that are completed can not be changed. 
                `,
                mainTitle: 'Information on Voting to Change the Plan',
                votingPeriod: 'Voting Period',
                descriptionOfChange: 'The description of the Change',
                uploadDoc: 'Upload other documents',
                projectInfo: 'Project Info',
                additionalDoc: 'Additional Documents',
                editDescription: 'Edit Description',
            },
            projectList: {
                title: 'Project List',
                slogan1: 'Select High-quality Projects',
                slogan2: 'Make Your Money Work for You '
            },


        }
    },
    zh: {
        translation: {
            common: {
                connectWallet: '连接钱包',
                walletConnected: '钱包已连接',
                viewAll: '查看详情',
                apy: '年化收益率',
                invest: '投资',
                description: '描述',
                editDescription: '编辑描述',
                votes: '投票',
                next: '下一步',
                back: '上一步',
                pay: '支付',
                confirmInfo: '确认信息',
                gasFeeHint: '请认真确认以上信息，确认后无法修改信息<br />创建项目将会耗费一些 Gas fee',
                upload: '上传',
                projectList: '项目列表',
                readTheDoc: '阅读文档',
                createNewProject: '创建新项目',
                toReadMore: '查看更多',
                toLearnMore: '了解更多',
                participateGov: '参与治理',
                submitted: '已提交',
                approve: '授权',
                sureToDelete: '确定删除吗?',
                confirm: '确定',
                pass: '通过',
                reject: '拒绝',
                agree: '同意',
                disagree: '拒绝',
                yourBalance: '余额',
                yourBill: '您需要支付',
                detail: '详情',
                joinNow: '立即参与',
                viewProject: '查看项目',
                startTime: '开始时间',
                endTime: '结束时间',   
                fundStartTime: '众筹开始时间',
                fundEndTime: '众筹结束时间',
                redemption: '到期还本付息',
                repaymentModel: '收益方式',
                fundSize: '项目总额',
                softCap: '目标总额',
                currentStage: '当前阶段',
                nextStage: '下一阶段',
                currentRaised: '当前投资',
                role: '角色',
                changePlan: '变更计划',
                rulesBelow: '下方填写释放规则',
                pdfRequired: '*该文件将会展示在项目详情页中,文件需PDF格式',
                billHint1: '即将支付最大募集金额0.5%的等值DADA用于审计/验证费用，该费用一经支付不再退还。',
                billHint2: '创建合约时将会消耗一定的Gas。',
                maxValue: '最大值',
                standard: '标准版',
                customizable: '定制版',
                days: '天',
                hours: '时',
                minutes: '分',
                seconds: '秒',
                noProcess: '暂无进程。',
                notSameDay: '不可选择同一天',
            },
            template: {
                title: '请选择一个治理模版',
                select: '选择该模版',
                fundraisingRules: '筹款',
                unlockRules: '释放',
                redemptionRules: '赎回',
                open: {
                    desc: '在筹款、投票、赎回等多个环节灵活定制你的项目',
                    1: '审核通过，即可开始筹款',
                    2: '*二选一：有条件，设置投票请款条件。无条件，筹款完成后即可请款',
                    3: '筹款完成后，设定回本付息方式和时间'
                },
                close: {
                    desc: '使用标准化模板，更加简便地创建项目',
                    1: '设置筹款开始日期（预留5天审核，最快5天后开始筹款）',
                    2: '设置解锁时间和投票期',
                    3: '预先设定回本付息日期'
                }
            },
            hint: {
                projectsEmpty: '项目即将来临，请保持关注。',
                pleaseInputEmail: '请输入邮箱',
                subscribeSuccess: '订阅成功',
                lockAmount: '请输入锁定金额',
                approve: '请在操作前进行授权',
                leaveComment: '请填写专业意见',
                actionSuccess: '操作成功',
                detailHint: '请不要使用交易所地址向以上地址内转账，可能会出现无法预估的后果',

            },
            modal: {
                repayTitle: '项目回款',
                youNeedPay: '你需要支付',
                payInsurance: '支付保证金',
                insuranceHint: `
                您的项目即将启动，您需要支付募集额度10%的DADA作为项目抵押金。<br />项目完成后，将会收取其中25%的费用作为保险费用，返回剩余75%的押金。`,
                confirmVoting: '确认投票',
                confirmChangeVoting: '确认变更投票',
                auditTitle: '审计意见',
                auditHint: `
                请您根据项目详情对项目进行评价，并做出判断<br />
                通过审核的项目将会得到押金承保<br />
                未通过审核的项目将会撤销项目
                `,

            },
            homepage: {
                subtitle: '去中心化项目发布平台',
                banner: {
                    feature: {
                        1: '去中心化自治',
                        2: '锁定合约规则',
                        3: '整合链下资源',
                        4: '构建声誉网络',
                        5: '全链路透明',
                        6: '让矿圈出圈'
                    }
                },
                inFundraisingTitle: '可参与项目',
                inFundraising: {
                    1: '甄选品质项目',
                    2: '充分尽职背调',
                    3: '唯一身份验证',
                    4: '声誉网络背书',
                    5: '详尽项目策略',
                    6: '收益更轻松'
                },
                onGoingTitle: '进行中项目',
                onGoing: {
                    1: '全程投票自治',
                    2: '参与项目决策',
                    3: '权益转让自由',
                    4: '资产托管安全',
                    5: '信息更透明',
                },
                safd: {
                    title: '关于押金（SAFD）',
                    subtitle: '押金（SAFD）是DADA推出的一项为保障投资人本金而设立的专项赔付体系，为此我们做了充足的准备，为每一位投资人提供最安心的投资保障。',
                    slogan: {
                        1: '为共同构建最优质的信誉体系',
                        2: '提供最充足的保障',
                    }
                },
                contact: {
                    title: '联系我们',
                    desc: `如果您对我们感兴趣<br />
                    如果您对我们有建议<br />
                    如果您对我们有帮助<br /><br />
                    欢迎联系我们！`,
                    thanks: '非常感谢您对我们的支持！',
                    form: {
                        lastName: '姓',
                        firstName: '名',
                        email: '邮箱',
                        message: '留言',
                        checkHint: '勾选时将会接受新项目推送'
                    }
                },
                footer: {
                    documentation: '阅读文档',
                    explore: '发现更多',
                }
            },
            sidebar: {
                myShare: '我的份额',
                allShare: '所有份额',
                investment: '投资份额',
                return: '累计收益',
                redemption: '赎回日期',
                cycle: '项目周期',
                gains: '收益状态',
                redeemable: '可赎回',
                documents: '文件',
                months: '个月',
                subscribe: '订阅',
                enterEmail: '请输入邮箱',
                bonus: '累计奖励',
                cryptoMining: '矿业项目',
                miningSwap: '权益交易',
                dashboard: '数据面板',
                overview: '数据总览',
                quickSwap: '代币闪兑',
                governance: '治理社区',
                create: '发起项目',
                blog: '博客',
            },
            banner: {
                title: '矿业生态聚合器',
                subtitle: 'DADA社区为您甄选最好的项目'
            },

            feature: {
                1: {
                    title: '创建项目',
                    desc: '如果您是基金发起人，可以点击这里发起一个新的项目'
                },
                2: {
                    title: '参与投资',
                    desc: '找到一个好的投资，将为您产生更多的收益!'
                },
                3: {
                    title: '投票治理',
                    desc: '投票支持你投资的项目，治理推动项目进程。'
                }
            },
            onGoingProjects: '进行中的项目',
            project: {
                progress: '进程',
                details: '详情',
                vote: '投票',
                comments: '评论',
                unlockingAmount: '解锁数额',
                votePeriod: '投票时段',
                unlockingPercent: '解锁比例',
                unlockingTime: '解锁时间',
                voteTime: '投票时段',
                event: '进程说明',
                voteResult: '投票结果',
                approve: '支持',
                object: '反对',
                fundRaised: '已完成',
                hardCap: '上限',
                status: '状态',
                roles: '角色',
                launchTime: '发起时间',
                name: '项目名称',
                role: {
                    manager: '项目管理人',
                    supporter: '项目贡献者&支持者',
                    committee: '委员会成员',
                    visitor: '游客',
                },
                category: {
                    ongoing: '运行中',
                    completed: '已完成',
                    open: '可参与',
                    announced: '公示中-审核期'
                },
                action: {
                    committeeReviews: '审核评议',
                    security: '支付保证金',
                    lock: '立即锁定',
                    change: '发起变更投票',
                    repay: '项目回款',
                    invest: '投资',
                }

            },
            createProject: {
                hint: `<div class="h1">现在开始创建一个项目</div>
                接下来，您将根据引导填写完整的项目信息与治理规则，我们将会根据您所填写的信息创建一个新的智能合约。<br/><br/>
                请务必保证数据真实准确，您所填写信息一经提交无法更改<br /><br /><br/>
                <div class="hint-block">
                    注意：您提交项目时需要准备好所募集金额0.5%的等值DADA用于支付给社区，用于提交项目的审计/验证。<br/>
                    筹集目标达成后，您将需要准备好最大募集金额10%的等值DADA用于项目启动保证金，该资金将会于项目完成后返还部分。
                </div>
                `,
                closeGovernRule: `
                    <div>很好！您已经完成了基本信息的录入。<br/>
                    接下来，将会引导您设定项目的<span class="red">治理规则</span>。</div>
                    <br/>
                    <div>
                    <strong>首先，需要了解治理规则的基本模板</strong><br/>
                        1.审批阶段：所有提交的项目均需要通过专业委员会审批通过方可进入下一阶段（创建后5天内）。<br/>
                        2.筹款阶段：筹款完成的3天内，需要支付项目筹集最大额度10%的DADA方可进入下一阶段。<br/>
                        3.治理阶段：根据设定的款项释放规则，每次需要获得50%以上的同意票（未参与投票默认视为同意），方可进入下一阶段。<br/>
                    </div>
                    <img class="govern-rule-img" src="/govern-rule-img.svg"/>
                    <div>
                    <strong>其次，以下为需要设定的日期</strong><br/>
                        1.筹款开始日期：需为创建日期5天后。<br/>
                        2.筹款结束日期：筹款结束后，项目开始计算收益。<br/>
                        3.治理阶段各投票日期：首次款项释放无需投票。<br/>
                        4.治理阶段各款项释放日期：首次款项释放需要设定，后续款项释放均为投票结束时。<br/>
                        5.赎回日期：赎回日期前需将本金及收益打入合约地址，以便于投资人赎回本金及收益。<br/>
                    </div>
                `,
                openGovernRule: `
                <div>很好！您已经完成了基本信息的录入。<br/>
                接下来，将会引导您设定项目的<span class="red">治理规则</span>。</div>
                <br/>
                <div>
                <strong>首先，需要了解治理规则的基本模板</strong><br/>
                    1.审批阶段：所有提交的项目均需要通过专业委员会审批通过方可进入下一阶段（创建后5天内）。<br/>
                    2.筹款阶段：筹款完成的3天内，需要支付项目筹集最大额度10%的DADA方可进入下一阶段。<br/>
                    3.治理阶段：根据设定的款项释放规则，每次需要获得50%以上的同意票（未参与投票默认视为同意），方可进入下一阶段。<br/>
                </div>
                <img class="govern-rule-img" src="/govern-rule-img.svg"/>
                <div>
                <strong>其次，以下为需要设定的日期</strong><br/>
                    1.筹款开始日期：需为创建日期5天后。<br/>
                    2.筹款结束日期：筹款结束后，项目开始计算收益。<br/>
                    3.赎回日期：赎回日期前需将本金及收益打入合约地址，以便于投资人赎回本金及收益。<br/>
                </div>
                `,
                step1Hint: '这些设置都将展示在项目详情页中，所有设置均为必填项，请规范项目计划书的内容，并确保为PDF格式，我们将会把您上传的内容全部展示出来。',
                step2Hint: `
                这项设置将会配置代表该项目的代币，该代币将可以通过投资筹款来获得。<br />
                本合约协议体系将会把大部分治理权限授予项目投资人，以保护他们的权益。<br />
                然而，为了避免一些情况的发生，本项目的变更投票决定必须由发起人或者理事成员公开发起。
                `,
                step3Hint: `
                这些设置将会配置该项目的基础信息，并确定代币分发总额，所有的计费参数均以最高募集金额作为基准。<br />
                为确保项目顺利开展，请认真填写项目收益情况，该设置为项目承诺收益。
                `,
                step4Hint: `
                这些设置是用来配置项目的阶段性进展与解锁规则，请根据项目计划分阶段填写解锁计划。<br />
                关于投票期限及解锁日期请认真填写，所有的变更计划只能在进程间添加，请预留充足的时间并做好计划。<br />
                该环节为项目治理的重要环节，请务必认真填写。<br />
                `,
                contractAddress: '合约地址',
                projectName: '项目名称',
                projectNameHint: '*为项目创建一个醒目的名字以便人们找到它',
                projectIntro: '项目简介',
                projectIntroHint: '*简单介绍项目的概况、优势等，该字段将会推送到项目首页，限制字数140字内',
                within140: '限制140字以内',
                projectEmail: '项目发起人邮箱',
                projectEmailHint: '*该邮箱将会用于接收项目的各阶段推送消息',
                managerName: '项目发起人姓名',
                managerNameHint: '*请填写真实信息，该信息将会记录到声誉系统中',
                managerBio: '项目发起人简介',
                projectDetails: '项目详情',
                projectDetailsHint: '*详细描述项目相关细节，该字段将会展示在项目详情中，不限字数',
                projectStrategy: '项目策略',
                projectStrategyHint: '*请详细介绍该项目收益策略，该字段将会展示在项目详情中，不限字数',
                uploadPlan: '上传项目计划书',
                whitepaper: '白皮书文件',
                nameOfToken: '项目代币名称',
                addWallet: '添加基金持有地址',
                addWalletHint: '此地址将是持有本基金的唯一地址。',
                profitAddr: '项目收益地址',
                profitAddrHint: '该地址为项目盈利的收款钱包地址，务必选择可验证的多方共管钱包地址，无法变更',
                boardMembers: '添加理事会成员地址',
                boardMembersHint: '最多可添加3个地址，该地址仅具有创建变更提案投票、上传项目附件的权限，可为空',
                managerAddress: '项目经理收款地址',
                managerAddressHint: '*该地址将作为项目唯一指定收款地址，无法更改',
                profitAddress: '项目收益地址（共管钱包）',
                profitAddressHint: '*该地址为项目收益地址，矿池收款地址，务必为可验证的多签共管钱包地址，无法更改',
                sureToDelete: '确定删除吗?',
                fundraisingPeriod: '筹款期限',
                fundraisingPeriodHint1: '确认筹款开始及结束的日期。',
                fundraisingPeriodHint2: '*项目专业委员会审核期为5天，筹款开始时间需为5个自然日后',
                fundraisingGoal: '筹款目标',
                fundraisingGoalHint: '这是该项目的最低筹资限额。',
                fundraisingLimit: '最高募集金额',
                fundraisingLimitHint: '作为该项目的最大募集总额',
                fundraisingLimitHint2: '*审计费用、保证金费用均以该额度作为基准数据',
                softCap: '最低启动金额',
                softCapHover: '筹款额道道该目标后视为筹集成功',
                redemptionDate: '赎回时间（还本付息）',
                redemptionDateHint: '*赎回日期为开放用户提取收益的时间，请务必于该日期前完成收益回款',
                redemptionDateHover: '计息周期=赎回日期-募集截至日期',
                assetsRuleHint: '请根据您的募资计划配置基金解锁规则。',
                unlockDate: '解锁时间',
                unlockDateHover: '该日期为本阶段合约放款日期',
                shares: '份额',
                sharesHover: '本阶段放款金额',
                votingDate: '投票期',
                votingDateHover: '该时期为本阶段治理投票的时间区间，投票结束即可领取阶段款项',
                additionalDoc: '上传其他文件',
                additionalDocHint: '*添加更多其他关于项目的证明文件，包括但不限于项目计划书、合规性文件、业绩证明、身份证明等，可以为您的项目顺利开展提供更多的支持。',
                projectInfo: '项目信息',
                tokenName: '项目币名称',
                fundAddress: '基金持有地址',
                councilAddress: '理事会成员地址',
                confirm1: '项目基础信息',
                confirm2: '项目治理信息',
                confirm3: '资金解锁计划',
                // payHint: `您需要购买/募集所需募集金额的0.5%的${config.usdUnit}，将提案提交给治理委员会进行批准/验证。`,
                backHome: '返回首页',
                paySuccess: '支付成功',
                paySuccessHint: `
                您的项目已经上传至以太坊网络中，合约创建时间预计需要1~10分钟<br /><br />
                            创建成功后将会给推送邮件至您的邮箱中
                `,
                payFailed: '支付失败',
                payFailedHint: `
                请查询链操作记录查看原因
                `,
                selectFundraisingMethod: '选择筹款方式',
                setFundraiseDate: '定期筹款',
                setFundraiseTimeframe: '定时筹款',
                selectFundraisingMethodHint1: '*确定筹款日期，无法提前或延后',
                selectFundraisingMethodHint2: '*确定筹款期限，审核通过自动开始',
                selectRedemptionMethod: '选择回款方式',
                selectRedemptionMethodValue1: '到期还本付息',
                selectRepaymentMethod: '选择取款方式',
                selectRepaymentMethodHint: '*筹款完成并于3天内支付押金后，发起取款投票，同意票数66%则完成放款。可分为多阶段，多次放款。',
                selectRepaymentMethodHint2: '*定时筹款：筹款完成3天内支付押金后触发全额放款。定期筹款：筹款完成3天内支付押金，3天期满全额放款。',
                conditionalRedemption: '有条件取款',
                unconditionalRedemption : '无条件',
            },
            createVote: {
                hint: `<div class="h1">现在开始创建一个变更投票</div>
                接下来，您将根据引导修改项目的治理规则，我们将会根据您所填写的信息创建一个新的治理投票。<br/><br/>
                请务必保证数据真实准确，您所填写信息一经提交无法更改<br/><br/><br/>
                <div class="hint-block">
                    注意：变更投票时请充分说明理由，有且仅有在获得超过2/3的支持票数，您所做出的变更才可以生效（<strong>变更投票中，未投票数均计入反对票</strong>)<br/>
                    注意：您所提交的变更投票将会有一天的公示期，请务必保证投票期限位于下一进程开始前，否则可能会导致合约发布失败。
                </div>
                `,
                step1Hint: `
                这些设置是用来配置项目的阶段性进展与解锁规则，请根据原定项目计划修改解锁计划。<br />
                *计划变更投票期限为4天（1天为公示期，3天为投票期），已完成计划不可变更
                `,
                mainTitle: '变更投票信息',
                votingPeriod: '投票期限',
                descriptionOfChange: '变更说明',
                uploadDoc: '请上传其它相关文件',
                projectInfo: '项目信息',
                additionalDoc: '其他文件',
                editDescription: '编辑描述',
            },
            projectList: {
                title: '项目列表',
                slogan1: '参与优质项目的成长',
                slogan2: '为您搭建链接矿业的桥梁'
            },


        }
    }
}