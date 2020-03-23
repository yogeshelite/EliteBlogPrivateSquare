using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi.Models;
using WebApi.Persistance.Data;
using WebApi.Persistance.Repositary;

namespace WebApi.Services
{

    public interface IApiServices
    {
        ResponseModel GetVendorOffers(int vendorId, bool SpecialOffers);
        ResponseModel GetVendor(VendorListModel vendor);
        ResponseModel GetCustomerClaims(RedeemPointModel redeemPointModel);//, string method);
        ResponseModel GetCustomerRewardPoint(int CustomerId);

        ResponseModel AddVendorOffer(VendorOfferModel vendor);
        ResponseModel AddRewardPoint(CustomerGamePointModel rewardsPoint);
        ResponseModel AddCustomerClaimOffer(RedeemPointModel redeemPointModel);
       // ResponseModel UpdateCustomerClaimOffer(CustomerRedeemPoint redeemPointModel);

        ResponseModel CancelClaimReward(CustomerRedeemPoint redeemPointModel);
        ResponseModel UpdateVendorOffer(VendorOfferModel vendor);
        ResponseModel GetOffersById(int offerId);
        ResponseModel GetCustomerGamePlayInfo(int customerID, DateTime PlayDate);
        ResponseModel GetCustomerProfile(CustomerModel customerModel);
        ResponseModel SetCustomerGamePlayChance(int customerId, int noofChance);
        ResponseModel ResetAllCustomerDailyPlayChance(int NoofChance);
        ResponseModel GetCustomerGamePoint(CustomerModel customer);
    }

    public class ApiServices : IApiServices
    {
        IRepositoryApi _repositoryApi;

        public ApiServices(IRepositoryApi repositoryApi)
        {
            _repositoryApi = repositoryApi;
        }
        public ResponseModel GetVendorOffers(int vendorId, bool SpecialOffers)

        {
            var _result = _repositoryApi.GetVendorOffers(vendorId);
            if (SpecialOffers)
            {
                _result = _result.Where(F => (vendorId.Equals(0) | F.VendorId.Equals(vendorId) && F.SpecialOffer == SpecialOffers)).ToList();

            }
            return new ResponseModel() { Data = _result, Success = true };

        }

        public ResponseModel AddVendorOffer(VendorOfferModel vendor)

