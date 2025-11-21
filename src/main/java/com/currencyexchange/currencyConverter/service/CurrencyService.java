package com.currencyexchange.currencyConverter.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CurrencyService {
    private final RestTemplate restTemplate = new RestTemplate();
    //private final String API_URL = "https://api.exchangerate.host/latest?base={from}&symbols={to}";

    public double convert(String from, String to, double amount) {

        //String url = "https://api.exchangerate.host/convert?from=" + from + "&to=" + to + "&amount=" + amount;
        String url = "https://2024-03-06.currency-api.pages.dev/v1/currencies/" + (from.toLowerCase()) + ".json";

        Map response = restTemplate.getForObject(url, Map.class);
        System.out.println(response);

        // API returns: result : convertedAmount
        Map data = (LinkedHashMap) response.get(from.toLowerCase());
        System.out.println(data);

        Double result = (Double) data.get(to.toLowerCase());
        System.out.println(result);

        return result * amount;
    }
}
