package com.currencyexchange.currencyConverter.controller;

import com.currencyexchange.currencyConverter.service.CurrencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CurrencyController {
    @Autowired
    CurrencyService currencyService;

    @GetMapping("/convert")
    public Map<String, Object> convert(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam double amount) {

        double result = currencyService.convert(from, to, amount);
        System.out.println(result);

        Map<String, Object> response = new HashMap<>();
        response.put("from", from);
        response.put("to", to);
        response.put("rate", result / amount);
        response.put("convertedAmount", result);

        return response;
    }
}