        {

            var _result = _repositoryApi.InsertVendorOffer(vendor);
            if (_result > 1) return new ResponseModel() { Data = string.Format(Constant.Message.SuccessText, Constant.Message.VenderOfferText, Constant.Message.AddedText), Success = true };
            return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.VenderOfferText, Constant.Message.AddedText), Success = false };
        }

        public ResponseModel AddRewardPoint(CustomerGamePointModel rewardsPoint)
        {

            var _result = _repositoryApi.InsertGameResult(rewardsPoint);

            //var msg = string.Format("You can play this {0} more time", rewardsPoint.Points);
            if (_result > 0)
            {

                return new ResponseModel() { Data = GetCustomerGamePlayInfo(rewardsPoint.CustomerId, rewardsPoint.PlayDate), Success = true };
            }
            return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.GameResultText, Constant.Message.SavedText), Success = false };
        }

        public ResponseModel GetCustomerRewardPoint(int CustomerId)
        {
            var _result = _repositoryApi.GetRewardPoint(CustomerId);

            return new ResponseModel() { Data = _result, Success = true };

        }
        public ResponseModel AddCustomerClaimOffer(RedeemPointModel redeemPointModel)
        {
            //redeemPointModel.RedeemDate
            var _result = _repositoryApi.AddCustomerClaimOffer(redeemPointModel);
            if (!string.IsNullOrEmpty(_result)) return new ResponseModel() { Data = string.Format(Constant.Message.PromoCodeText, _result), Success = true };
            return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.ClaimRewardText, Constant.Message.AddedText), Success = false };
        }

        public ResponseModel GetVendor(VendorListModel vendor)
        {
            var _result = _repositoryApi.GetVendorList(vendor);
            return new ResponseModel() { Data = _result, Success = true };

        }

        public ResponseModel GetCustomerClaims(RedeemPointModel redeemPointModel)//, string method)
        {

            var _result = _repositoryApi.GetCustomerClaims(redeemPointModel);
            //if (_result == null || _result.Count == 0) _result.Add(new RedeemPointModel());
            return new ResponseModel() { Data = _result, Success = true };

            //throw new NotImplementedException();
        }

        //public ResponseModel UpdateCustomerClaimOffer(CustomerRedeemPoint redeemPointModel)
        //{
        //    var _result = _repositoryApi.UpdateCustomerClaimOffer(redeemPointModel);
        //    if (_result > 1) return new ResponseModel() { Data = string.Format(Constant.Message.SuccessText, Constant.Message.ClaimRewardText, Constant.Message.SavedText), Success = true };
        //    return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.ClaimRewardText, Constant.Message.SavedText), Success = false };
        //    //throw new NotImplementedException();
        //}
        public ResponseModel CancelClaimReward(CustomerRedeemPoint redeemPointModel)
        {
            var _result = _repositoryApi.CancelCustomerClaimOffer(redeemPointModel);
            if (_result ) return new ResponseModel() { Data = string.Format(Constant.Message.SuccessText, Constant.Message.ClaimRewardText, Constant.Message.CancelText), Success = true };
            return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.ClaimRewardText, Constant.Message.CancelText), Success = false };
        }
        public ResponseModel UpdateVendorOffer(VendorOfferModel vendor)
        {
            var _result = _repositoryApi.UpdateVendorOffer(vendor);
            if (_result > 1) return new ResponseModel() { Data = string.Format(Constant.Message.SuccessText, Constant.Message.VenderOfferText, Constant.Message.SavedText), Success = true };
            return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.VenderOfferText, Constant.Message.SavedText), Success = false };
        }

        public ResponseModel GetOffersById(int offerId)
        {
            var _result = _repositoryApi.GetVendorOffers(0);
            return new ResponseModel() { Data = _result.FirstOrDefault(F => F.ID.Equals(offerId)), Success = true };
        }

        public ResponseModel GetCustomerGamePlayInfo(int customerID,DateTime PlayDate)
        {
            var _result = new
            {
                TotalReward = _repositoryApi.GetCustomerRewardPoints(customerID).Sum(f => f.RewardPoint),
                Gamelist = GetCustomerGamePlay(customerID, PlayDate)
            };

            return new ResponseModel() { Data = _result, Success = true };
        }

        private List<CustomerGameModel> GetCustomerGamePlay(int customerID, DateTime playDate)
        {
            var games = _repositoryApi.GetCustomerGames(customerID);
            var dailyplay = _repositoryApi.GetCustomerDailyGamePlayInfo(customerID, playDate).GroupBy(f => f.GameId).Select(f => new CustomerGameModel { GameId = f.Key, UsedChance = f.Count() }).ToList();

            var _result = games.GroupJoin(dailyplay, g => g.GameId, dp => dp.GameId, (g, dp) => new CustomerGameModel { GameId = g.GameId, TotalChance = g.TotalChance,UsedChance = dp.Sum(f=>f.UsedChance) }).DefaultIfEmpty();
            return _result.ToList();
        }

        public ResponseModel GetCustomerProfile(CustomerModel customerModel)
        {
            var _result = _repositoryApi.GetCustomerProfile(customerModel);
            return new ResponseModel() { Data = _result, Success = true };
        }

        public ResponseModel SetCustomerGamePlayChance(int customerId, int noofChance)
        {
            var _result = _repositoryApi.SaveCustomerGamePlayChance(customerId, noofChance);
            if (_result >= 0) return new ResponseModel() { Data = string.Format(Constant.Message.SuccessText, Constant.Message.NumberChanceToPlayGameText, Constant.Message.SetText), Success = true };
            return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.NumberChanceToPlayGameText, Constant.Message.SetText), Success = false };
        }

        public ResponseModel ResetAllCustomerDailyPlayChance(int NoofChance)
        {
            var _result = _repositoryApi.ResetAllCustomerDailyPlayChance(NoofChance);
            if (_result > 1) return new ResponseModel() { Data = string.Format(Constant.Message.SuccessText, Constant.Message.NumberChanceToPlayGameAllcustomerText, Constant.Message.ResetText), Success = true };
            return new ResponseModel() { Data = string.Format(Constant.Message.FailedText, Constant.Message.NumberChanceToPlayGameAllcustomerText, Constant.Message.ResetText), Success = false };
        }

        public ResponseModel GetCustomerGamePoint(CustomerModel customer)
        {
            var _result = _repositoryApi.GetCustomerGamePoint(customer);
            return new ResponseModel() { Data = _result.OrderByDescending
                (f=>f.PlayDate), Success = true };
        }
    }
}
