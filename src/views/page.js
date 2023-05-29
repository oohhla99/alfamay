import React, {useState} from 'react'
import { useContractRead, useAccount } from "wagmi";
import contractABI from '../abis/abi.json'
import { toast } from 'react-toastify';
// import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { ConnectionButton } from '../components/ConnectionButton'
import './page.css'

const Page = (props) => {

   const { address, isConnected } = useAccount();
   
   

   let navigate = useNavigate();
 
  // Alfa Token mainnet address is the contract address here
   const contractAddress = "0x128ad1ad707c3B36e6F2ac9739f9dF7516FdB592";
  //ALphawolves NFT ca
   const contractAddress2 = "0xdcd6d4a557ff208f01D4c2b5Bf829078622C37c5";

  const {data: balanceOfCheck} = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address]
  })
  
   const {data: balanceOfCheck2} = useContractRead({
    address: contractAddress2,
    abi: contractABI,
    functionName: 'balanceOf',
    args: [address]
  })
   
  const wl = [
     "0x27f360F7B12496004B148e76CDfeD3e0267d4761",
     "0x93D35166cb3052eD0D4aE04cAA4DF4013E061018",
     "0x870bFF1992020964046560f3EAECBf8f20714052",
     "0x5Efc2bfc26235420A90cC330068C6bAd3dB394bd",
     "0x704e7B754Ff03645379b8331B3F3D960913A25Dc",
     "0x0486067B67ACe7CcBCE5FC93c7186923aE6b248A",
     "0xC719f29A7483a098A07C01700144578BeAF08Ea5",
     "0x6Da6d88Fe24885c27fAE65f58ad7868718Bf40DC",
     "0xeA891A3699C81658B8291f60024d8B0bb435196f",
     "0x881Cefe0791ce275Cc2415103d9491035e3904CA",
     "0xC186f8e7C4515C2fAC278f60734D0a4fA788BA97",
     "0x68704beCFBb41d8E7eB110f18118E94cDBC841B8",
     "0x6e6435607AaF2146687CCFB037ee841E95747791",
     "0xeB2cF592De5AEa5f72e406c6255C75a98f951934",
     "0x7d6F656B8F19e9cD81420aa63A0Ad79d9Ec5B468",
     "0x49EB2165a220617Ff044Aa72F0177407e79677D1",
     "0xeF0928128c63C7B2d47e83cb896Ac7C99B51Fb0F",
     "0x78D53975bf67eC79D675599b4a90398F5B214b4A",
     "0xA190703A5ADb63CcBED334f5a4e365E8dc0d5d43",
     "0x3dF3D254c4c16fca37a50A82eA5a28F1192D2a16",
     "0xc6daB5C113EB8647837caf4Bbfe9aB2cA8449544",
     "0xEB00C0F8bB1DDf074B464DbCbE32164aD00E1a4B",
     "0xEB40484c6a1BB5AD6531c3D59c06eD07Ae36030b",
     "0x106d4BC771de874907D3d31F2129837963556318",
     "0x573a5C5172A555F381Df3917ea9A30eaFC72998a",
     "0x6654760eb57eBb2a841A363b61cFc36f6ea48B5b",
     "0x7f2D15040336b0C84A14d6551ED582eB44b626FC",
     "0x2787F81Ba8366DB54595767Ed4D1997B5bEDe140",
     "0x3b5876896Dfa2089E67291E8CB4B7DF1c950619E",
     "0xbFD082bA9aD6CF2976a794c4FB677a5349b301BA",
     "0x517D72AE57E4CcAcAa7a9F3BFfF3C97613a5C6B0",
     "0x941A8093C3d975326a3089f4df8228218Bf63698",
     "0x0dCE9F4982f5A2277fB551AA538379fEaD465750",
     "0x64EdA023719a6d7F706879C8fcDd71b860eBDb42",
     "0xbBb4A122c710CD8906EBaC2dBF74Ed4C102C777E",
     "0x2Af0FE506829eFf107a459403Dd4DD541FD7CE4E",
     "0xBf87E7254D4fD063A69BF67De73790c43d468649",
     "0xc6aA455a178B8dB2c9BFAFdDF726Cf1222d20a24",
     "0x72D7a77a35eB75490Db7B0648051755bFe5CE42F",
     "0x904CB35fC63FB65EfE38a7772309731dD0223353",
     "0x018E497E8a116F914A76a8Ad0b2937A86A342a31",
     "0xe1e4e0D2D5965c6dCC1c33C1637f2abf04535877",
     "0x5d2981c7D09B0B24177D55866cB58D5904C7Fc31",
     "0x240627127eF77d9cB2d5F9C472DD491a1C70B642",
     "0xFa95AA10997A6d4A214dB1626F05B076D8E94f4f",
     "0xd865C671FB5E8E341154C9e204Da8609136D7Ecb",
     "0x6462154bd6Db79C6b6fF962d53a7810E3ebA7870",
     "0x27973Bb46aE24c9802c9BC47ea938a8b76f343Db",
     "0x4054C437c15cC8c194b253D09B725BE2b783D77b",
     "0x4282d5C7F12624b66eb3e05CAB3b2530dF222553",
     "0x189Fed2037Fa15d6feA1060BB3e634102239548d",
     "0x4D2f5F90c69Ae60A794495A6a2B8D771B07572E2",
     "0x818fDF253932f46fB6761c2A137ccbE2553C19e9",
     "0x95C03aa406648961b63e371651ACd1ebeeD5186D",
     "0xbEfaCcA046A02262E8D38314573d2bd466803e55",
     "0x7611ba75C111bAd028d0cBD61cF4FaB6089E2860",
     "0x0513dA377B9902Fe504CFC4756dDaBaB504581d8",
     "0x43F8e8733e33AdC0d5B2CDfd948Da684f2Bd3940",
     "0xDC03FC394C7553C4dd6f91D2a5Feb835Fc05FFc5",
     "0x22BfC59596aDb17395d123826F000dcaeD07C829",
     "0x80338567DE1554352082967B690A58e765622CCc",
     "0x07890FaF59DDa8d569d5C222058838d763d375aB",
     "0xd1892a34B3564505c72d5d2167445f999ceb6134",
     "0xCCD3B7932e96Ef71107166816F0Cd348B2A51f26",
     "0x0cA7A0D8bFb5CaEB582F90e100e63356A863864E",
     "0x82415a64e9af87d4309dCAf1DBbCE34Eac79C856",
     "0x9713e12F2265eFa8b1bCC99A07e287038f31BBC0",
     "0x859F4cDeae8af3f714fb1a3993D8FcF600DA67b5",
     "0xAAcE123ef3222F24234e46823Ca42B794F8eF392",
     "0x3d4f4E4F3e012E1258448B1a07985e4288a8bf36",
     "0xe4958f94014f87E1370404746Fd7944a7E72efc8",
     "0x0FcF993690A7C27Dcbd1bdc7873dEbA7b54b2ac1",
     "0x1a5940455D531672Af78982e164C4563dDBF40cB",
     "0x936510f2bbF1eB485f5bE1eA60124AaD0D41D131",
     "0x98DBC070AD90ce66094b0F108511C48D32E1A47f",
     "0x4fC9529194ed01c4BfDaB22A5fE699d2e0E4b243",
     "0xe95E113CE69D078511813a338cc9D5569f676191",
     "0xa1BfeD37D33BEcd523772CBC6eB99052f0f81a81",
     "0xDCAc0ee047DA0aB449f6bEb08c8f79c00eaBC67D",
     "0xf6b0823F7D07301e58b1E808B18F29442a735E63",
     "0x013Ec3eD2A613644D71F0d7d9376a6AE4b3d63c2",
     "0x80cF051A318762a8cC97Ff95514d72436a226511",
     "0x8Bd3E54eC95fBFB397E37c73390c6D68f2dF4718",
     "0xEa27Bb66677851478433E73a1A0195F9b2251265",
     "0xe300c55d990e50DD740A04A33fF9Bd68CE9BfE08",
     "0x9C0f983665C863d528C22ca1fCAED86E9DF22E07",
     "0xE1B4d5009273B1c4A27cb1630cf8E46C5A0783d3",
     "0x88186216f4F54BcEC29fea24A1e4dF1e6D3492B1",
     "0xEd90a5a9Bc225205946877A5650C83E00013F640",
     "0x5Ed0691E14EDeD0164407F93E160cd0ee68a9b57",
     "0x2BD6194613De4FC6B5Cc952f639EAfCCAe1794f6",
     "0xD1c887B4b2ecac8E3FCACa62B2cB6A3d9aC75Aeb",
     "0xe36E95e7d4981Af12586Ea28bF794C85d3511619",
     "0x236AeB0245169a44F623b01654EC749dcbFAe6c7",
     "0x063EA9A84b21e8862E2EB0193FAbAcc9c7ae5A49",
     "0x3Fd2782efc4F9cac4146Ca5fA11354f26371444b",
     "0x4957E098587a5e848885c3d10A1eFf451c77eD34",
     "0x911D983dC8f76b5B0C5d4beda8f4E907012AD463",
     "0x6dE3f181B38acdCB85038D45Fd97F4299c9c10C2",
     "0xa66c38396B9b5FB1e7ba9a240bb7224FfE2945B0",
     "0x22fBCBB056fB83cefE4f3d66c14A8aF52149223F",
     "0x166Be543704529ccA1cb9Bf06fdF0DdB04D83d63",
     "0x01147EF4cF7f786FCB7711A40a3D046289794733",
     "0x18cd142dD5c4dDfB756bcCdBf5C4eaE5dFF403A5",
     "0x8F6f8Bdb7fcfD1AbEa0d079b24Cc3789f0D66446",
     "0x7Be28414FB12906f23f73E65f85aF526eBafF949",
     "0x4f33056CBc5Ac057A0C6ecc4272717e4f10920E9",
     "0x7754AB999455B8045901fda8f5440d5CF5743fEa",
     "0x09BAA9a11fE737D5C5ADF149D590d7CE7F2b08b3",
     "0x816e69e29611C4A13D156e726F9C49D2877c1d75",
     "0xAd41A16b30a622DEC378F21085A45e177F80ad90",
     "0xfB341000Ad70CB6B49324Ee54792B66cb4e503C6",
     "0x82D966baDe6f348D8afe01706890403384385C2B",
     "0x2C5cF36d1488CF7Af68D52Ed6058e2BA3968d54e",
     "0x1090e0789C412b71dd344aF00b15Dd04EAF25e73",
     "0xbC2F05F49F9BD03Bd1b4212abC46f0b76215fDdC",
     "0x609cBDdE43eCb23D83614343a4D6dD375eD8EE2F",
     "0x1360cBDefeA06a729d4EdF078A62Ce8f13BfDc98",
     "0xcB5F0F320d923880e09e9Dd93b029F2270E50bA0",
     "0xFDE7019cf4c8F17d6B658224faF89C71456be39A",
     "0xDb850331885db2A320287b9b50816AdFCeA73760",
     "0x4F586820A7372642b651B0e7A5964D3D59B5B392",
     "0x085Fa70722fF230dFEaF420b0C4BB15aa0506181",
     "0x7a072a87b52E37129A7DcBB2F3E16387ECc699cb",
     "0x2ee29C6b6a0f26FD96863D2fC8CFd4247f7CC222",
     "0x2f59D2BF35C60B6dea39227cfa7789026C9ef00A",
     "0x09880881576E1Da72B015A4dFdC3417E0cdB52b1",
     "0x82aa7B035D0477B93377F0B9B07FAC8549802DbC",
     "0x2cB9C03549e0B5d8E8674947402CBf1A277C08EB",
     "0x783faC557E0E1CC8BFc4f58f4560Ba53a9Fa8654",
     "0x482e586D3f080a2d274723383f2C13a4b4E81781",
     "0xEd90a5a9Bc225205946877A5650C83E00013F640",
     "0x5Ed0691E14EDeD0164407F93E160cd0ee68a9b57",
     "0x2BD6194613De4FC6B5Cc952f639EAfCCAe1794f6",
     "0xD1c887B4b2ecac8E3FCACa62B2cB6A3d9aC75Aeb",
     "0x6e40192503D849Ec8FB649CF8b0548FD28B3AB26",
     "0xEfb54BE611B0B7157242418a69dc969772A544E5",
     "0x0C6aED9d9C7e6de4c50fab6d722e490ea49b13Ee",
     "0xCB00b2D04cEc567f03b37Ce6DA0fFBf5683f54De",
     "0xf183DD1daBf4F33EbfD7392E4895e7e9A3383d3a",
     "0xE8F9d3e03FC5BC175E47631Ff3F5d005ef268189",
     "0x5C5585ab16ba26dCA3b698b8EA8eE6A5f01f0613",
     "0x82A07DfF5B01d51B50176E8d9095A8cB8626b8bA",
     "0x5bc91fCC71f04160E92d7a3430dadBb9365DBD4e",
     "0xb6afA5C43bDb697051323C0e55d18365aBf8A64E",
     "0x259FEb458e2A969c981e58BAdC2406C9303E10B0",
     "0xAeD497367e15E7548ca9Df60f0e5CC476f56E44a",
     "0xe42EdA174519d23e0e0b49af9BA52bcEb976CbB6",
     "0xcFfE53BF410f9867698964F61FF76dfA2C54deD9",
     "0x846370d35f8047CB16b954204958895942869431",
     "0x296070B3E76C1D45C902fd5BDf22bCEC77EBF653",
     "0xa6D232829BdE024695595BC12A1Db4e112F1BD94",
     "0x9C47eF6100738C96B5f1a343D6b768c430ECd55e",
     "0x25Cd6944A88DEC8C278f412CcFBd48283B0a5638",
     "0x501ccCD488Dbc8a9BaCFa1Ce75d8352046bfCBE9",
     "0xDEe120C4687D0255D267f4154e068ba9ac9c4125",
     "0xBa740B4C2F44639024e91cC0C9a6379a3fb89AeA",
     "0x1be9C6b6b17825a2fDF7776db3ed6a5c4fe76b46",
     "0xfe60089D480FE5718f1A1a178F8AfE01964FeC06",
     "0x131204e70248f470c7eebcDb9cBeb559af267CfC",
     "0x957705c7eeFB845b0a21A4085275D4fa36640dcd",
     "0x19C5A59DA56D3bD4c4c3d9f64C594ACD2A9122D5",
     "0x458c270f1AFa06035f477159F89707018d2Efb70",
     "0xba7aA9a15C3f355b11EF9Fa0bA5e39dF4cdd6507",
     "0x085211cf561C4196f8bc6dF368a4ca8EE7b2459a",
     "0x9c61e1C5d636575a9D07d8A658fDC473F23BbbD0",
     "0x282D55BA3932b11623E8Ab1Be51e572c4B2d0Dc7",
     "0xF124a05AD0D63972FD76271d23C101106270910b",
     "0x88335EC2258C89cB6A0d31b276360aDf14da6A54",
     "0xF9C7F270b3A4EF08c630Cf447AA92969a8A3341a",
     "0xbE4f6C928DDA7863B47e7eA81E61b1B8F8cC003a",
     "0x179609e7865E4a3C4c668e9E851e9b689628dC5D",
     "0xb2B20ca95616771Bb71F79c872274c5f626D3Fec",
     "0x768FadD2F3e3BBfa721353E9bF84433D2095f014",
     "0x768FadD2F3e3BBfa721353E9bF84433D2095f014",
     "0x535eFd56D61F1f1E6f5A7c71CD578197d75cE780",
     "0xb49a41656e0F6E34B256550251d35ae08028bbF2",
     "0xe0982FbA9AF824585A7b4eA4D92C7BB816cC2669",
     "0x5EC5AC30148e6Fad08408031C4e25DbD48646ee8",
     "0x2ECA3BE891D210cFe8EF85505a3f66aeBe600775",
     "0x8a1a76ff6e2a03f41317c77974FEa1d1246CB9cC",
     "0x7f22788CCed30a13eb560714Fa8532976024bBfb",
     "0xFa34245eF7721e7609D479A9991346A6121c25b0",
     "0xd1B2a64a225e9BEf263f94654A47e28D514ccB87",
     "0x6BAA71cE786F48022975280195F974634e90309e",
     "0x6C38129583C485f5F18c4bAF59930CabDB60DCcC",
     "0x3c9ac03AF6F34cc00b5e2a42b2010A69494C77D5",
     "0x7447f2Bb45a6a3037e08FcCf303E4d3D1d68489F",
     "0x65BB1615582BbeA7c383dB19624a5341D7dB8f8c",
     "0x19f1f2837a4C8F1C0dE1342c54584480DC924a09",
     "0x85F1f4FEF2aaE59D7E15716d7a89Da8E48B6E817",
     "0x86fcb5c610c0ccf6c18E0Bd3F56ee696689ECe02",
     "0xF9316b784Aa52C90B5618EE284c93D546C6F4737",
     "0x3A3f27A11BF305f48c2A057A8F0f21b76C24bf06",
     "0x3A3f27A11BF305f48c2A057A8F0f21b76C24bf06",
     "0x85D52f32338E6E0ad60Ac5DdA367098bf88D7a21",
     "0xa1b34E47057F0dcF701B27f4C2Ab5bc988b559C3",
     "0x6e929647B70db97e9326eA4297EC821175158bD5",
     "0x16497f0B98d9A0d14813C6ae0C948b1A0579Fb0c",
     "0xc444D8aa6BDAC95c1241679E0945274064C4a5b6",
     "0xE5AaEb83156292d3c2bdDd18B9667B5Bc21a3152",
     "0x89d74332f4Ae4C9733a471b204064b3C74159276",
     "0x2254eA9cff9158C8cbc5739BA51EC606affffe25",
     "0xc6F91ba8d86De4C9255B122045CDd7F89E540A8C",
     "0x55ff391547f156B211a68e4787643989857C2C9f",
     "0xB8D96AC691193c705D61dc4a2f7D15Daa259Ad0C",
     "0x3Cef84E3AD485634d13397C2b6686963C4aDE5b9",
     "0xF70fCa78fdF5fD29f72Dd665f46AEa1E6eb234C0",
     "0xC2F4138B63694819B878d55b04eC0Cc33D3C0a82",
     "0xE847CfcB659AdE16611775D2e5b4595Ca4021Ba1",
     "0x27Af4d05ae94717dc7Cf3dCF588511bd1dFA1645",
     "0xfAD33D944B7507fE05BA6f717fEaB71a3D999620",
     "0x8cc0A2197AfC7fC8607fC4802E693eAbB9A3a453",
     "0x298b5Ac3341148527360617C6A784dc1C559D8c9",
     "0x68E02687420ee12A4DA2673378097acDdb902D9a",
     "0xA2EC7a27711964CED6e02Dc47B9A8aFD88798373",
     "0x2138Ea897550Ce8868Ee5fe2Ffc78407Ccd4387A",
     "0x6839f8Ea0663e37E7145c6915f0F2E8fb211970B",
     "0x7f411bf94c830a3ed1fa3691025a92a4a863f824",
     "0x5ae023ede4fe0c0f29ca9efa7dba94f23dc14795",
     "0x27fcb3903aca8416f4308709fe6e0d0123a55661",
     "0x261b2A81D4a1d1cb17db9Cb11F5cacC49BC1c326",
     "0x796A7051C83E7082309FfAFc56D03553443168ba",
     "0xdc2e2ac75262204908c2e684D31914787883eF20",
     "0x9a6ef672c9af8c98201D3DDfFBa9de4A67Bb7Df8",
     "0xa93aD0E469B561d8B327D5d8CA0E6bF49479c6dE",
     "0xDFfCBbb056888C404640CE777c7e938966c38F0F",
     "0x39F6273d75DB12f4E02957180AbEaE9132800d17",
     "0x3710d1ced6be5631195fdf80f433995f909e2d7f",
     "0xf343847da9bac1215d400a51b303488155b08d0c",
     "0xd8e40679ff3930265ff19aad301fd01a75e66006",
     "0x55623b455238c9f7b56d97023aeff202dbeb4e96",
     "0xd161f89f75e78b53edd546fcdfcc78a52575bfa8",
     "0xc4a730dbebd1b3d93930427d6c2c5c25c7d01707",
     "0xc2b8ab714fc050efc0d2ce5ca813eee01d3efd1e",
     "0x3557c9d5263cfd9028089a796d4c865f0ed59505",
     "0x71c5ddc4e61c501a34d388ca476919aca0cfecb0",
     "0x6f9e8f0a4a85783db134641b538b8717def4a721",
     "0x3b3199688d8ae08dce6cc1ea325db6ee1deecf23",
     "0x0a6e5031054668f58d234372e5874007327c8dea",
     "0x949710d6ff4d3d8030694b5582126bad57250066",
     "0xEa009F5ce91e3F83399D98077147F7b1F4601db0", 
     "0xEa009F5ce91e3F83399D98077147F7b1F4601db0",
     "0x7FC519Eb08323624767f8cE864B3810e9C9900f4",
     "0x26eb596be49616B585eA9A6eE41a0A6F9975877a",
     "0x06b7aD3cfC19eF98B8894CeAe985A6d1Adf6F424",
     "0x3B91d6f5F08FC81Ef02443C6Be418cb7138816C9",
     "0x2236F2C8d26c49A0f97C3B82F55cd60AFB72259e",
     "0x151Aa631Bde3394501e72dd73f2F55F0b470f66b",
     "0x2c7A715A27c63a91f9ECB4dB067eCF86170EBb30",
     "0x3d04224b9Ad0Ad111a3bc63b96b0DF9D0C7fe212",
     "0x1AD216eD17aaB9Fab83a5BC637fA384E81bfc708",
     "0x78110D9338ed37F3D6582F9f98ad404a16f2AdAC",
     "0xc1cEb68624d12E2810544f06b77cEf63C79083a1",
     "0x67e6c5F218cB35c8078434e0f3DECEB6d582C6a9",
     "0x1606976897bf57cd277Fa2968D9D168D1A49CC50",
     "0xE8a72473c8f430eDCF645e57710031b025edFeCc",
     "0x77EcD0017564D69bad99E2b09d0f0D93aea6C149",
     "0xc7f9e50AF1e56523AfB6fBefcb2E9479FaC0D78C",
     "0xc668c0789F0Ca00704B32B41b44694Be6E8154e1",
     "0x2Ea6A9688A7Db690313ED087525741a67c5818A4",
     "0xbf51086A27A7Ce74cE822F34a6Fa7ff34A4728a2",
     "0xE2B725072ce13a0Fda3207450Fd9a50457B39BD8",
     "0x919c8e97a5Fc9b5A8D61551C51513Bd64545eD07",
     "0xE7A928E9a65CFf3133d349c44080b67c96ec03C3",
     "0xede8056e891697cd18d8968Fd505E48f54c2C0F9",
     "0x547860dAD44e53129b76f929C40c9EfCEbfaA270",
     "0x398fFCC5Ee6a401f5a68cAd404d1D0C942dc7e98",
     "0x3758189673c64635771F615e952EDFB062a24269",
     "0x9d09E62588623Cf6E5535B62289E4A018d0D5E93",
     "0x564Fe7Bb8752f61560f6410B4b73000a327aa89a",
     "0x19D51E669073F7ee24C819bC2C1d55ce1df6aC6E",
     "0x1f2a2cF6dB96431ce23fD8473583883983382d24",
     "0xA0B6eE3958E3115073d4cB8191D4a9D45505225D",
     "0x6c5760AFA61aC14275B42d9798Ae44c5e89af1c6",
     "0x83c9bB63110b974C7c85EDaeFE229EbA01af88ce",
     "0xC2d66DF63ac6B2822Fa038E85D0431182bDF3F96",
     "0xcd759427C20745E8E38259CB41550dC76C89D2c9",
     "0x37Cf173047f9f69CfD6a4f1dFbF012ac3c99452B",
     "0xF855136c1969c45E0F2F9fEf0a9Fd8b995b15deE",
     "0xD8880B5bC216E7dB153e34aDc21b36F69B7926A4",
     "0x866f5e76B4A60982028610B9c0289E54460DD6b9",
     "0x5FCB318D23e17EB5Fc3fdC7388EDe235bf34523A",
     "0xD80F3e3E2e4f7B03F7A112c65B1E8c0aa9754498",
     "0x215d51844140535a0D93014eA0667f485bB86979",
     "0x3eD89c818e710f23Dd54BbDab2EB7Fa5D5174E9b",
     "0xb8c1ead0aed3979c6b25a477a2e2c5a4a35f2096",
     "0x29e242b1357dfd29e05589d02fd51d51dd7fe5a8",
     "0x5fcd3aaa8fb737f8aa13525ba3ed1bdb689afbe6",
     "0x26454ea42ad2539df3c0bd04c11da8f660abc69c",
     "0x65e8667765f0c152516005f68c9b68ffe27a710a",
     "0x07017CADe6f757f833DA77838862678Df782e9b1",
     "0x47e62329e8cAf61cd0C8dEd4F998744Ca19e7134",
     "0x7C5c53206a157D5d423e9E4284a7bC0aa47092CC",
     "0xE0e7eEf6313Ba41A2D3a945EdD9B187812b89C28",
     "0x0b3679EdaC9d5B17e311d0BfaEf916556F5f54b9",
     "0x19cdADb9Bf02599bABdD42F69407cfC9c2a6Da3f",
     "0x76376460c1C4CedFb4DcCe3572D02DD7DF6844aC",
     "0x8D9e8c79Fa12d289986361bDF7719c25420D0aBF",
     "0x63489a9F83e627e5001C1882bBd2b9b9f3C82420",
     "0xAeD497367e15E7548ca9Df60f0e5CC476f56E44a",
     "0xe42EdA174519d23e0e0b49af9BA52bcEb976CbB6",
     "0xcFfE53BF410f9867698964F61FF76dfA2C54deD9",
     "0x846370d35f8047CB16b954204958895942869431",
     "0x296070B3E76C1D45C902fd5BDf22bCEC77EBF653",
     "0xa6D232829BdE024695595BC12A1Db4e112F1BD94",
     "0x9C47eF6100738C96B5f1a343D6b768c430ECd55e",
     "0x25Cd6944A88DEC8C278f412CcFBd48283B0a5638",
     "0x501ccCD488Dbc8a9BaCFa1Ce75d8352046bfCBE9",
     "0xDEe120C4687D0255D267f4154e068ba9ac9c4125",
     "0xBa740B4C2F44639024e91cC0C9a6379a3fb89AeA",
     "0x3FC6AfC823576d35F658C35732ac27ac0af51Dc7",
     "0xfe5aFD4544D1c6378354adFA03A97e94A728795e",
     "0xD0928503878DBFc91859a4f32b2bD2c004d34aa8",
     "0x3b2cCE28546F46A9797C604D21E4fA4E57c9383C",
     "0x0107802DF45667FAf4E1b4E4F8c857fA3Ac30dE5",
     "0x65b2156eC07F0bfc087D41D256F6df1140423917",
     "0x700cc1ad587e838740f3A306579bE3d60a8B4CAb",
     "0x1384F35dc9ff3a08550778119c2AbC1abEb49E22",
     "0x18719D53Bdeb6b32599C858235EAa1307a6b1E25",
     "0x172719Cc32fdA085Df75564533502224B02737bd",
     "0x1a55f23bdA72478296fa1cAC1DB10eDD304960D9",
     "0x24576b3bFdE2FaB4D0b642eE5B26637c42b63729",
     "0xA577B339fAA9DEdf4E1121AA3Fe1d7271b8184eA",
     "0xd88347Cb0EC2e7735569d9ce4767D30d34703Def",
     "0x65E99FF02B635E2F441C925FA551DdcbbB6d1fB5",
     "0x809A53185EeFd79F44F54d310faBEB138432B40D",
     "0x9Ce6DbE5fc6B4AcC00D2721Bc1CCa372D9bCC7e8",
     "0x27B44238310dcb6b0A0b85515098eae3D32783A9",
     "0x967023C6738C71d794731A96dC5C134bBbEC5622",
     "0x7EEB0bbAC356646647954E7AaD89BA1b7eC271d5",
     "0x1E312cB51F145bf9fCEA325e4AF039aA52ea75F8",
     "0x0eC614CD67c71C97646510815F91488B5A934dA4",
     "0x75B115D85AfDb0cCFa8Fa95aBb21c5f61D46efDC",
     "0x810d4445D5a902b4BDca9ef048B1348d7eE90577",
     "0x6da6400527eA88A8e8ef784427979D904c17F214",
     "0xe606157DCf758998bbB5Be43Bd33F5133A8E653f",
     "0xd85c11F1b48524b1e9B6Ff6569a37D172F7d60f2",
     "0x694F42D3291d108a9135Ee4a2Bf547178E8E1452",
     "0x80B9A849a18AA403bFA8D2b28d016C02AeA65090",
     "0xe28579cF2ED6040cC30340749a83A373158A435b",
     "0xD4f05162681946D542e906555E42d231a2513e3C",
     "0x66232ff08a39F8D0BF3464E08605b8D02469830e",
     "0xe28579cF2ED6040cC30340749a83A373158A435b",
     "0xD4f05162681946D542e906555E42d231a2513e3C",
     "0x0dFbbfA069Ab9CA043f47903DEaCA7C5af28af38",
     "0x2CB74268413585F1d6f02628909d8061d8db52Dc",
     "0x92ace8AA3C573936EB8E9639489b7EB21fD1E001",
     "0x16eF8286935ad3258F4Bfe262998DE8218B20478",
     "0x5CA3Df8e2398A7D7eD72FE46E8B2D6C7Db4B46F3",
     "0x952Ef1cBDa878CF29Dc1ef2dD460c66ac1B59C27",
     "0xeb5A0abBed2b2677162CB3164e4C5Fb6c6c1329e",
     "0x129fd01d1acc7239e2bd5bed65e9e2ab2530cffb",
     "0x640492a772af2f01a89f93a9930eb976ba6c11f5",
     "0xb657Ff4f5916165D778cB87e894C36362709b474",
     "0xCfAd591fF4B9f2C6e10376128eda7028C6E6535A",
     "0x56B8E9E48D444138C345b5b5cb31fc243A88aaE8",
     "0x8c2DDb7133863E6a339A93D749E4cd5673a991e2",
     "0x39f02fd8C86B8615b74a59cEA9164D159F664221",
     "0x885Fe99cC890bc32f337bDabeFA193146BaAA2A7",
     "0x6a0f4200bA32481a16d182454817E52588653D5c",
     "0xd8E6DffB104b26a70A1eaE0f1440E5Ae70d3B77B",
     "0xc0E1a715AeCc5cAf3FeD5eDbe0D5F0F36159752D",
     "0x107d159F88aa51259812047E470F0bDf7079dd2F",
     "0x6131A461a421E40dFF262cBc587c2450f626eCAa",
     "0x4f7268e6fc40BFD772CE02dA0d3ddf2d886b700B",
     "0x49a6edF8ce35b005cA809eB06AF56Fff8BDfa076",
     "0x1374bFb623511Dc4cd65CCc94E9495d19FaFfa56",
     "0xd6D1e4296d0f61888F748b22D8b2a9747f83FA31",
     "0x9Acb3912192f05AD4398381Ebb9b2fECb6B6657F",
     "0xf57f8f44A33fAFAd26Ad6f0Ef7644Bf78deE1171",
     "0x343f25462C41cd2Bc1C903Abb84212c49bCb9D0d",
     "0x69d7C206034CcF70f19797F6164a1897037A0D7d",
     "0xE847CfcB659AdE16611775D2e5b4595Ca4021Ba1",
     "0x0b3679EdaC9d5B17e311d0BfaEf916556F5f54b9",
     "0x19cdADb9Bf02599bABdD42F69407cfC9c2a6Da3f",
     "0xAeD497367e15E7548ca9Df60f0e5CC476f56E44a",
     "0xe42EdA174519d23e0e0b49af9BA52bcEb976CbB6",
     "0xcFfE53BF410f9867698964F61FF76dfA2C54deD9",
     "0x846370d35f8047CB16b954204958895942869431",
     "0x296070B3E76C1D45C902fd5BDf22bCEC77EBF653",
     "0xa6D232829BdE024695595BC12A1Db4e112F1BD94",
     "0x9C47eF6100738C96B5f1a343D6b768c430ECd55e",
     "0x25Cd6944A88DEC8C278f412CcFBd48283B0a5638",
     "0x501ccCD488Dbc8a9BaCFa1Ce75d8352046bfCBE9",
     "0xDEe120C4687D0255D267f4154e068ba9ac9c4125",
     "0xBa740B4C2F44639024e91cC0C9a6379a3fb89AeA",
     "0x3FC6AfC823576d35F658C35732ac27ac0af51Dc7",
     "0xfe5aFD4544D1c6378354adFA03A97e94A728795e",
     "0xD0928503878DBFc91859a4f32b2bD2c004d34aa8",
     "0x3b2cCE28546F46A9797C604D21E4fA4E57c9383C",
     "0x0107802DF45667FAf4E1b4E4F8c857fA3Ac30dE5",
     "0x65b2156eC07F0bfc087D41D256F6df1140423917",
     "0x700cc1ad587e838740f3A306579bE3d60a8B4CAb",
     "0x1384F35dc9ff3a08550778119c2AbC1abEb49E22",
     "0x18719D53Bdeb6b32599C858235EAa1307a6b1E25",
     "0x172719Cc32fdA085Df75564533502224B02737bd",
     "0x1a55f23bdA72478296fa1cAC1DB10eDD304960D9",
     "0x24576b3bFdE2FaB4D0b642eE5B26637c42b63729",
     "0xA577B339fAA9DEdf4E1121AA3Fe1d7271b8184eA",
     "0xd88347Cb0EC2e7735569d9ce4767D30d34703Def",
     "0x65E99FF02B635E2F441C925FA551DdcbbB6d1fB5",
     "0x809A53185EeFd79F44F54d310faBEB138432B40D",
     "0x9Ce6DbE5fc6B4AcC00D2721Bc1CCa372D9bCC7e8",
     "0x27B44238310dcb6b0A0b85515098eae3D32783A9",
     "0x967023C6738C71d794731A96dC5C134bBbEC5622",
     "0x7EEB0bbAC356646647954E7AaD89BA1b7eC271d5",
     "0x1E312cB51F145bf9fCEA325e4AF039aA52ea75F8",
     "0x0eC614CD67c71C97646510815F91488B5A934dA4",
     "0x75B115D85AfDb0cCFa8Fa95aBb21c5f61D46efDC",
     "0x810d4445D5a902b4BDca9ef048B1348d7eE90577",
     "0x6da6400527eA88A8e8ef784427979D904c17F214",
     "0xe606157DCf758998bbB5Be43Bd33F5133A8E653f",
     "0xd85c11F1b48524b1e9B6Ff6569a37D172F7d60f2",
     "0x694F42D3291d108a9135Ee4a2Bf547178E8E1452",
     "0x76376460c1C4CedFb4DcCe3572D02DD7DF6844aC",
     "0x8D9e8c79Fa12d289986361bDF7719c25420D0aBF",
     "0x63489a9F83e627e5001C1882bBd2b9b9f3C82420",
     "0xDFfCBbb056888C404640CE777c7e938966c38F0F",
     "0x39F6273d75DB12f4E02957180AbEaE9132800d17", 
     "0x90C4fCDc6Ab5Bc8aAc13eA1d694D2A19f175625f",
     "0x9701824C0D3bd2146805c3A51FC5E747b44b0fCE", 
     "0x7baD7aABa16736759FE53ce8e38eAD8837da502f", 
     "0x38a55688B5b6a60690EB83aE4dDD6b763C0dA487", 
     "0xcbBdADa0E2F60400e64eC81647Ed730C16227e71", 
     "0xc71dBA523b29952487aA2F8d95c3c5cFF29C26B9", 
     "0x3acA574627afd033BBA1839d12b2Fa0f47e04c55", 
     "0x6F3D1c85c405fc4D37D3D31e6C8a981dE93E950e", 
     "0xF5c475B83B87973be173Df3DC4eD8383C42A39A9",
     "0xde7FDdD94170995B9524eF178bfD17eb149991E8", 
     "0xd76c74f205976cf2e504baa3d7d8d828c1164132", 
     "0x29af1814594eb9b23d4aef6fb640fcc5b46088e6",
     "0xDCAc0ee047DA0aB449f6bEb08c8f79c00eaBC67D",
     "0xf6b0823F7D07301e58b1E808B18F29442a735E63",
     "0x013Ec3eD2A613644D71F0d7d9376a6AE4b3d63c2",
     "0x80cF051A318762a8cC97Ff95514d72436a226511",
     "0x8Bd3E54eC95fBFB397E37c73390c6D68f2dF4718",
     "0xFC29736aC7B8Ac8106D24515312396093d3D2141",
     "0xAD4e1879297249d43Abd7A831D03d6D7Eb471B2F",
     "0x71e9Ddf441a60f789E309fFCf7373303D16830Fb",
     "0x2aBC62dDEbc0B6B93184624204De5E3597eA9828",
     "0xBBa877A755719a978333D89007019fda7f1D1240",
     "0xe8efe778d9abd7626d78032542086260e687b6e2",
     "0xD26E54e794e6A1102218FeCEdCd7BF26336228f0",
     "0x0Ede308585E453dfa428fe974741f06f76610e8D",
     "0x9F7a1dA3bc621A0aaeB83eeF3810c972d8C3B68e",
     "0x38E11A6E34A92EcFF736bC9E142DFA15025De301"
   
     
     
     ];


  console.log(balanceOfCheck, "the balance");
  console.log(balanceOfCheck2, "the balance");
   console.log(address, "the address");

  //converting hex to normal number // note - .toLocalString("en")
  const hexToDecimal = (hex) => parseInt(hex, 16);
  // const bal = balanceOfCheck
  // console.log(bal)

  const balance = (balanceOfCheck ? hexToDecimal(balanceOfCheck._hex)/1e18 : 0 );
  const balance2 = parseInt(balanceOfCheck2, 16);
  console.log(balance);
  console.log(balance2);

 // if user wallet is not connected, this function will be called to the user attention
  const connectWalletError = () => {
    if (!isConnected) {
     toast.warning('Please connect your wallet first to continue', {
     position: toast.POSITION.TOP_LEFT, 
     theme: "dark",
     autoClose: 5000
     });
   }
  }

  //if user wallet does not have up to 2,000,00 ALFA TOKEN, this function will be called to the user attention
  const enterDapp = () => {
    if (wl.includes(address)) {
     navigate('/alpha-teleporthq')
    } else {
     toast.warning('Your wallet is not whitelisted. Please proceed by whitelisting your wallet address.', {
     position: toast.POSITION.TOP_CENTER, 
     theme: "dark",
     autoClose: 5000
    });
 }
}
 
  return (
    <div className="page-container">
      <Helmet>
        <title>alfa.dapp</title>
        <meta property="og:title" content="alfa.dapp" />
     
      </Helmet>
       <button className="page-button themebutton button">
        <ConnectionButton></ConnectionButton>
       </button>
      <div className="page-banner">
        <img
          src="/playground_assets/dappper.svg"
          alt="image"
          className="page-image"
        />
        <h1 className="page-text">alfa.dapp</h1>
        <span className="page-text1">v1.0</span>
        <span className="page-text2">
          You need to whitelist your wallet first. 
        </span>
        <a
          href="https://whitelist.alfasociety.io/"
          target="_blank"
          rel="noreferrer noopener"
          className="page-link"
        >
          Whitelist Wallet Address
        </a>
        <button className="page-button1 themebutton button" onClick={!isConnected ? connectWalletError : enterDapp}>enter dapp</button>
      </div>
    </div>
  )
}

export default Page
